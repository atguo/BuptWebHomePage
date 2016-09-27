import urllib.request
import re
import json
import time

print("Cache-control: no-cache")
print("Content-Type: application/json")
print()

res = urllib.request.urlopen(r'http://10.3.8.211/')
text = res.read(1000).decode("gbk")
flow = re.search(r"flow='(\d+)\s*'", text).group(1)
ret = {'status': 0, 'flow': int(flow), "time": time.time()}
print(json.dumps(ret))
