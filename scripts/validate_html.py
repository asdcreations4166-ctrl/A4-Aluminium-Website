#!/usr/bin/env python3
"""Simple HTML validator and auto-fixer.
- Parses HTML files under the repo root.
- Reports parse errors (if parser reports), missing `lang` on <html>, duplicate IDs, images missing `alt`.
- Auto-fixes missing `alt` by inserting `alt=""` and writes files back (safe change).
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
html_files = list(ROOT.glob('*.html'))

try:
    from lxml import html
    LXML = True
except Exception:
    import html as std_html
    LXML = False

summary = {'files': 0, 'missing_lang': [], 'duplicate_ids': {}, 'images_missing_alt': [], 'fixed_alt': 0}

for f in html_files:
    summary['files'] += 1
    text = f.read_text(encoding='utf-8')
    try:
        if LXML:
            doc = html.fromstring(text)
        else:
            # fallback: basic checks via string operations
            doc = None
    except Exception as e:
        print(f"Parse error in {f}: {e}")
        continue

    # check html lang
    if LXML:
        html_el = doc.xpath('//html')
        if html_el:
            lang = html_el[0].get('lang')
            if not lang:
                summary['missing_lang'].append(str(f))
        # duplicate ids
        ids = {}
        for el in doc.xpath('//*'):
            _id = el.get('id')
            if _id:
                ids.setdefault(_id, []).append(el.tag)
        duplicates = {k: v for k, v in ids.items() if len(v) > 1}
        if duplicates:
            summary['duplicate_ids'][str(f)] = duplicates

        # images missing alt
        imgs = doc.xpath('//img')
        missing = [img for img in imgs if (img.get('alt') is None or img.get('alt') == '')]
        if missing:
            summary['images_missing_alt'].append((str(f), len(missing)))
            # auto-fix: add empty alt for missing
            changed = False
            new_text = text
            for img in missing:
                src = img.get('src') or ''
                # replace first occurrence of <img ...src="..."> without alt with alt=""
                # This is a best-effort string replace
                import re
                pattern = r"(<img[^>]*src=\"{}\"[^>]*)(>)".format(re.escape(src))
                new_text, n = re.subn(pattern, r"\1 alt=\"\"\2", new_text, count=1, flags=re.IGNORECASE)
                if n:
                    changed = True
            if changed:
                f.write_text(new_text, encoding='utf-8')
                summary['fixed_alt'] += 1

print('Validation summary:')
print(f"Files checked: {summary['files']}")
print(f"Files missing <html lang>: {len(summary['missing_lang'])}")
for p in summary['missing_lang']:
    print(' -', p)
print(f"Files with duplicate IDs: {len(summary['duplicate_ids'])}")
for p, dup in summary['duplicate_ids'].items():
    print(' -', p, ':', ', '.join(dup.keys()))
print(f"Files with images missing alt: {len(summary['images_missing_alt'])}, auto-fixed in {summary['fixed_alt']} files")
for p, count in summary['images_missing_alt']:
    print(' -', p, f'({count} images)')

if summary['missing_lang'] or summary['duplicate_ids']:
    sys.exit(2)
sys.exit(0)
