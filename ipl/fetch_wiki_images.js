const https = require('https');
const fs = require('fs');
const path = require('path');

const players = [
    { name: 'kohli.jpg', title: 'Virat_Kohli' },
    { name: 'faf.jpg', title: 'Faf_du_Plessis' },
    { name: 'maxwell.jpg', title: 'Glenn_Maxwell' },
    { name: 'siraj.jpg', title: 'Mohammed_Siraj' },
    { name: 'green.jpg', title: 'Cameron_Green_(cricketer)' },
    { name: 'karthik.jpg', title: 'Dinesh_Karthik' },
    { name: 'patidar.jpg', title: 'Rajat_Patidar' },
    { name: 'jacks.jpg', title: 'Will_Jacks' },
    { name: 'ferguson.jpg', title: 'Lockie_Ferguson' },
    { name: 'dayal.jpg', title: 'Yash_Dayal' }
];

const imgDir = path.join(__dirname, 'images');

function getWikiImageUrl(title) {
    return new Promise((resolve, reject) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=400`;
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pages[pageId] && pages[pageId].thumbnail) {
                        resolve(pages[pageId].thumbnail.source);
                    } else {
                        resolve(null);
                    }
                } catch(e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return download(res.headers.location, dest).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Status Code: ${res.statusCode}`));
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        });
        req.on('error', (err) => reject(err));
    });
}

async function main() {
    for (const p of players) {
        console.log(`Fetching URL for ${p.title}...`);
        const url = await getWikiImageUrl(p.title);
        if (url) {
            console.log(`Downloading ${url} to ${p.name}...`);
            try {
                await download(url, path.join(imgDir, p.name));
                console.log(`Success: ${p.name}`);
            } catch(e) {
                console.log(`Failed to download ${p.name}:`, e.message);
            }
        } else {
            console.log(`No image found for ${p.title}`);
        }
    }
    console.log("Done fetching wiki images.");
}

main();
