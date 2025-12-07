"""
Simple helper to copy a local image into the repo `assets/hero-shop.png`.
Usage (PowerShell):
  python scripts\copy_hero_image.py "D:\New folder (2)\1.png"
If the destination file already exists it will be overwritten.
"""
import shutil
import sys
from pathlib import Path

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts\\copy_hero_image.py <path-to-source-image>")
        sys.exit(2)
    src = Path(sys.argv[1])
    if not src.exists():
        print(f"Source file not found: {src}")
        sys.exit(1)
    dst = Path(__file__).resolve().parents[1] / 'assets' / 'hero-shop.png'
    dst.parent.mkdir(parents=True, exist_ok=True)
    try:
        shutil.copy2(src, dst)
        print(f"Copied {src} -> {dst}")
    except Exception as e:
        print('Copy failed:', e)
        sys.exit(1)

if __name__ == '__main__':
    main()
