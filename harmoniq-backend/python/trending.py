import json
from ytmusicapi import YTMusic

def main():
    ytmusic = YTMusic()

    # ✅ Use stable trending queries
    queries = [
        "top hits",
        "trending songs",
        "viral songs",
        "top music 2026"
    ]

    formatted = []
    seen_ids = set()

    for query in queries:
        results = ytmusic.search(query, filter="songs", limit=5)

        for item in results:
            video_id = item.get("videoId")

            # Avoid duplicates and invalid entries
            if video_id and video_id not in seen_ids:
                formatted.append({
                    "videoId": video_id,
                    "title": item.get("title"),
                    "artist": item.get("artists", [{}])[0].get("name", "Unknown"),
                    "artistId": item.get("artists", [{}])[0].get("id"),
                    "thumbnail": item.get("thumbnails", [{}])[-1].get("url"),
                    "duration": item.get("duration_seconds"),
                })

                seen_ids.add(video_id)

            if len(formatted) >= 10:
                break

        if len(formatted) >= 10:
            break

    print(json.dumps(formatted))

if __name__ == "__main__":
    main()