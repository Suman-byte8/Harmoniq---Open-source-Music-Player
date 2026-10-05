# E. Music providers and licensing

## Current providers (what they actually do)

| Component | Role | Status |
|---|---|---|
| `ytmusicapi` (unofficial) | search, trending, artist/album text-search, thumbnails | Reverse-engineered, non-public YouTube Music endpoints. No API key, no quota contract, can break or be blocked any time. |
| `yt-dlp` | extracts direct audio stream URLs from YouTube | Extracts media outside YouTube's player. |

Metadata availability is not a licence to play. Nothing in the code checks whether a track is licensed for this use.

## Licensing risk (needs your decision – not something code can fix)

My reading, to be verified with the actual current documents/legal advice: YouTube's Terms of Service and API Services Terms generally prohibit accessing/downloading content other than through the provided player/API, and prohibit separating audio from video or building background/audio-only players on its streams. If that applies, the stream path (`yt-dlp`) is not an authorised use, and a public app/store listing built on it carries takedown and account/store risk for the project and for the music's rights holders. The README currently markets this as zero-cost streaming; it should not claim a licensed catalogue or "all music for free". I did **not** harden or extend the yt-dlp path further than needed to remove the RCE.

## Recommended direction: provider abstraction, legal sources first

Interface (one file per provider under `src/providers/`):
`search(q, opts) → Track[]`, `getTrack(id)`, `resolveStream(id) → {url, expiresAt, license, attribution}` (reject if no authorised playable source), `health()`, with errors typed (`NotFound`, `RateLimited`, `Unavailable`). Tracks carry `provider`, `license`, `attributionText`, `sourceUrl`. A registry runs providers in priority order with per-provider timeouts and circuit breakers; metadata-only providers must never return `playable: true`.

Candidate authorised free sources (**all unverified – check current terms, quotas, commercial-use clauses and attribution rules before adopting**):

| Source | Content | Things to verify |
|---|---|---|
| Jamendo API | Creative Commons music, streaming URLs | free API key; non-commercial vs commercial tiers; per-track CC licence & attribution; rate limits |
| Internet Archive | public-domain & CC recordings (Great 78s, Live Music Archive) | per-item licence; download/stream endpoints; polite-use limits |
| Free Music Archive | CC catalogue | current API/availability (service has changed hands/status before) |
| Openverse (audio) | CC-licensed audio aggregation | which upstreams give playable files; attribution fields |
| ccMixter / Musopen | CC / public-domain | API availability, licence per track |
| MusicBrainz + Cover Art Archive | metadata and artwork only (CC0 / varied) | metadata only: never playable; User-Agent and 1 req/s rule |
| LRCLIB (lyrics) | community synced lyrics | licensing of lyric text is separate from music rights – verify |

Fallback strategy: try providers in order → on `Unavailable`/no stream, next provider → if none, return 404 `no_playable_source` and let users report it. Keep YouTube-based code behind an opt-in provider flag (`ENABLE_UNOFFICIAL_YOUTUBE=false` by default in public deployments) so self-hosters take that responsibility knowingly.

Licence of this project is ISC in `package.json`; no change was made. Dependency licences (express, helmet, cors, etc. MIT; ytmusicapi MIT; yt-dlp Unlicense) are permissive but were not exhaustively verified.
