#!/bin/bash
set -x

mkdir -p images

# Helper to fetch wiki image
fetch_wiki() {
    title=$1
    filename=$2
    # Sleep to avoid 429
    sleep 1
    url=$(curl -s "https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=400" | grep -o '"source":"[^"]*"' | head -n 1 | cut -d'"' -f4)
    if [ ! -z "$url" ]; then
        curl -L -s -o "images/${filename}" "$url"
        echo "Downloaded $title to $filename"
    else
        echo "Failed to find image for $title"
    fi
}

fetch_wiki "Cameron_Green" "green.jpg"
fetch_wiki "Dinesh_Karthik" "karthik.jpg"
fetch_wiki "Rajat_Patidar" "patidar.jpg"
fetch_wiki "Will_Jacks" "jacks.jpg"
fetch_wiki "Yash_Dayal" "dayal.jpg"
fetch_wiki "Mahipal_Lomror" "lomror.jpg"
fetch_wiki "Karn_Sharma" "sharma.jpg"
