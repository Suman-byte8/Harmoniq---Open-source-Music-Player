import sys, json
import lib

print(json.dumps(lib.search(sys.argv[1:])))
