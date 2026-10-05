# F. Prioritised roadmap

Complexity: S ≤ half-day, M ≤ 2 days, L > 2 days.

## P0 – security / integrity
| Item | Status | Verify |
|---|---|---|
| Shell injection in stream route | **Done** | `npm test` (SECURITY regression) |
| Untrack `node_modules`, `.env`, `data/*.db`; fix `*.json` ignore rule; rotate any key that ever lived in `.env` history | **Open (S)** – needs your OK to touch the git index | `git ls-files | grep node_modules` empty |
| Decide YouTube/yt-dlp legality posture (see PROVIDERS_AND_LICENSING.md) | **Open – decision** | written policy; README wording |

## P1 – broken core
| Item | Status |
|---|---|
| Input validation, JSON errors, no stack leaks, 404 for unknown artist, empty-stream handling | **Done** |
| Album accuracy: `album.py` text-searches songs, so tracks can belong to other releases. Use `get_album(browseId)` (works without auth for public albums – verify with current ytmusicapi) and pass `albumId` from search results (M) |
| Frontend: re-resolve stream URL on error/expiry, ignore stale responses when skipping (M, client work) |

## P2 – reliability / performance
| Item | Status |
|---|---|
| Process pool, timeouts, queue-full 503, in-flight dedupe, TTL tied to URL expiry, graceful shutdown, tighter limiter | **Done** |
| Replace per-request Python spawn (~1.7–3.9 s on a miss) with a long-lived Python worker or a Node port of the used endpoints (M-L); only if cold-miss latency matters – cache hits are ~3 ms |
| `/api/ready` that runs `yt-dlp --version` and a ytmusicapi smoke call, cached 60 s; pin and auto-update yt-dlp in the deploy (S) |
| Persistent cache (SQLite via the existing `data/` slot) so restarts do not cold-start; skip Redis until >1 instance (M) |
| Update README error codes and `.env` docs; OpenAPI spec (`openapi.yaml`; note `.gitignore` ignores `*.json`) (S) |

## P3 – features, by value ÷ effort
1. Provider abstraction + at least one legal provider (Jamendo or Internet Archive) (L) – prerequisite for a store-safe product.
2. Search suggestions endpoint with client debounce (S).
3. Local-first favourites/history/playlists in the app, with optional export/import JSON; accounts + sync only if demanded (M / L).
4. "Report unavailable track" endpoint feeding provider health (S).
5. Lyrics via an authorised provider; similar-track/genre discovery via MusicBrainz tags (M).
