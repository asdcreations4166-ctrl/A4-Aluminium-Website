#!/usr/bin/env python3
"""Capture screenshots of main pages at multiple breakpoints using Playwright.

Usage:
  1) Install Playwright: `pip install playwright && playwright install` (one-time)
  2) Run a local server at repo root: `python -m http.server 8000`
  3) Run this script: `python scripts/capture_screenshots.py`

Outputs are written to `screenshots/` with filenames like `index.desktop.png`.
"""
from pathlib import Path
import asyncio
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / 'screenshots'
OUT_DIR.mkdir(exist_ok=True)

PAGES = [
    ('index.html', 'index'),
    ('products.html', 'products'),
    ('contact.html', 'contact'),
    ('partners.html', 'partners'),
    ('careers.html', 'careers'),
]

BREAKPOINTS = [
    ('mobile', 375, 812),    # iPhone SE-ish
    ('tablet', 768, 1024),   # iPad portrait
    ('desktop', 1366, 768),  # typical laptop
]

BASE_URL = 'http://127.0.0.1:8000/'


async def run():
    try:
        from playwright.async_api import async_playwright
    except Exception as e:
        print('Playwright is not installed. Install with: pip install playwright && playwright install')
        raise

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, slug in PAGES:
            url = BASE_URL + name
            for bp_name, w, h in BREAKPOINTS:
                context = await browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1)
                page = await context.new_page()
                print(f'Navigating to {url} at {bp_name} ({w}x{h})')
                try:
                    resp = await page.goto(url, wait_until='networkidle', timeout=20000)
                except Exception as exc:
                    print(f'  Failed to load {url}: {exc}')
                    await context.close()
                    continue
                # small delay to allow any animations to finish
                await page.wait_for_timeout(500)
                out_path = OUT_DIR / f'{slug}.{bp_name}.png'
                await page.screenshot(path=str(out_path), full_page=True)
                print(f'  Saved {out_path}')
                await context.close()
        await browser.close()


if __name__ == '__main__':
    try:
        asyncio.run(run())
    except Exception as e:
        print('Error running screenshots:', e)
        sys.exit(1)
