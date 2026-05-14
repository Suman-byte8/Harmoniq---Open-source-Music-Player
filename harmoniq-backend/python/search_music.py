import sys
import json
from ytmusicapi import YTMusic

def main():
    if len(sys.argv) < 2:
        print(json.dumps([]))
        return

    query = sys.argv[1]
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 8

    ytmusic = YTMusic()
    results = ytmusic.search(query, filter="songs", limit=limit)

    formatted = []

    for item in results:
        formatted.append({
            "videoId": item.get("videoId"),
            "title": item.get("title"),
            "artist": item.get("artists", [{}])[0].get("name", "Unknown"),
            "artistId": item.get("artists", [{}])[0].get("id"),
            "album": item.get("album", {}).get("name") if item.get("album") else None,
            "albumId": item.get("album", {}).get("id") if item.get("album") else None,
            "duration": item.get("duration_seconds"),
            "thumbnail": item.get("thumbnails", [{}])[-1].get("url"),
            "isExplicit": item.get("isExplicit", False)
        })

    print(json.dumps(formatted))

if __name__ == "__main__":
    main()