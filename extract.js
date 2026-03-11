const fs = require('fs');
let content = fs.readFileSync('assets/index-f92d7118.js', 'utf8');
const idx = content.indexOf('children:t},t))');
if (idx > -1) {
    let out = content.substring(idx - 200, idx + 200);
    fs.writeFileSync('extracted.txt', out, 'utf8');
} else {
    fs.writeFileSync('extracted.txt', 'NOT FOUND', 'utf8');
}
