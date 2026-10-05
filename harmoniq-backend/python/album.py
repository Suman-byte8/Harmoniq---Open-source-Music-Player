import sys, json
import lib

try:
    print(json.dumps(lib.album(sys.argv[1:])))
except Exception as e:
    print(json.dumps({"error": str(e)}))
