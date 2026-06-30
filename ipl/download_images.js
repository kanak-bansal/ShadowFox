const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    { name: 'kohli.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Japan_Match_of_the_Hero_Asian_Champions_Trophy_Chennai_2023.jpg' },
    { name: 'faf.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Faf_du_Plessis_2019.jpg' },
    { name: 'maxwell.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Glenn_Maxwell_-_2015_Cricket_World_Cup_%28cropped%29.jpg' },
    { name: 'siraj.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Mohammed_Siraj.jpg' },
    { name: 'green.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Cameron_Green_in_2023_%28cropped%29.jpg' },
    { name: 'karthik.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Dinesh_Karthik.jpg' },
    { name: 'patidar.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Rajat_Patidar_in_2023.jpg/800px-Rajat_Patidar_in_2023.jpg' },
    { name: 'jacks.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Will_Jacks_in_2023.jpg/800px-Will_Jacks_in_2023.jpg' },
    { name: 'ferguson.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Lockie_Ferguson.jpg/800px-Lockie_Ferguson.jpg' },
    { name: 'dayal.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm8_A6jQcT4cK2X9o-Q5xXW3D1Y9sS9ZJ1Q&s' },
    { name: 'lomror.jpg', url: 'https://m.cricbuzz.com/a/img/v1/192x192/i1/c332513/mahipal-lomror.jpg' },
    { name: 'sharma.jpg', url: 'https://m.cricbuzz.com/a/img/v1/192x192/i1/c332519/karn-sharma.jpg' },
    { name: 'topley.jpg', url: 'https://m.cricbuzz.com/a/img/v1/192x192/i1/c332517/reece-topley.jpg' },
    { name: 'joseph.jpg', url: 'https://m.cricbuzz.com/a/img/v1/192x192/i1/c332515/alzarri-joseph.jpg' },
    { name: 'prabhudessai.jpg', url: 'https://m.cricbuzz.com/a/img/v1/192x192/i1/c332521/suyash-prabhudessai.jpg' },
    { name: 'stadium_bg.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/M._Chinnaswamy_Stadium_Bangalore.jpg/1200px-M._Chinnaswamy_Stadium_Bangalore.jpg' },
    { name: 'stadium.jpg', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    { name: 'match.jpg', url: 'https://images.unsplash.com/photo-1624526267942-ab0f0b1010af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    { name: 'action.jpg', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    { name: 'news4.jpg', url: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    { name: 'rcb_win.jpg', url: 'https://images.livemint.com/img/2024/03/17/1600x900/Smriti_Mandhana_RCB_WPL_2024_1710705608753_1710705608930.jpg' }
];

const imgDir = path.join(__dirname, 'images');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            }
        };
        const req = https.get(url, options, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return download(res.headers.location, dest).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                console.log(`Failed to download ${url}: ${res.statusCode}`);
                // fallback to placeholder
                const placeholderUrl = 'https://placehold.co/400x400/EC1C24/FFFFFF/png?text=RCB';
                if(url !== placeholderUrl) {
                    console.log(`Using placeholder for ${dest}`);
                    return download(placeholderUrl, dest).then(resolve).catch(reject);
                }
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
    console.log(`Downloading ${images.length} images...`);
    for (const img of images) {
        try {
            await download(img.url, path.join(imgDir, img.name));
            console.log(`Downloaded ${img.name}`);
        } catch(e) {
            console.log(`Error downloading ${img.name}:`, e.message);
        }
    }
    console.log("Done.");
}

main();
