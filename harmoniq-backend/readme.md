# 🎵 Harmoniq Backend API



The backend service for the **Harmoniq Music Streaming App**.

This is a lightweight, ultra-fast Node.js/Express API that serves YouTube Music metadata and direct audio stream URLs.



---



## 🧠 Core Architecture Strategy: "Auth-Free Search Extraction"



To prevent Google from blocking requests via OAuth expiration or Cookie invalidation, this backend uses a **100% Auth-Free Strategy**.



- We do not use `get_artist()` or `get_album()` which require logged-in sessions.

- Instead, we reconstruct Artist and Album pages using highly targeted `ytmusicapi` search queries.

- **Audio Streaming** is handled strictly by `yt-dlp` to extract direct CDN URLs, meaning **zero bandwidth cost** for this server.

- **Caching** (`node-cache`) is aggressively used to ensure sub-5ms response times and prevent rate-limiting.



---



# 📂 System Components



## 1. The Controllers (`src/controllers/`)



The controllers act as the traffic directors. Every controller follows this strict flow:



1. **Validation:** Checks if the required query parameters or URL parameters are present.

2. **Cache Check:** Looks up the requested data in `node-cache`. If it exists, it returns immediately (ultra-fast).

3. **Service Execution:** If the cache is missed, it calls the respective Service (which spawns a Python process or `yt-dlp`).

4. **Cache Set & Respond:** Saves the fresh data into the cache (TTL varies from 30 mins to 24 hours) and returns the JSON to the client.



---



## 2. The Python Scripts (`python/`)



Because the best library for YouTube Music metadata (`ytmusicapi`) is written in Python, we use Node's `child_process.execFile` to run these scripts as lightweight microservices.



- `search_music.py` → Searches for songs and formats the metadata cleanly.

- `trending.py` → Runs multiple curated search queries ("top hits", "viral songs") to generate a stable trending list without relying on unstable chart layouts.

- `artist.py` → Reconstructs an artist profile (Top Songs & Albums) by executing targeted searches for the artist's name.

- `album.py` → Retrieves the official tracklist for an album by searching for the combined Album Title and Artist Name.



---



## 3. Middleware (`src/middleware/`)



To protect the backend from spam and bot abuse, we use standard Express middleware.



- `rateLimiter.js`: Uses `express-rate-limit` to restrict each IP address to **100 requests per 15 minutes**.

- **Proxy Trusting:** The app is configured to `trust proxy`, ensuring that the rate limiter accurately reads client IPs when deployed behind reverse proxies like Render or Railway.

- **Headers:** All responses include standard `RateLimit-*` headers to inform clients of their remaining quota. *(Note: The `/api/health` endpoint is exempt from rate limiting to allow unlimited uptime pings).*



---



# 📡 API Routes & Documentation



## Base URL



```txt

[http://localhost:3000](http://localhost:3000 "http://localhost:3000")

```



---



# 1. Health Check



Checks if the server is alive and functioning.



- **Endpoint:** `GET /api/health`



### Response



```json

{

  "status": "ok",

  "uptime": 120.45,

  "timestamp": "2026-02-08T12:00:00.000Z"

}

```



---



# 2. Search Songs



Searches for songs on YouTube Music.



- **Endpoint:** `GET /api/search?q={query}`

- **Example:** `/api/search?q=shape of you`

- **Cache TTL:** `1 Hour`



### Response



```json

{

  "success": true,

  "data": [

    {

      "videoId": "JGwWNGJdvx8",

      "title": "Shape of You",

      "artist": "Ed Sheeran",

      "artistId": "UC0C-a84...",

      "album": "÷ (Divide)",

      "albumId": "MPREb_...",

      "duration": 234,

      "thumbnail": "https://yt3.googleusercontent.com/...",

      "isExplicit": false

    }

  ],

  "cached": false

}

```



---



# 3. Get Audio Stream URL



Extracts the direct Google Video audio stream URL for playback.



- **Endpoint:** `GET /api/stream/:videoId`

- **Example:** `/api/stream/JGwWNGJdvx8`

- **Cache TTL:** `4 Hours`



### Response



```json

{

  "success": true,

  "data": {

    "url": "https://rr1---sn-h0jeen7r.googlevideo.com/videoplayback?expire=..."

  },

  "cached": true

}

```



> **Note:** The client streams directly from this URL. The backend does not proxy the audio.



---



# 4. Get Trending Songs



Returns a curated list of today's top/trending hits.



- **Endpoint:** `GET /api/trending`

- **Cache TTL:** `30 Minutes`



### Response



```json

{

  "success": true,

  "data": [

    {

      "videoId": "xTvyyoF_LZY",

      "title": "Shape of You",

      "artist": "Ed Sheeran",

      "artistId": "UC0C-a84...",

      "thumbnail": "https://...",

      "duration": 234

    }

  ],

  "cached": false

}

```



---



# 5. Get Artist Details



Retrieves an artist's top songs and albums using a name-based search strategy.



- **Endpoint:** `GET /api/artist?name={artistName}`

- **Example:** `/api/artist?name=Ed Sheeran`

- **Cache TTL:** `1 Hour`



### Response



```json

{

  "success": true,

  "data": {

    "artistId": "UClmXPfaYhXOYsNn_QUyheWQ",

    "name": "Ed Sheeran",

    "thumbnail": "https://...",

    "topSongs": [

      {

        "videoId": "ORrFJ63nlcA",

        "title": "Perfect",

        "thumbnail": "https://...",

        "duration": 264

      }

    ],

    "albums": [

      {

        "albumId": "MPREb_yO8yWJ51yY6",

        "title": "÷ (Divide)",

        "year": "2017",

        "thumbnail": "https://..."

      }

    ]

  },

  "cached": false

}

```



---



# 6. Get Album Tracklist



Retrieves the official songs inside a specific album.



- **Endpoint:** `GET /api/album?title={albumTitle}&artist={artistName}`

- **Example:** `/api/album?title=Divide&artist=Ed Sheeran`

- **Cache TTL:** `24 Hours`



### Response



```json

{

  "success": true,

  "data": {

    "title": "Divide",

    "artist": "Ed Sheeran",

    "tracks": [

      {

        "videoId": "Xr5n32SkzGQ",

        "title": "Eraser",

        "duration": 228

      },

      {

        "videoId": "wqlTrBCNRiY",

        "title": "Castle on the Hill",

        "duration": 262

      }

    ]

  },

  "cached": false

}

```



---



# 🛠️ Local Development Setup



## 1. Install Node Dependencies



```bash

npm install

```



---



## 2. Install Python & Required Packages



Ensure Python 3 is installed on your system.



```bash

pip install ytmusicapi yt-dlp

```



---



## 3. Start the Server (Development Mode)



```bash

npm run dev

```



The server will start on:



```txt

[http://localhost:3000](http://localhost:3000 "http://localhost:3000")

```