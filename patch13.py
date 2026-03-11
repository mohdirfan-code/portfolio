with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

faulty = 'children:t},t))})],i))})]})'
correct = 'children:t},t))}]},i))})]})'

if faulty in c:
    c = c.replace(faulty, correct)
    with open('assets/index-f92d7118.js', 'w', encoding='utf-8') as f:
        f.write(c)
    print("Fixed syntax error")
else:
    print("Faulty string not found")
