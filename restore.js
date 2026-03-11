const fs = require('fs');
let c = fs.readFileSync('assets/index-f92d7118.js', 'utf8');
const old_work = fs.readFileSync('tmp_work_section.txt', 'utf8');

const start = c.indexOf('o.jsx(C.section,{id:"work"');
// the next block is photography
const end = c.indexOf('o.jsx("section",{id:"photography"');

if (start !== -1 && end !== -1 && end > start) {
    const broken_new_work = c.substring(start, end);
    c = c.replace(broken_new_work, old_work);
    fs.writeFileSync('assets/index-f92d7118.js', c, 'utf8');
    console.log("RESTORED WORK SECTION");
} else {
    console.log("FAILED TO FIND BOUNDS:", start, end);
}
