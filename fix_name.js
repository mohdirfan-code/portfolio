const fs = require('fs');
const file = 'assets/index-f92d7118.js';
let content = fs.readFileSync(file, 'utf8');

// replace "Irfan Oleti" with "Irfan"
content = content.replace(/Irfan Oleti/gi, 'Irfan');

// replace original "Gowtham Oleti" if any remain (though they should be "Irfan Oleti" now)
content = content.replace(/Gowtham Oleti/gi, 'Irfan');

fs.writeFileSync(file, content);
console.log('Name replacement finished!');
