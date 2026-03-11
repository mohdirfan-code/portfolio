import json

with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

idx = c.find('useRef(null)')
if idx != -1:
    res = []
    # find all instances of useRef(null) in the main App
    # The main app component contains `q0=pe(T...`
    main_app_idx = c.find('q0=pe(')
    start = max(0, main_app_idx - 500)
    end = min(len(c), main_app_idx + 1000)
    
    with open('tmp_app.txt', 'w', encoding='utf-8') as fw:
        fw.write(c[start:end])
    print("Exported tmp_app")
