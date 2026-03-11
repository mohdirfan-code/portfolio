import re
import json

with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

# The original work section starts around: o.jsx("section",{id:"work",ref:s,children:o.jsxs(C.div,{variants:Xi...
work_start = c.find('o.jsx("section",{id:"work",ref:s')
if work_start == -1:
    print("Could not find work start")
else:
    # Need to find the end of the section
    # Let's search for the start of the next section, which is photography
    photog_start = c.find('o.jsx("section",{id:"photography"')
    work_content = c[work_start:photog_start]
    
    with open('tmp_work_section.txt', 'w', encoding='utf-8') as fw:
        fw.write(work_content)

    print("Extracted work section")
