import http.server
import socketserver
import os
import sys
import urllib.parse

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # translate_path is complex, let's use valid simple logic:
        # absolute path = Current Working Dir + path
        # (This is simplified, but works for this flat repo structure)
        
        # Remove query strings
        path = self.path.split('?')[0]
        path = path.split('#')[0]
        
        # Convert web path to file system path
        # e.g. /lore/ -> ./lore/
        # e.g. /lore/index.html -> ./lore/index.html
        
        cwd = os.getcwd()
        rel_path = urllib.parse.unquote(path.lstrip('/'))
        full_path = os.path.join(cwd, rel_path)
        
        # Debug print
        # print(f"Request: {path} -> {full_path}")

        # If it is a directory, SimpleHTTPRequestHandler looks for index.html automatically inside do_GET
        # We need to detect if that will fail.
        
        exists = os.path.exists(full_path)
        
        # If directory, check valid index
        if exists and os.path.isdir(full_path):
             index = os.path.join(full_path, 'index.html')
             if not os.path.exists(index):
                 # Directory exists but no index.html -> 404 (to avoid directory listing if we wanted, 
                 # but standard behavior lists dir. Let's force 404 if you want strict site behavior, 
                 # or just let it fall through. User wants 404 for *broken* links.)
                 pass 
        
        if not exists:
            # Serve Custom 404
            self.serve_404()
            return
            
        # If we are here, file/dir exists. Let parent handle it.
        # But parent handles "File not found" internally if we are wrong?
        # Actually super().do_GET() handles everything. We want it to handle it, 
        # BUT if it fails, we want 404. 
        # Since SimpleHTTPRequestHandler sends errors immediately, we can't easily intercept "after".
        # So checking existence beforehand is the standard way for simple scripts.
        
        super().do_GET()

    def serve_404(self):
        try:
            # Print to console so user sees it triggered
            print(f"[{self.date_time_string()}] CUSTOM 404 TRIGGERED for {self.path}")
            
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            
            # Read 404.html from root
            with open('404.html', 'rb') as f:
                self.wfile.write(f.read())
        except Exception as e:
            print(f"Error serving 404.html: {e}")
            self.send_error(404, "File not found and 404.html missing")

print("="*60)
print(f"   USCM MILITARY GUIDE - CUSTOM DEBUG SERVER")
print(f"   http://localhost:{PORT}")
print("="*60)
print("   [!] This is a custom script to test the 404 page.")
print("   [!] Standard 'python -m http.server' DOES NOT show customs 404s.")
print("   [!] Press Ctrl+C to stop.")
print("="*60)

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
