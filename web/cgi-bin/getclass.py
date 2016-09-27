import urllib.request
import re
import json
import time
import os

print("Cache-control: no-cache")
print("Content-Type: application/json")
print()

name = 'resource\class.json'
f = open(name, 'r', encoding='utf-8')
data = json.load(f)

print(data)

