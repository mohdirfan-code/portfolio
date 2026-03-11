const fs = require('fs');
const file = 'assets/index-f92d7118.js';
let content = fs.readFileSync(file, 'utf8');

// replace "Oleti" with empty string
content = content.replace(/Oleti/gi, '');

// Clean up double spaces that might result from "Irfan Oleti" -> "Irfan "
content = content.replace(/Irfan  /gi, 'Irfan ');

fs.writeFileSync(file, content);
console.log('Oleti removal finished!');
