import urllib.request
import re

url = "https://www.bing.com/images/search?q=Swapnil+Singh+cricketer+profile&qft=+filterui:imagesize-medium"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'murl&quot;:&quot;(https://[^&]+)\.jpg', html)
    if match:
        img_url = match.group(1) + ".jpg"
        print("Found:", img_url)
        urllib.request.urlretrieve(img_url, "images/swapnil.jpg")
        print("Downloaded")
    else:
        print("Not found")
except Exception as e:
    print(e)
