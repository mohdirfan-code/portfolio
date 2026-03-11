const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.startsWith('patch') && f.endsWith('.py'));
let out = '';
files.forEach(f => {
    out += `\n--- ${f} ---\n` + fs.readFileSync(f, 'utf8');
});
fs.writeFileSync('patches_dump.txt', out, 'utf8');
