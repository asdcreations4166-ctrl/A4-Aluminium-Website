#!/usr/bin/env python3
"""Scan HTML files for asset references and attempt simple fixes.
- Finds `src` and `href` values pointing into `assets/`.
- If the referenced file is missing, tries swapping extensions (.jpg <-> .png <-> .svg).
- Applies safe in-place HTML updates when a replacement file exists.
- Prints a summary at the end.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_GLOB = ['*.html']

SRC_RE = re.compile(r"(src|href)\s*=\s*\"([^\"]+)\"")

candidates = ['.png', '.jpg', '.jpeg', '.svg', '.webp']

summary = {'checked': 0, 'missing': 0, 'fixed': 0, 'errors': []}

for html in ROOT.glob('*.html'):
    text = html.read_text(encoding='utf-8')
    modified = False
    for m in SRC_RE.finditer(text):
        attr, path = m.groups()
        if not path.startswith('assets/'):
            continue
        summary['checked'] += 1
        target = (ROOT / path).resolve()
        if target.exists():
            continue
        summary['missing'] += 1
        # try swapping extensions
        p = Path(path)
        base = str(p.with_suffix(''))
        found_replacement = None
        for ext in candidates:
            candidate_path = ROOT / (base + ext)
            if candidate_path.exists():
                found_replacement = base + ext
                break
        if found_replacement:
            # replace all exact occurrences of original path -> replacement
            text = text.replace(path, found_replacement)
            modified = True
            summary['fixed'] += 1
            print(f"Fixed in {html.name}: {path} -> {found_replacement}")
        else:
            summary['errors'].append(f"Missing asset: {path} referenced in {html}")

    if modified:
        html.write_text(text, encoding='utf-8')

print('\nSummary:')
print(f"Files scanned: {len(list(ROOT.glob('*.html')))}")
print(f"Asset references checked: {summary['checked']}")
print(f"Missing references found: {summary['missing']}")
print(f"Auto-fixed references: {summary['fixed']}")
if summary['errors']:
    print('\nUnresolved items:')
    for e in summary['errors']:
        print(' -', e)

if summary['missing'] == 0:
    sys.exit(0)
if summary['missing'] == summary['fixed']:
    sys.exit(0)
sys.exit(2)
