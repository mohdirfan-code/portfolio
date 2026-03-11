with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('backgroundColor:q0')
if idx != -1:
    with open('tmp_scroll_layout.txt', 'w', encoding='utf-8') as f:
        f.write(c[max(0, idx-1500):idx+500])
