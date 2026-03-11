const fs = require('fs');
const file = 'assets/index-f92d7118.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace Gowtham with Irfan
content = content.replace(/Gowtham/g, 'Irfan');
content = content.replace(/gowtham/g, 'irfan');
content = content.replace(/GOWTHAM/g, 'IRFAN');

// 2. Replace OG with Irfan
content = content.replace(/\bOG\b/g, 'Irfan');

// 3. Make it simple -> Make it happen
content = content.replace(/"Make it ",o\.jsx\("br",\{\}\),"simple!"/g, '"Make it ",o.jsx("br",{}),"happen!"');
content = content.replace(/Make it simple/g, 'Make it happen');

// 4. Update me.jpeg / gowtham.jpeg
content = content.replace(/me\.jpeg/g, 'irfan.jpeg');
content = content.replace(/gowtham\.jpeg/g, 'irfan.jpeg');

// 5. Replace Hero Profile Photo URL
content = content.replace(/https:\/\/static\.wixstatic\.com\/media\/5c0589_e35[^"']+/g, 'assets/irfan_hero.jpg');

fs.writeFileSync(file, content);
console.log('Replacement finished!');
