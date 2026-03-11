with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('id="photography"')
if idx == -1:
    idx = c.find('id="photography"')
if idx == -1:
    idx = c.find('photography')
    
if idx != -1:
    print(c[max(0, idx-500):idx+500])
else:
    print("Not found")

# Look for night-section
print("night-section count:", c.count("night-section"))
idx2 = c.find('night-section')
if idx2 != -1:
    print("context nearby night-section:")
    print(c[max(0, idx2-300):idx2+800])

print("finding scroll hooks")
print(c[c.find('useScroll'):c.find('useScroll')+1000])

