with open('assets/index-f92d7118.js', 'r', encoding='utf-8') as f:
    c = f.read()

work_start = c.find('o.jsx("section",{id:"work",ref:s')
photog_start = c.find('o.jsx("section",{id:"photography"')

if work_start != -1 and photog_start != -1:
    old_work = c[work_start:photog_start]

    projects_map = '[{title:"Autonomous Job Application Agent",desc:"An LLM-powered autonomous agent that discovers job opportunities, enriches company data, and generates personalized outreach using AI reasoning and API orchestration.",tech:["Python","LangChain","LLM APIs","Automation"],link:"https://github.com/mohdirfan-code"},{title:"InsightPDF — Production RAG System",desc:"A production-ready Retrieval-Augmented Generation system that enables intelligent question answering over documents using vector search and contextual LLM responses.",tech:["Python","LangChain","FAISS","RAG Pipelines"],link:"https://github.com/mohdirfan-code"},{title:"Zidio Workplace Emotion Dashboard",desc:"A multimodal AI system analyzing facial expressions and speech signals to visualize workplace mood trends such as engagement, stress, and burnout.",tech:["DeepFace","Whisper","FastAPI","Python"],link:"https://github.com/mohdirfan-code"},{title:"AI Potential Client Identifier",desc:"An AI model that analyzes incoming client requests and identifies high-potential leads based on urgency, budget signals, industry fit, and communication quality.",tech:["Machine Learning","Python","NLP","Data Analysis"],link:"https://github.com/mohdirfan-code"}].map((p,i)=>o.jsxs(C.a,{href:p.link,target:"_blank",rel:"noopener noreferrer",variants:he,whileHover:{y:-6,boxShadow:"0 20px 40px rgba(255,255,255,0.05), 0 0 20px #000"},style:{display:"flex",flexDirection:"column",textDecoration:"none",color:"#111",background:"#fff",borderRadius:"16px",padding:"1.5rem",boxShadow:"0 4px 15px rgba(0,0,0,0.1)",textAlign:"center"},children:[o.jsx("div",{style:{overflow:"hidden",borderRadius:"12px",marginBottom:"1.5rem",width:"100%",aspectRatio:"16/9",background:"#f5f5f5"},children:o.jsx(C.div,{whileHover:{scale:1.05},transition:{duration:0.3},style:{width:"100%",height:"100%",background:"linear-gradient(135deg, #eee 0%, #ddd 100%)"}})}),o.jsx("h3",{style:{fontSize:"1.15rem",fontWeight:"600",marginBottom:"0.5rem",fontFamily:"var(--font-main)"},children:p.title}),o.jsx("p",{style:{fontSize:"0.9rem",lineHeight:"1.5",opacity:0.8,marginBottom:"1.5rem",flex:1},children:p.desc}),o.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.5rem",justifyContent:"center"},children:p.tech.map(t=>o.jsx("span",{style:{padding:"0.25rem 0.6rem",background:"rgba(0,0,0,0.05)",borderRadius:"20px",fontSize:"0.75rem",fontWeight:"500"},children:t},t))})],i))'
    
    new_work = 'o.jsx(C.section,{id:"work",ref:s,initial:{backgroundColor:"rgba(0,0,0,0)"},whileInView:{backgroundColor:"#000000"},viewport:{margin:"-25% 0px -25% 0px"},transition:{duration:0.8},style:{padding:"6rem 0",marginBottom:"0"},children:o.jsxs(C.div,{variants:Xi,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-10%"},className:"section-inner container",children:[o.jsx(C.div,{variants:he,style:{marginBottom:"4rem",textAlign:"center"},children:o.jsx("h2",{className:"section-label",style:{color:"rgba(255,255,255,0.5)"},children:o.jsx(_s,{children:"MY WORKS"})})}),o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",maxWidth:"1000px",margin:"0 auto"},children:REPLACE_PROJECTS})]})}),'
    new_work = new_work.replace('REPLACE_PROJECTS', projects_map)

    c = c.replace(old_work, new_work)
    
    with open('assets/index-f92d7118.js', 'w', encoding='utf-8') as f:
        f.write(c)
    print("Patch 12 applied")
else:
    print("Failed to find work/photography bounds")
