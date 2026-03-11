const fs = require('fs');
const path = require('path');

const indexJsPath = 'assets/index-f92d7118.js';
const patchJsPath = 'assets/portfolio-patch.js';
const htmlPath = 'index.html';

// 1. Modify assets/index-f92d7118.js
if (fs.existsSync(indexJsPath)) {
    let content = fs.readFileSync(indexJsPath, 'utf8');

    // Email replacement
    content = content.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, 'mohdirfanwork786@gmail.com');

    // Name replacement
    content = content.replace(/Irfan Oleti/g, 'Irfan');
    content = content.replace(/Irfan  /g, 'Irfan '); // Fix potential double spaces

    // Sticky note text
    // Matches ["Make it ",o.jsx("br",{}),"simple!"]
    content = content.replace(/\["Make it ",[a-z]\.jsx\("br",\{.*?\}\),"simple!"\]/g, '"Make it happen!"');

    // Disable components
    // up=({x:e,y:t,color:n,name:i,isAnimated:r=!1,showName:s=!0})=>{...}
    // We look for up=({x:e,y:t,color:n,name:i,isAnimated:r=!1,showName:s=!0})=>{
    content = content.replace(/up=\(\{x:[a-z],y:[a-z],color:[a-z],name:[a-z],isAnimated:[a-z]=!1,showName:[a-z]=!0\}\)=>\{/g, 'up=()=>null;const _unused_up=({x:e,y:t,color:n,name:i,isAnimated:r=!1,showName:s=!0})=>{');
    
    // OT=()=>{...}
    content = content.replace(/OT=\(\)=>\{/g, 'OT=()=>null;const _unused_OT=()=>{');

    fs.writeFileSync(indexJsPath, content);
    console.log('Modified assets/index-f92d7118.js');
}

// 2. Modify assets/portfolio-patch.js
if (fs.existsSync(patchJsPath)) {
    let content = fs.readFileSync(patchJsPath, 'utf8');

    // Email replacement
    content = content.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, 'mohdirfanwork786@gmail.com');

    // Name replacement
    content = content.replace(/Irfan Oleti/g, 'Irfan');

    fs.writeFileSync(patchJsPath, content);
    console.log('Modified assets/portfolio-patch.js');
}

// 3. Modify index.html
if (fs.existsSync(htmlPath)) {
    let content = fs.readFileSync(htmlPath, 'utf8');

    const cursorCss = `
    <style>
        * { cursor: auto !important; }
        .cursor, .blue-cursor, #cursor, [class*="cursor"], .up-cursor { 
            display: none !important; 
            visibility: hidden !important; 
            pointer-events: none !important; 
        }
    </style>`;

    if (!content.includes('cursor: auto !important')) {
        content = content.replace('</head>', cursorCss + '\n</head>');
        fs.writeFileSync(htmlPath, content);
        console.log('Modified index.html');
    }
}
