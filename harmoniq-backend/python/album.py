import sys
import json
from ytmusicapi import YTMusic

def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing title or artist"}))
        return

    title = sys.argv[1]
    artist = sys.argv[2]
    
    ytmusic = YTMusic()
    
    # We search for the exact album and artist songs
    query = f"{title} {artist}"
    
    try:
        results = ytmusic.search(query, filter="songs", limit=15)
        
        formatted = {
            "title": title,
            "artist": artist,
            "tracks": []
        }
        
        for t in results:
            if t.get("videoId"):
                formatted["tracks"].append({
                    "videoId": t.get("videoId"),
                    "title": t.get("title"),
                    "duration": t.get("duration_seconds", 0)
                })
                
        print(json.dumps(formatted))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()