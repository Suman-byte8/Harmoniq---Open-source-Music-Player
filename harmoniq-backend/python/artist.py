import sys, json
import lib

print(json.dumps(lib.artist(sys.argv[1:])))
