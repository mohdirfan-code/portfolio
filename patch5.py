with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('photography"')
if idx != -1:
    with open('tmp_photog3.txt', 'w', encoding='utf-8') as f:
        f.write(c[max(0, idx-500):idx+3000])
    print("Found photography")
else:
    print("Not found")

idx2 = c.find('work-list')
if idx2 != -1:
    with open('tmp_work_list.txt', 'w', encoding='utf-8') as f:
        f.write(c[max(0, idx2-500):idx2+6000])
    print("Found work list")
