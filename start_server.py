#! python3

import sys
import os

from http.server import HTTPServer, CGIHTTPRequestHandler
from socketserver import ThreadingMixIn


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    pass


httpd = ThreadedHTTPServer(('0.0.0.0', 8000), CGIHTTPRequestHandler)

os.chdir(r'web')
print("Starting...")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nKeyboard interrupt received, exiting.")
    httpd.server_close()
    sys.exit(0)
