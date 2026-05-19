import sys
import json
from ytmusicapi import YTMusic

def main():
    if len(sys.argv) < 2:
        print(json.dumps({}))
        return

    artist_name = sys.argv[1]

    ytmusic = YTMusic()

    # ✅ Search for artist info
    artist_results = ytmusic.search(artist_name, filter="artists", limit=1)

    if not artist_results:
        print(json.dumps({}))
        return

    artist = artist_results[0]

    formatted = {
        "artistId": artist.get("browseId"),
        "name": artist.get("artist"),
        "thumbnail": artist.get("thumbnails", [{}])[-1].get("url"),
        "topSongs": [],
        "albums": []
    }

    # ✅ Get top songs via search
    songs = ytmusic.search(artist_name, filter="songs", limit=10)

    for item in songs:
        formatted["topSongs"].append({
            "videoId": item.get("videoId"),
            "title": item.get("title"),
            "thumbnail": item.get("thumbnails", [{}])[-1].get("url"),
            "duration": item.get("duration_seconds"),
        })

    # ✅ Get albums via search
    albums = ytmusic.search(artist_name, filter="albums", limit=10)

    for album in albums:
        formatted["albums"].append({
            "albumId": album.get("browseId"),
            "title": album.get("title"),
            "year": album.get("year"),
            "thumbnail": album.get("thumbnails", [{}])[-1].get("url"),
        })

    print(json.dumps(formatted))

if __name__ == "__main__":
    main()