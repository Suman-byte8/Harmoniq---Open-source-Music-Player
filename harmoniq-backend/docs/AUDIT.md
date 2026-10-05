# Harmoniq Backend Audit (2026-10-05)

Scope: `harmoniq-backend/` only. Real-network checks were run from a developer machine against the live YouTube Music / YouTube services via the repo's own tools; the automated suite stubs those tools.

## A. Architecture

Node 24 / Express 5, stateless, no database in use (`data/harmoniq.db` and `src/config/database.js` are empty placeholders). Every data request is: route -> controller -> `node-cache` (in-process) -> service -> **spawned child process**:

| Need | Process | Upstream |
|---|---|---|
| search / trending / artist / album | `python python/*.py` using `ytmusicapi` (unauthenticated) | YouTube Music internal API |
| stream URL | `yt-dlp -f bestaudio --get-url` | YouTube |

The API returns a signed `googlevideo.com` URL; the client fetches audio bytes **directly from Google's CDN**. The backend never proxies audio, so Range/206/HEAD handling is the CDN's job.

Strengths: tiny, zero audio bandwidth, sensible TTLs, health endpoint exempt from rate limiting, helmet + rate limit present.
Weaknesses (before this audit): shell-injection, no validation, no timeouts/concurrency cap, stack-trace leak, cache `maxKeys` crash, `.env`/`node_modules`/db tracked in git, no tests/CI/docs, and a single upstream (YouTube) with unresolved licensing (see PROVIDERS_AND_LICENSING.md).

Feature status: search ✅, trending ✅ (hard-coded queries incl. "top music 2026"), artist ✅ (reconstructed from searches, no discography ids), album ⚠️ (a text search, so tracks can be wrong/duplicated – e.g. "Parachutes" returns several tracks titled "Parachutes"), stream ✅. Missing: auth/accounts, playlists, favourites, history, lyrics, suggestions, recommendations, DB, OpenAPI. None of these were added.

## B. Endpoint test report

7 routes discovered. All 7 exercised live (baseline, pre-fix) and again after the fixes; 42 automated tests now cover them. Live = real upstream, Auto = `npm test` with stubbed processes.

| Endpoint | Baseline (live) | After fix | Auto tests |
|---|---|---|---|
| `GET /api/health` | 200 | 200 | ✅ incl. security headers |
| `GET /api/search?q=` | 200 (2.3s miss, 3ms hit); missing q → 400; **`q=a&q=b` → 500** | repeated/object/over-200-char q → 400 | ✅ |
| `GET /api/trending` | 200 | 200; failures → 502 | ✅ |
| `GET /api/artist?name=` | 200; **unknown artist → 200 `{}` (and cached)** | unknown → 404 (negative-cached 5 min) | ✅ |
| `GET /api/album?title=&artist=` | 200; missing → 400 | arrays → 400; collision-proof cache key | ✅ |
| `GET /api/stream/:videoId` | 200; **`x&echo INJECTED>file` created a file (RCE)**; invalid ids → 500; empty yt-dlp output → 200 with `url:""` cached 4h | strict 11-char id → 400; empty → 404 uncached | ✅ |
| unknown route / bad JSON | **HTML 404; HTML 400 including a stack trace with local file paths** | JSON 404 / JSON 400 | ✅ |

Other automated checks: process pool caps concurrency and returns 503 when the queue is full; in-flight de-duplication (5 concurrent identical searches → 1 spawn); cache-full no longer 500s; upstream failure → 502 w/o internals; timeout → 504; 413 for >10kb bodies; 429 after 100 req/15 min while `/health` stays exempt.

Not tested / blocked: authenticated or admin routes (none exist); DB reads/writes (no DB); behaviour under upstream rate-limiting by Google (not provoked deliberately); load/soak testing; mobile/browser playback (frontend not present in this checkout).

Reproduce the injection bug on the original code (`git show HEAD:harmoniq-backend/src/services/ytdlpService.js`): `GET /api/stream/x%26echo%20X%3Emarker.txt` on Windows, or `x;touch${IFS}/tmp/m` style payloads on Linux hosts such as Render.

## C. Security report

**Critical (fixed)**
- *OS command injection / RCE* – `ytdlpService.js` interpolated the URL param into `exec()` string. Fixed: `videoId` validated against `^[A-Za-z0-9_-]{11}$`, `execFile` (no shell), `--` before the URL. Regression tests included.

**High**
- *Secrets/artifacts in git (not fixed – needs your decision)*: `.env` (currently empty), `data/harmoniq.db` (empty) and **1,108 `node_modules` files** are tracked despite `.gitignore`. Because `.gitignore` ignores `*.json`, newly added JSON (e.g. future OpenAPI file, tsconfig) will silently be untracked too. Run when ready: `git rm -r --cached harmoniq-backend/node_modules harmoniq-backend/.env harmoniq-backend/data/harmoniq.db`; if `.env` ever held a real key, rotate it (history keeps it). I did not alter the index.
- *Production dependency CVEs (fixed)*: `npm audit fix` cleared body-parser, qs, morgan, ip-address; `npm audit --omit=dev` = 0. 3 remaining highs are dev-only (nodemon tree).

**Medium (fixed)**
- Stack trace and server paths in error responses (malformed JSON); now generic JSON errors.
- Unvalidated/unbounded input (arrays → 500, unlimited-length queries into subprocess args, unbounded cache keys).
- Unbounded process spawning, no timeout → trivial DoS: pool of 4 (env-configurable), queue 50 → 503, 30 s kill → 504; stricter 60/15 min limiter on lookups.
- `node-cache` throws past `maxKeys` → every cache-miss became a 500 after 1000 distinct queries (self-inflicted DoS). Now 5000 keys and cache-write errors are non-fatal.
- Cache key collisions in album (`a:b`+`c` vs `a`+`b:c`).

**Low / informational**
- CORS was `*`; now configurable via `CORS_ORIGIN` (default unchanged because it is a public read-only API).
- Rate limit is per-IP with `trust proxy = 1`; correct only if exactly one proxy fronts the app.
- Stream URLs are IP-bound to the **server** that resolved them (`ip=` param). Clients on other IPs may get 403; this is inherent to the yt-dlp approach and a licensing red flag (see providers doc), not a code bug.
- No SSRF surface: server only fetches fixed hosts via the tools. No SQL/NoSQL, no path handling, no file writes, no XSS (JSON only).
- `python` is resolved from PATH; set `PYTHON_BIN` explicitly in production.
- Logs: morgan logs URLs (search terms) – acceptable; no secrets exist.

## D. Playback and streaming report

Backend responsibility is only "resolve a playable URL". Facts: URLs carry `expire=` (~6 h) and an IP binding. Fixes made: cache TTL now = min(4 h, time-to-expire − 5 min) and never caches near-expiry/empty URLs; response now includes `expiresAt` so clients know when to re-resolve.

Frontend must implement (cannot be done in the backend): re-call `/api/stream/:id` on audio `error`/403/410 or after `expiresAt`; preload the *next* track's URL (not bytes) ~10-20 s before the end; cancel/ignore stale resolve responses by request token when users skip rapidly; queue/shuffle/repeat state; media-session metadata; retry with backoff on network loss. True gapless/crossfade requires Web Audio / dual-player in the client and a gapless-friendly codec (Opus/WebM from YouTube is generally fine; AAC/MP3 need encoder-delay trimming). Safari/iOS has limited WebM/Opus support, which would need to be checked against the formats yt-dlp returns (`itag=251` Opus was returned in testing). Range/206/Content-Range/HEAD: not applicable to this API (JSON only) and handled by Google's CDN; if a legal self-hosted source is added later, serve it with `express.static`/`res.sendFile` or a Range-aware handler and add tests for 206/416.

Not tested: actual audio playback, buffering, seek, mobile browsers (no client in this checkout).

## G. Test summary

- Endpoints discovered: 7 (incl. health, unknown-route handler). Tested live: 7. Tested automatically: 7.
- Automated: **42 passed, 0 failed, 0 skipped** (`npm test`, ~1.5 s, no network needed).
- Live post-fix verification: search, trending, artist (found / not found), album, stream (real yt-dlp), injection attempt, bad JSON, repeated params all behaved as expected.
- Bugs fixed: 9 (RCE; stack leak; array param 500; artist 200-empty; empty-stream cached as success; cache maxKeys 500s; album cache-key collision; python `IndexError` on empty `artists`/`thumbnails`; prod CVEs). Plus hardening: timeouts, concurrency pool, stricter limiter, body limit, graceful shutdown, 404 JSON.
- Regression tests added: 42 (see `tests/`).
- Remaining known issues: tracked `node_modules`/`.env`/db; YouTube licensing/ToS exposure; album endpoint accuracy; no OpenAPI, no accounts/playlists, no readiness probe that checks python/yt-dlp; yt-dlp breaks when YouTube changes (keep it updated); readme still describes the pre-fix behaviour (error codes) and should be updated.

## H. Developer handover

```bash
cd harmoniq-backend
npm ci
pip install ytmusicapi yt-dlp        # needed only for real upstream calls
cp .env.example .env
npm run dev                          # or: npm start   (default port 3000)
npm test                             # offline, stubs python/yt-dlp
npm audit --omit=dev
curl "localhost:3000/api/search?q=coldplay"
curl "localhost:3000/api/stream/dQw4w9WgXcQ"
```
