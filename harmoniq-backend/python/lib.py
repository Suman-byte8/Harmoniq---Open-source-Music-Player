"""Shared ytmusicapi logic. Used by the one-shot CLI scripts and by worker.py.

Every function takes an argv-style list of strings and returns a JSON-serialisable value.
"""
import threading
from contextlib import contextmanager
from concurrent.futures import ThreadPoolExecutor

from ytmusicapi import YTMusic

_idle = []
_idle_lock = threading.Lock()


@contextmanager
def client():
    """Borrow a YTMusic client from a pool.

    Clients keep their HTTP connection alive, so reusing them avoids a cold TLS
    handshake per request (~1 s). Threads are short-lived, clients are not.
    """
    with _idle_lock:
        c = _idle.pop() if _idle else None
    if c is None:
        c = YTMusic()
    try:
        yield c
    finally:
        with _idle_lock:
            _idle.append(c)


def ysearch(query, **kw):
    with client() as c:
        return c.search(query, **kw)


def _thumb(item):
    return (item.get("thumbnails") or [{}])[-1].get("url")


def _first_artist(item):
    return (item.get("artists") or [{}])[0]


def search(argv):
    query = argv[0]
    limit = int(argv[1]) if len(argv) > 1 else 8
    out = []
    for item in ysearch(query, filter="songs", limit=limit):
        artist = _first_artist(item)
        album = item.get("album") or {}
        out.append({
            "videoId": item.get("videoId"),
            "title": item.get("title"),
            "artist": artist.get("name", "Unknown"),
            "artistId": artist.get("id"),
            "album": album.get("name"),
            "albumId": album.get("id"),
            "duration": item.get("duration_seconds"),
            "thumbnail": _thumb(item),
            "isExplicit": item.get("isExplicit", False),
        })
    return out


TRENDING_QUERIES = ["top hits", "trending songs", "viral songs", "top music 2026"]


def trending(argv):
    with ThreadPoolExecutor(max_workers=len(TRENDING_QUERIES)) as pool:
        batches = list(pool.map(
            lambda q: ysearch(q, filter="songs", limit=5), TRENDING_QUERIES))
    out, seen = [], set()
    for results in batches:  # query order preserved -> stable ranking
        for item in results:
            vid = item.get("videoId")
            if vid and vid not in seen:
                seen.add(vid)
                artist = _first_artist(item)
                out.append({
                    "videoId": vid,
                    "title": item.get("title"),
                    "artist": artist.get("name", "Unknown"),
                    "artistId": artist.get("id"),
                    "thumbnail": _thumb(item),
                    "duration": item.get("duration_seconds"),
                })
    return out[:10]


def artist(argv):
    name = argv[0]
    found = ysearch(name, filter="artists", limit=1)
    if not found:
        return {}
    a = found[0]
    with ThreadPoolExecutor(max_workers=2) as pool:
        songs_f = pool.submit(lambda: ysearch(name, filter="songs", limit=10))
        albums_f = pool.submit(lambda: ysearch(name, filter="albums", limit=10))
        songs, albums = songs_f.result(), albums_f.result()
    return {
        "artistId": a.get("browseId"),
        "name": a.get("artist"),
        "thumbnail": _thumb(a),
        "topSongs": [{
            "videoId": s.get("videoId"),
            "title": s.get("title"),
            "thumbnail": _thumb(s),
            "duration": s.get("duration_seconds"),
        } for s in songs],
        "albums": [{
            "albumId": al.get("browseId"),
            "title": al.get("title"),
            "year": al.get("year"),
            "thumbnail": _thumb(al),
        } for al in albums],
    }


def _tracks(items):
    return [{
        "videoId": t.get("videoId"),
        "title": t.get("title"),
        "duration": t.get("duration_seconds", 0),
    } for t in items if t.get("videoId")]


def album(argv):
    # ["--id", albumId]  -> exact tracklist;  [title, artist] -> best-effort song search
    if len(argv) >= 2 and argv[0] == "--id":
        with client() as c:
            a = c.get_album(argv[1])
        return {
            "albumId": argv[1],
            "title": a.get("title"),
            "artist": _first_artist(a).get("name"),
            "year": a.get("year"),
            "thumbnail": _thumb(a),
            "tracks": _tracks(a.get("tracks", [])),
        }
    if len(argv) >= 2:
        results = ysearch(f"{argv[0]} {argv[1]}", filter="songs", limit=15)
        return {"title": argv[0], "artist": argv[1], "tracks": _tracks(results)}
    return {"error": "Missing album id or title/artist"}


COMMANDS = {"search": search, "trending": trending, "artist": artist, "album": album}
