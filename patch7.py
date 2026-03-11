import json
with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('id="photography"')
if idx == -1: idx = c.find('id:"photography"')
if idx == -1: idx = c.find("id:'photography'")
if idx == -1: idx = c.find('id: "photography"')

if idx != -1:
    with open('tmp_p_section.txt', 'w', encoding='utf-8') as f:
        f.write(c[max(0, idx-500):idx+500])
    print("Found photography section definition")
else:
    print("Not found")

# Let's locate the entire component definition containing `useScroll` for the global background.
idx_scroll = c.find('pe(T,[0,.1,.9,1],["#FAF8F5","#000000","#000000","#FAF8F5"])')
if idx_scroll != -1:
    with open('tmp_scroll.txt', 'w', encoding='utf-8') as f:
        f.write(c[max(0, idx_scroll-1500):idx_scroll+1000])
    print("Found scroll transitions")
