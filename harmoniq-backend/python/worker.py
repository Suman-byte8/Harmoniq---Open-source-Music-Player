"""Long-lived worker: avoids re-importing ytmusicapi and re-opening connections per request.

Protocol (JSON lines): stdin  {"id": 1, "cmd": "search", "args": ["coldplay", "8"]}
                       stdout {"id": 1, "result": ...}  or  {"id": 1, "error": "..."}
"""
import json
import sys
import threading
from concurrent.futures import ThreadPoolExecutor

import lib

write_lock = threading.Lock()


def reply(payload):
    with write_lock:
        sys.stdout.write(json.dumps(payload) + "\n")
        sys.stdout.flush()


def handle(req):
    rid = req.get("id")
    try:
        fn = lib.COMMANDS[req["cmd"]]
        reply({"id": rid, "result": fn([str(a) for a in req.get("args", [])])})
    except Exception as e:  # noqa: BLE001 - report every failure to the caller
        reply({"id": rid, "error": str(e)})


def main():
    sys.stdin.reconfigure(encoding="utf-8")
    sys.stdout.reconfigure(encoding="utf-8")
    with ThreadPoolExecutor(max_workers=8) as pool:
        for line in sys.stdin:
            line = line.strip()
            if not line:
                continue
            try:
                req = json.loads(line)
            except ValueError:
                continue
            pool.submit(handle, req)


if __name__ == "__main__":
    main()
