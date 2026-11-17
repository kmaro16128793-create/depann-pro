#!/usr/bin/env python3
"""Submit depan2pneus.com sitemap URLs to IndexNow.

Bing Webmaster Tools already has this site, and IndexNow was already used
(22 self-submissions recorded in March 2026). The existing key file at the
site root is reused. This script never generates a new key.

Dry-run is the default. Nothing is sent unless --send is passed.
Do not run --send against production unless you intend to notify
https://api.indexnow.org/indexnow.

    python3 scripts/indexnow.py
    python3 scripts/indexnow.py --send
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOST = "depan2pneus.com"
ENDPOINT = "https://api.indexnow.org/indexnow"
SITEMAP = ROOT / "sitemap.xml"
KEY_RE = re.compile(r"[0-9a-fA-F]{32}")


def find_key_file() -> tuple[Path, str]:
    """Return the existing root key file. Never create one."""
    matches: list[tuple[Path, str]] = []
    for path in sorted(ROOT.glob("*.txt")):
        text = path.read_text(encoding="utf-8").strip()
        if KEY_RE.fullmatch(text) and path.stem.lower() == text.lower():
            matches.append((path, text.lower()))
    if len(matches) != 1:
        names = [p.name for p, _ in matches] or ["(none)"]
        raise SystemExit(
            "Expected exactly one existing IndexNow key file (32 hex chars, "
            f"filename equal to the key). Found: {', '.join(names)}. "
            "Refusing to generate a new key."
        )
    return matches[0]


def load_urls() -> list[str]:
    text = SITEMAP.read_text(encoding="utf-8")
    urls = re.findall(r"<loc>\s*(https://depan2pneus\.com/[^<\s]*)\s*</loc>", text)
    if not urls:
        raise SystemExit("No URLs found in sitemap.xml")
    seen: set[str] = set()
    ordered: list[str] = []
    for url in urls:
        if url not in seen:
            seen.add(url)
            ordered.append(url)
    return ordered


def build_payload(key: str, key_name: str, urls: list[str]) -> dict:
    return {
        "host": HOST,
        "key": key,
        "keyLocation": f"https://{HOST}/{key_name}",
        "urlList": urls,
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="IndexNow submitter for depan2pneus.com (dry-run by default)."
    )
    parser.add_argument(
        "--send",
        action="store_true",
        help="POST the sitemap URLs to IndexNow. Without this flag, nothing is sent.",
    )
    args = parser.parse_args()
    key_path, key = find_key_file()
    urls = load_urls()
    body = build_payload(key, key_path.name, urls)
    print(f"host: {HOST}")
    print(f"key file: {key_path.name} (existing key, reused)")
    print(f"endpoint: {ENDPOINT}")
    print(f"urls: {len(urls)}")
    if not args.send:
        preview = dict(body)
        if len(urls) > 5:
            preview["urlList"] = urls[:5] + [f"... {len(urls) - 5} more"]
        print("dry-run: request was NOT sent.")
        print("Pass --send only when you intend to notify IndexNow for the live host.")
        print(json.dumps(preview, ensure_ascii=False, indent=2))
        return 0
    data = json.dumps(body, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        print(f"status: {response.status}")
        print(response.read().decode("utf-8", errors="replace"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
