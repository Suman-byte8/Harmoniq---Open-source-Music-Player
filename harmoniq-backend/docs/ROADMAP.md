# F. Prioritised roadmap

Complexity: S ≤ half-day, M ≤ 2 days, L > 2 days.

## P0 – security / integrity
| Item | Status | Verify |
|---|---|---|
| Shell injection in stream route | **Done** | `npm test` (SECURITY regression) |
| Untrack `node_modules`, `.env`, `data/*.db`; fix `*.json` ignore rule; rotate any key that ever lived in `.env` history | **Done** – untracked, `.gitignore` fixed (`*.json` rule replaced by explicit credential files). History still contains them; rotate any real key | `git ls-files | grep node_modules` empty |
| Decide YouTube/yt-dlp legality posture (see PROVIDERS_AND_LICENSING.md) | **Open – decision** | written policy; README wording |

## P1 – broken core
| Item | Status |
|---|---|
| Input validation, JSON errors, no stack leaks, 404 for unknown artist, empty-stream handling | **Done** |
| **Done**: `GET /api/album?albumId=` uses `get_album` (verified live, unauthenticated); title+artist kept as fallback. Frontend should pass `albumId` from search results |
| Frontend: re-resolve stream URL on error/expiry, ignore stale responses when skipping (M, client work) |

## P2 – reliability / performance
| Item | Status |
|---|---|
| Process pool, timeouts, queue-full 503, in-flight dedupe, TTL tied to URL expiry, graceful shutdown, tighter limiter | **Done** |
| **Done**: long-lived Python worker with pooled clients, parallel artist/trending lookups, stale-while-revalidate + boot/25-min trending warm-up, gzip. Measured live (local machine): search miss 2.3 s → 0.5 s, artist 3.9 s → 1.1 s, album-by-id ≈ 0.4 s, trending 2.0 s → 0.02 s; cache hits ≈ 3 ms. Stream (`yt-dlp`) still ≈ 2.6–3.2 s on a miss – unchanged, see next row |
| Faster stream resolution: `yt-dlp` is spawned per miss; options are a Node-native extractor or prefetching the next track client-side (client work recommended first) |
| **Done**: `/api/ready`. Still open: pin/auto-update yt-dlp in the deploy |
| Persistent cache (SQLite via the existing `data/` slot) so restarts do not cold-start; skip Redis until >1 instance (M) |
| **Done**: README updated, `docs/openapi.yaml` added |

## P3 – features, by value ÷ effort
1. Provider abstraction + at least one legal provider (Jamendo or Internet Archive) (L) – prerequisite for a store-safe product.
2. Search suggestions endpoint with client debounce (S).
3. Local-first favourites/history/playlists in the app, with optional export/import JSON; accounts + sync only if demanded (M / L).
4. "Report unavailable track" endpoint feeding provider health (S).
5. Lyrics via an authorised provider; similar-track/genre discovery via MusicBrainz tags (M).
