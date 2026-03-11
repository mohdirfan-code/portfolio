with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

# look for "const t=y.useRef("
idx = c.find('const t=y.useRef(')
if idx != -1:
    with open('tmp_refs.txt', 'w', encoding='utf-8') as f:
        f.write(c[idx:idx+800])
