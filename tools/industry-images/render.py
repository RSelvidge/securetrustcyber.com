"""Render the industry threat images: python render.py [scene ...]
Writes assets/img/industries/<scene>.webp (1280x720). Needs: playwright + Chrome, Pillow, and `npm install` in tools/ring-hero (for three.js).
Scenes live in scenes.js; the prop kit in kit.js."""
import sys, re, http.server, threading, functools
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = Path(__file__).parent
OUT = ROOT.parent.parent / 'assets' / 'img' / 'industries'; OUT.mkdir(parents=True, exist_ok=True)
TMP = ROOT / '.png'; TMP.mkdir(exist_ok=True)
names = sys.argv[1:] or re.findall(r"^  '([a-z0-9-]+)'\(S\)", (ROOT / 'scenes.js').read_text(), re.M)

class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 8770), functools.partial(Q, directory=str(ROOT.parent)))
threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'])
    for n in names:
        pg = b.new_page(viewport={'width': 1280, 'height': 720})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(f'http://127.0.0.1:8770/industry-images/render.html#{n}')
        try: pg.wait_for_function('window.renderDone === true', timeout=60000)
        except Exception as e: errs.append(str(e))
        if errs: print('ERR', n, errs[:2]); pg.close(); continue
        pg.locator('canvas').screenshot(path=str(TMP / f'{n}.png'))
        Image.open(TMP / f'{n}.png').convert('RGB').save(OUT / f'{n}.webp', 'WEBP', quality=82, method=6)
        print('ok', n, (OUT / f'{n}.webp').stat().st_size // 1024, 'KB')
        pg.close()
    b.close()
srv.shutdown()
