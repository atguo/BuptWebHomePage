import requests
import re
import json
import time
import os

print("Cache-control: no-cache")
print("Content-Type: application/json")
print()

file_path = os.path.join(os.path.dirname(__file__) + '/resource/form.json')
res = requests.get(r'http://10.3.8.211/')
text = res.text
flow = re.search(r"flow='(\d+)\s*'", text)
if flow:
    ret = {'status': 0, 'flow': int(flow.group(1)), "time": time.time()}
    print(json.dumps(ret))
else:
    f = open(file_path,  'r',  encoding='utf-8')
    form = json.load(f)
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "ozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
    }
    requests.post(r'http://10.3.8.211/', form, headers)
