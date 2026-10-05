import sys
import json
from ytmusicapi import YTMusic


def by_id(ytmusic, album_id):
    # Authoritative tracklist for a known album (browseId from search results).
    a = ytmusic.get_album(album_id)
    artists = a.get("artists") or [{}]
    return {
        "albumId": album_id,
        "title": a.get("title"),
        "artist": artists[0].get("name"),
        "year": a.get("year"),
        "thumbnail": (a.get("thumbnails") or [{}])[-1].get("url"),
        "tracks": [
            {
                "videoId": t.get("videoId"),
                "title": t.get("title"),
                "duration": t.get("duration_seconds", 0),
            }
            for t in a.get("tracks", [])
            if t.get("videoId")
        ],
    }


def by_search(ytmusic, title, artist):
    # Fallback when no albumId is known: best-effort song search (may include other releases).
    results = ytmusic.search(f"{title} {artist}", filter="songs", limit=15)
    return {
        "title": title,
        "artist": artist,
        "tracks": [
            {
                "videoId": t.get("videoId"),
                "title": t.get("title"),
                "duration": t.get("duration_seconds", 0),
            }
            for t in results
            if t.get("videoId")
        ],
    }


def main():
    # usage: album.py --id <albumId>   |   album.py <title> <artist>
    try:
        ytmusic = YTMusic()
        if len(sys.argv) >= 3 and sys.argv[1] == "--id":
            print(json.dumps(by_id(ytmusic, sys.argv[2])))
        elif len(sys.argv) >= 3:
            print(json.dumps(by_search(ytmusic, sys.argv[1], sys.argv[2])))
        else:
            print(json.dumps({"error": "Missing album id or title/artist"}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))


if __name__ == "__main__":
    main()
