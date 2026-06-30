import urllib.request
import urllib.parse
import json
import re
import os
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

players = [
    {"name": "green.jpg", "query": "Cameron Green espncricinfo profile"},
    {"name": "karthik.jpg", "query": "Dinesh Karthik espncricinfo profile"},
    {"name": "patidar.jpg", "query": "Rajat Patidar espncricinfo profile"},
    {"name": "jacks.jpg", "query": "Will Jacks espncricinfo profile"},
    {"name": "dayal.jpg", "query": "Yash Dayal espncricinfo profile"},
    {"name": "lomror.jpg", "query": "Mahipal Lomror espncricinfo profile"},
    {"name": "sharma.jpg", "query": "Karn Sharma espncricinfo profile"}
]

img_dir = "images"
if not os.path.exists(img_dir):
    os.makedirs(img_dir)

def search_ddg(query):
    url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'href="(https://www\.espncricinfo\.com/cricketers/[^"]+)"', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"Error searching DDG for {query}: {e}")
    return None

def get_og_image(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # cricinfo usually has og:image or a specific class for player image
        match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if match:
            return match.group(1)
    except Exception as e:
        print(f"Error fetching profile {url}: {e}")
    return None

def download_image(url, filename):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(os.path.join(img_dir, filename), 'wb') as out_file:
            out_file.write(response.read())
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

for p in players:
    print(f"Finding {p['name']}...")
    profile_url = search_ddg(p['query'])
    if profile_url:
        print(f"Found profile: {profile_url}")
        img_url = get_og_image(profile_url)
        if img_url:
            print(f"Found image: {img_url}")
            if download_image(img_url, p['name']):
                print(f"Successfully downloaded {p['name']}")
            else:
                print(f"Failed to download image for {p['name']}")
        else:
            print(f"No og:image found for {p['name']}")
    else:
        print(f"Could not find profile for {p['name']}")
