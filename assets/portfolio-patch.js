/**
 * portfolio-patch.js
 * DOM patch script for Irfan's portfolio.
 * Runs after React mounts and modifies specific elements only.
 * Does NOT touch layout, animations, CSS, or any other section.
 */
(function () {
  'use strict';

  // ─── CONFIG ────────────────────────────────────────────────────────────────

  // Hero text content
  const HERO_GREETING_ARRAY_TEXT = "Irfan."; // shown after the cycling greeting
  const HERO_NAME_OVERRIDE = "I'm Irfan.";   // full name line if we can target it directly

  const HERO_SUBTITLE = "AI/ML Engineer building intelligent systems with Generative AI, machine learning, and autonomous agents.";
  const HERO_SUPPORTING = "I enjoy turning complex ideas into practical AI products.";
  const HERO_SMALL = "B.Tech AI & Data Science · Hyderabad, India";

  // Hero profile image (in polaroid card)
  const OLD_HERO_IMG_SRC = "5c0589_e35aa4884b1a47d388a577b03cb7b4ef"; // partial Wix URL
  const NEW_HERO_IMG_SRC = "assets/irfan_hero.jpg";

  // About section: 4 wixstatic images to replace (partial match → new path)
  const ABOUT_IMAGE_MAP = {
    "5c0589_8181afcd1a6041a2bd8abbca5dea28c2": "assets/irfan_about1.jpg",
    "5c0589_50f17c427f3d47a890204bec7d6b5b2a": "assets/irfan_about2.jpg",
    "5c0589_ffd5758e00f9438abc3f9fe91512d589": "assets/irfan_about3.jpg",
    "5c0589_276c5292e97441c89ba57bded4b74fea": "assets/irfan_about4.jpg",
  };

  // Polaroid camera section (instax component parent wrapper)
  const CAMERA_SELECTOR = '.instax-container';

  // ─── HELPER ────────────────────────────────────────────────────────────────

  function applyPatches() {
    let applied = 0;

    // ── 0. Photography fixes style injection ──────────────────────────────────
    if (!document.getElementById('photography-fixes')) {
      const style = document.createElement('style');
      style.id = 'photography-fixes';
      style.textContent = `
        #photography .captures-grid > div,
        #photography .captures-grid > div > div, 
        .photo-wrapper {
          background-color: #000 !important;
          border: none !important;
          box-shadow: none !important;
          overflow: hidden !important;
          padding: 0 !important;
          aspect-ratio: 3 / 4 !important;
          height: auto !important;
          max-height: none !important;
        }
        #photography .captures-grid img,
        .photo-wrapper img {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
      `;
      document.head.appendChild(style);
    }

    // ── 1. Hero text ──────────────────────────────────────────────────────────
    //
    // The hero title contains:
    //   [cycling greeting] | I'm OG.
    // We want to keep the cycling greeting and change the name
    //
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      // Find all text nodes and spans inside • the name " OG." or "I'm OG."
      // The structure is roughly: <h1><span class="hero-main-text">…</span> I'm OG.</h1>
      // Walk child nodes looking for "OG" text
      heroTitle.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("OG")) {
          node.textContent = node.textContent.replace(/OG\.?/g, "Irfan.");
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // check inner text for "I'm OG."
          if (node.textContent.includes("I'm OG")) {
            node.textContent = node.textContent.replace("I'm OG.", "I'm Irfan.");
          }
          // Also walk all inner spans
          node.querySelectorAll('*').forEach(el => {
            if (el.children.length === 0 && el.textContent.includes("OG")) {
              el.textContent = el.textContent.replace(/OG\.?/g, "Irfan.");
            }
          });
        }
      });

      // Also do a direct innerHTML replacement as fallback for "I'm OG."
      if (heroTitle.innerHTML.includes("I'm OG")) {
        heroTitle.innerHTML = heroTitle.innerHTML.replace(/I'm OG\./g, "I'm Irfan.");
      }
      if (heroTitle.innerHTML.includes("I&#39;m OG")) {
        heroTitle.innerHTML = heroTitle.innerHTML.replace(/I&#39;m OG\./g, "I&#39;m Irfan.");
      }
      applied++;
    }

    // Replace "Make it simple!" and "me.jpeg"
    const textWalker = (n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        if (n.textContent.includes('Make it simple!')) {
          n.textContent = n.textContent.replace('Make it simple!', 'Make it happen!');
          applied++;
        }
        if (n.textContent.includes('me.jpeg')) {
          n.textContent = n.textContent.replace('me.jpeg', 'irfan.jpeg');
          applied++;
        }
      } else {
        n.childNodes.forEach(textWalker);
      }
    };
    textWalker(document.body);

    // ── 2. Hero bio / subtitle paragraphs ─────────────────────────────────────
    const heroBio = document.querySelector('.hero-bio');
    if (heroBio) {
      const paras = heroBio.querySelectorAll('p');
      if (paras.length >= 1) {
        // Replace first paragraph with our subtitle
        paras[0].innerHTML = HERO_SUBTITLE;
        applied++;
      }
      if (paras.length >= 2) {
        // Replace second paragraph with supporting line
        paras[1].innerHTML = HERO_SUPPORTING;
        applied++;
      } else {
        // Create supporting line if not there
        const p2 = document.createElement('p');
        p2.textContent = HERO_SUPPORTING;
        heroBio.appendChild(p2);
        applied++;
      }

      // Add small location/degree line if not present
      if (!heroBio.querySelector('.hero-small-line')) {
        const small = document.createElement('p');
        small.className = 'hero-small-line';
        small.style.cssText = 'font-size:0.9rem;opacity:0.6;margin-top:0.5rem;';
        small.textContent = HERO_SMALL;
        heroBio.appendChild(small);
        applied++;
      }
    }

    // ── 3. Hero image (polaroid card) ─────────────────────────────────────────
    const heroImg = document.querySelector('.polaroid-img');
    if (heroImg) {
      const currentSrc = heroImg.src || heroImg.getAttribute('src') || '';
      if (currentSrc.includes('5c0589') || currentSrc.includes('wixstatic')) {
        heroImg.src = NEW_HERO_IMG_SRC;
        heroImg.style.filter = 'none'; // remove grayscale filter on polaroid
        heroImg.style.objectFit = 'cover';
        heroImg.style.width = '100%';
        heroImg.style.height = '100%';
        applied++;
      }
    }
    // Also check background-image style for polaroid
    const polaroidBg = document.querySelector('.polaroid-img, .card-polaroid .polaroid-img');
    if (polaroidBg && polaroidBg.tagName !== 'IMG') {
      polaroidBg.style.backgroundImage = `url(${NEW_HERO_IMG_SRC})`;
      polaroidBg.style.backgroundSize = 'cover';
      polaroidBg.style.backgroundPosition = 'center';
      applied++;
    }

    // ── 4. About section images ───────────────────────────────────────────────
    const allImgs = document.querySelectorAll('img');
    allImgs.forEach(img => {
      const src = img.src || '';
      for (const [oldKey, newSrc] of Object.entries(ABOUT_IMAGE_MAP)) {
        if (src.includes(oldKey)) {
          img.src = newSrc;
          img.style.objectFit = 'cover';
          applied++;
          break;
        }
      }
    });

    // ── 5. Remove Polaroid Camera Section ────────────────────────────────────
    const cameraEl = document.querySelector(CAMERA_SELECTOR);
    if (cameraEl) {
      // Find closest section/block parent to remove the entire camera block
      let parent = cameraEl;
      // Walk up to find a section-level wrapper
      for (let i = 0; i < 6; i++) {
        if (!parent.parentElement) break;
        const pp = parent.parentElement;
        // If the parent is a section or a major layout div, stop
        const tag = pp.tagName.toLowerCase();
        if (tag === 'section' || tag === 'main' || pp.id === 'root') break;
        // If the parent contains other significant content, stop one level up
        const siblings = Array.from(pp.children);
        const hasSiblingsWithContent = siblings.some(s => s !== parent && s.textContent.trim().length > 50);
        if (hasSiblingsWithContent) break;
        parent = pp;
      }
      // Hide the camera block + its parent wrapper
      parent.style.display = 'none';
      // Also always hide the instax container itself
      cameraEl.style.display = 'none';
      applied++;
    }

    // ── 6. Update page title ───────────────────────────────────────────────────
    if (document.title.toLowerCase().includes('gowtham') || document.title.toLowerCase().includes('portfolio')) {
      document.title = "Irfan | AI/ML Engineer";
    }

    // ── 7. Update Works Section ─────────────────────────────────────────────
    const workSection = document.getElementById('work');
    if (workSection && !workSection.dataset.patched) {
      // Remove any black background and specific theming that changes navbar
      workSection.style.backgroundColor = 'transparent';
      workSection.style.color = 'inherit';
      workSection.classList.remove('dark-section', 'bg-black');
      workSection.removeAttribute('data-theme');

      // Specifically target inner wrappers that might have black bg
      const inners = workSection.querySelectorAll('.section-inner, .bg-black, [data-theme="dark"]');
      inners.forEach(inner => {
        inner.style.backgroundColor = 'transparent';
        inner.style.color = 'inherit';
        inner.classList.remove('bg-black', 'dark-section');
        inner.removeAttribute('data-theme');
      });

      // Update Section Title
      const sectionLabel = workSection.querySelector('.section-label');
      if (sectionLabel) {
        const walkTitle = (node) => {
          if (node.nodeType === Node.TEXT_NODE && (node.textContent.includes('Selected Work') || node.textContent.includes('MY WORKS') || node.textContent.includes('Projects'))) {
            node.textContent = 'MY WORKS';
          } else {
            node.childNodes.forEach(walkTitle);
          }
        };
        walkTitle(sectionLabel);

        // Keep default font styling, only structure alignment
        Object.assign(sectionLabel.style, {
          display: "block",
          textAlign: "center"
        });

        // Center the wrapper container just in case
        if (sectionLabel.parentElement) {
          sectionLabel.parentElement.style.textAlign = "center";
          sectionLabel.parentElement.style.width = "100%";
          sectionLabel.parentElement.style.display = "flex";
          sectionLabel.parentElement.style.justifyContent = "center";
        }

        applied++;
      }

      // Update layout
      const workList = workSection.querySelector('.work-list');
      if (workList) {
        // Prevent layout shifts during patch
        workList.style.display = 'block';

        workList.innerHTML = `
          <style>
            .projects-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 2rem;
              width: 100%;
              max-width: 1200px;
              margin: 0 auto;
            }
            .project-card {
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              overflow: hidden;
              text-decoration: none;
              color: inherit;
              display: flex;
              flex-direction: column;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              cursor: pointer;
            }
            .project-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 30px rgba(0,0,0,0.12);
            }
            .project-card:hover .project-img {
              transform: scale(1.05);
            }
            .project-img-wrapper {
              width: 100%;
              position: relative;
              padding-top: 56.25%; /* 16:9 Aspect ratio */
              overflow: hidden;
              background-color: #f8f9fa;
            }
            .project-img {
              position: absolute;
              top: 0; left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.3s ease;
            }
            .project-info {
              padding: 1.5rem;
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              flex: 1;
            }
            .project-title {
              font-size: 1.25rem;
              font-weight: 600;
              margin: 0;
            }
            .project-desc {
              font-size: 0.95rem;
              opacity: 0.8;
              line-height: 1.5;
              margin: 0;
            }
            @media (max-width: 768px) {
              .projects-grid {
                grid-template-columns: 1fr;
              }
            }
          </style>
          
          <div class="projects-grid">
            <!-- Project 1 -->
            <a href="https://github.com/mohdirfan-code/Job-Assistant-AI-Agent" target="_blank" rel="noopener noreferrer" class="project-card">
              <div class="project-img-wrapper">
                <img src="assets/n8n.png" alt="Autonomous Job Application Agent" class="project-img">
              </div>
              <div class="project-info">
                <h3 class="project-title">Autonomous Job Application Agent</h3>
                <p class="project-desc">An AI agent that automatically discovers job opportunities, enriches company data, and generates personalized outreach using LLM reasoning and automation.</p>
              </div>
            </a>
            
            <!-- Project 2 -->
            <a href="https://github.com/mohdirfan-code/rag-chatbot" target="_blank" rel="noopener noreferrer" class="project-card">
              <div class="project-img-wrapper">
                <img src="assets/chatbot.jpg" alt="InsightPDF — Production RAG System" class="project-img">
              </div>
              <div class="project-info">
                <h3 class="project-title">InsightPDF — Production RAG System</h3>
                <p class="project-desc">A document intelligence system using Retrieval-Augmented Generation to answer questions from PDFs using vector search and contextual LLM responses.</p>
              </div>
            </a>
            
            <!-- Project 3 -->
            <a href="https://github.com/mohdirfan-code/zidio-emotion-detection-ai" target="_blank" rel="noopener noreferrer" class="project-card">
              <div class="project-img-wrapper">
                <img src="assets/streamlit.png" alt="Zidio Workplace Emotion Dashboard" class="project-img">
              </div>
              <div class="project-info">
                <h3 class="project-title">Zidio Workplace Emotion Dashboard</h3>
                <p class="project-desc">A multimodal AI platform analyzing facial expressions and speech signals to visualize workplace engagement, stress, and burnout.</p>
              </div>
            </a>
            
            <!-- Project 4 -->
            <a href="https://github.com/mohdirfan-code/pest-detection-system-final" target="_blank" rel="noopener noreferrer" class="project-card">
              <div class="project-img-wrapper">
                <img src="assets/pest.png" alt="AI Pest Detection System" class="project-img">
              </div>
              <div class="project-info">
                <h3 class="project-title">AI Pest Detection System</h3>
                <p class="project-desc">A deep learning system that identifies crop pests using ConvNeXt architecture and computer vision to support smarter agricultural monitoring.</p>
              </div>
            </a>
          </div>
        `;
        applied++;
      }

      workSection.dataset.patched = 'true';

      // ── 8. Add Research and Startup Sections ──────────────────────────────
      if (!document.getElementById('custom-sections-wrapper')) {
        const customWrapper = document.createElement('div');
        customWrapper.id = 'custom-sections-wrapper';
        customWrapper.style.cssText = 'width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 0 6rem 0;';

        customWrapper.innerHTML = `
          <style>
            .custom-section {
              margin-top: 6rem;
              padding: 0 5%;
            }
            .research-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 2rem;
              margin-top: 3rem;
            }
            .research-card {
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              padding: 2.5rem;
              text-decoration: none;
              color: inherit;
              display: flex;
              flex-direction: column;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              cursor: pointer;
            }
            .research-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 30px rgba(0,0,0,0.12);
            }
            .research-title {
              font-size: 1.25rem;
              font-weight: 600;
              margin: 0 0 0.75rem 0;
              line-height: 1.4;
            }
            .research-pub {
              font-size: 0.85rem;
              font-weight: 600;
              opacity: 0.6;
              margin: 0 0 1.25rem 0;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .research-desc {
              font-size: 0.95rem;
              opacity: 0.8;
              line-height: 1.6;
              margin: 0;
            }
            
            .startup-card {
              background: #ffffff;
              border-radius: 16px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              padding: 4rem;
              margin-top: 3rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .startup-logo {
              max-width: 250px;
              width: 100%;
              margin-bottom: 2.5rem;
              animation: floatLogo 5s ease-in-out infinite;
              transition: transform 0.3s ease;
            }
            .startup-logo:hover {
              transform: scale(1.03);
            }
            @keyframes floatLogo {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-7px); }
              100% { transform: translateY(0px); }
            }
            .startup-title {
              font-size: 2rem;
              font-weight: 700;
              margin: 0;
              letter-spacing: -0.01em;
            }
            .startup-role {
              font-size: 1.05rem;
              font-weight: 500;
              color: #666;
              margin: 0.5rem 0 2rem 0;
            }
            .startup-desc {
              font-size: 1.1rem;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto 2.5rem auto;
              opacity: 0.85;
            }
            .startup-highlights {
              list-style: none;
              padding: 0;
              margin: 0 auto 3rem auto;
              display: flex;
              flex-direction: column;
              gap: 0.85rem;
              text-align: left;
              max-width: 600px;
              width: 100%;
            }
            .startup-highlights li {
              position: relative;
              padding-left: 1.75rem;
              font-size: 1.05rem;
              opacity: 0.85;
            }
            .startup-highlights li::before {
              content: "•";
              color: #000;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
            .startup-actions {
              display: flex;
              gap: 1.25rem;
              justify-content: center;
              flex-wrap: wrap;
            }
            .startup-btn {
              padding: 0.85rem 1.75rem;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 500;
              font-size: 1rem;
              transition: all 0.2s ease;
            }
            .startup-btn-primary {
              background: #000;
              color: #fff;
            }
            .startup-btn-primary:hover {
              background: #333;
            }
            .startup-btn-secondary {
              background: #f1f1f1;
              color: #000;
            }
            .startup-btn-secondary:hover {
              background: #e1e1e1;
            }

            @media (max-width: 768px) {
              .research-grid {
                grid-template-columns: 1fr;
              }
              .startup-card {
                padding: 2.5rem 1.5rem;
              }
            }
          </style>

          <!-- Research Section -->
          <div class="custom-section" id="research">
            <h2 class="section-label" style="display:block; text-align:center;">Research</h2>
            <div class="research-grid">
              <a href="https://ieeexplore.ieee.org/document/10914886" target="_blank" rel="noopener noreferrer" class="research-card">
                <h3 class="research-title">Sentiment Analysis of Movie Reviews: Optimizing Predictions through TF-IDF Vectorization</h3>
                <p class="research-pub">IEEE International Conference on Intelligent Data Communication Technologies and Internet of Things (IDCIoT)</p>
                <p class="research-desc">This research explores natural language processing techniques for sentiment classification of movie reviews using TF-IDF vectorization and machine learning models to improve prediction accuracy.</p>
              </a>
              
              <a href="https://www.e3s-conferences.org/articles/e3sconf/abs/2025/19/e3sconf_icsget2025_03011/e3sconf_icsget2025_03011.html" target="_blank" rel="noopener noreferrer" class="research-card">
                <h3 class="research-title">Bone Fracture Detection through Advanced Neural Network Architectures</h3>
                <p class="research-pub">E3S Web of Conferences</p>
                <p class="research-desc">This research applies deep learning techniques to detect bone fractures in medical imaging data, helping automate fracture identification and improve diagnostic accuracy.</p>
              </a>
            </div>
          </div>

          <!-- Startup Section -->
          <div class="custom-section" id="startup">
            <h2 class="section-label" style="display:block; text-align:center;">Startup</h2>
            <div class="startup-card">
              <img src="assets/soopervision.jpg" alt="SooperVision Logo" class="startup-logo">
              <h3 class="startup-title">SooperVision</h3>
              <p class="startup-role">Co-Founder • Educational AI/ML Platform</p>
              <div class="startup-desc">
                <p style="margin-bottom: 1.25rem;">SooperVision is an AI education initiative focused on simplifying Artificial Intelligence and Machine Learning concepts through practical explanations, structured learning resources, and real-world applications.</p>
                <p>As a Co-Founder, I contribute to building intuitive learning material that helps students understand AI systems through clear and accessible explanations.</p>
              </div>
              
              <ul class="startup-highlights">
                <li>Simplified AI & Machine Learning learning resources</li>
                <li>Clear explanations focused on fundamentals</li>
                <li>Real-world AI concepts made accessible</li>
                <li>Community-driven learning platform</li>
              </ul>
              
              <div class="startup-actions">
                <a href="https://www.soopervision.tech/" target="_blank" rel="noopener noreferrer" class="startup-btn startup-btn-primary">Visit Website</a>
                <a href="https://www.linkedin.com/company/soopervision-tech/posts/?feedView=all" target="_blank" rel="noopener noreferrer" class="startup-btn startup-btn-secondary">LinkedIn</a>
              </div>
            </div>
          </div>
        `;

        // Append right after the #work section
        workSection.parentNode.insertBefore(customWrapper, workSection.nextSibling);
      }
    }

    // ── 9. Navbar modifications ──────────────────────────────────────────────────
    const allNavLinks = Array.from(document.querySelectorAll('nav a, header a, .nav a, .navbar a'));
    const photoLink = allNavLinks.find(a => {
      const href = a.getAttribute('href') || '';
      return href.toLowerCase().includes('photography');
    });
    const startupLink = allNavLinks.find(a => {
      const href = a.getAttribute('href') || '';
      return href.toLowerCase().includes('startup');
    });

    if (photoLink && startupLink && photoLink !== startupLink) {
      const pParent = photoLink.parentElement;
      const sParent = startupLink.parentElement;

      // If they are in the exact same container directly or wrapped inside LI
      if (pParent && sParent && pParent.tagName === 'LI' && sParent.tagName === 'LI' && pParent.parentNode === sParent.parentNode) {
        if (pParent.previousSibling !== sParent) { // Avoid endless DOM shifts
          pParent.parentNode.insertBefore(sParent, pParent);
          applied++;
        }
      } else if (pParent && pParent === startupLink.parentElement) {
        if (photoLink.previousSibling !== startupLink) {
          pParent.insertBefore(startupLink, photoLink);
          applied++;
        }
      }
    }

    // ── 10. Update Photography Section ───────────────────────────────────────────
    const photoSection = document.getElementById('photography');
    if (photoSection) {
      const grid = photoSection.querySelector('.captures-grid');
      // The gallery may mount slightly after the section itself
      if (grid && grid.children.length > 0 && !photoSection.dataset.photoPatched) {
        const newPhotos = [
          'assets/photo1.jpg',
          'assets/photo2.jpg',
          'assets/photo3.jpg',
          'assets/photo4.jpg',
          'assets/photo5.jpg',
          'assets/photo6.jpg'
        ];

        // 10b. Iterate across children and assign only the first 6 nodes, hiding the rest
        const children = Array.from(grid.children);

        let validImageCount = 0;
        children.forEach((child, index) => {
          if (index < newPhotos.length) {
            // Because React injects framer-motion / div wrappers around the <img>
            const img = (child.tagName === 'IMG') ? child : child.querySelector('img');

            // Apply card container fixes
            child.style.backgroundColor = '#000';
            child.style.border = 'none';
            child.style.boxShadow = 'none';
            child.style.overflow = 'hidden';
            child.style.padding = '0';
            child.style.aspectRatio = '3 / 4';

            // If image is ready in the DOM
            if (img) {
              img.src = newPhotos[index];
              img.style.objectFit = 'cover';
              img.style.display = 'block';
              img.style.width = '100%';
              img.style.height = '100%';

              child.style.display = ''; // Ensure visible
              validImageCount++;
            }
          } else {
            // Effectively remove all remaining 12 photos
            child.style.display = 'none';
          }
        });

        // Set patch state ONLY when all 6 children successfully detected imgs
        if (validImageCount === newPhotos.length || children.length === validImageCount) {
          photoSection.dataset.photoPatched = 'true';
          applied++;
        }
      }
    }

    // ── 11. Update Contact Section ───────────────────────────────────────────────
    const contactSection = document.getElementById('contact');
    if (contactSection && !contactSection.dataset.contactPatched) {

      // 11a. Update Location text & Remove AQI / • indicators
      const allTextNodes = [];
      const walkNodes = (n) => {
        if (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '') {
          allTextNodes.push(n);
        } else {
          n.childNodes.forEach(walkNodes);
        }
      };
      walkNodes(contactSection);

      allTextNodes.forEach(node => {
        let txt = node.textContent;

        // Replace contact heading
        if (txt.includes('Ready to start?')) {
          node.textContent = txt.replace('Ready to start?', "Let's Build Something Meaningful.");
          txt = node.textContent;
        }

        // Replace contact description
        if (txt.includes("Let's create something amazing together. Drop me a line and let's get the conversation started.")) {
          node.textContent = txt.replace(
            "Let's create something amazing together. Drop me a line and let's get the conversation started.",
            "If you're building something interesting in AI, ML, or technology, I'd love to hear about it. Feel free to reach out and let's explore ideas together."
          );
          txt = node.textContent;
        }

        // Replace any "City, India" or similar string entirely with "Hyderabad, India"
        if (txt.includes('India') && !txt.includes('Hyderabad')) {
          node.textContent = 'Hyderabad, India';
          txt = node.textContent; // Update reference
        }

        // Target AQI string variations and blank dot separators
        if (txt.includes('AQI') || txt.includes('•')) {
          let updated = txt.replace(/[\d\.]+\s*AQI/gi, '').trim();
          if (updated === '•' || updated.includes('• AQI')) {
            updated = '';
          } else {
            updated = updated.replace(/^[•\s]+|[•\s]+$/g, ''); // strip prefix/suffix dots
          }
          node.textContent = updated;
        }
      });

      // Cleanup stray empty wrapper elements previously containing AQI icons
      const spans = contactSection.querySelectorAll('span, div, p');
      spans.forEach(el => {
        if (el.textContent.includes('AQI')) {
          el.textContent = '';
        }
        if (el.textContent.trim() === '' && el.children.length > 0) {
          // If an inline flex element only has an SVG inside that paired with AQI:
          if (el.innerHTML.includes('<svg') || el.innerHTML.includes('<img')) {
            // We'll hide it to suppress orphaned AQI icon SVG markers, but leave others alone
            if (!el.classList.contains('social-icon') && !el.closest('a')) {
              el.style.display = 'none';
            }
          }
        }
      });

      // 11b. Update Email Href
      const emailLinks = contactSection.querySelectorAll('a[href^="mailto:"]');
      emailLinks.forEach(link => {
        link.href = 'mailto:mohdirfanwork786@gmail.com';
      });

      // 11c. Update Social Icons
      const socialAnchors = contactSection.querySelectorAll('a');
      socialAnchors.forEach(a => {
        const h = a.getAttribute('href') || '';
        const lowerH = h.toLowerCase();

        if (lowerH.includes('linkedin.com')) {
          a.href = 'https://www.linkedin.com/in/irfan786msfri/';
        } else if (lowerH.includes('github.com')) {
          a.href = 'https://github.com/mohdirfan-code';
        } else if (lowerH.includes('instagram.com')) {
          a.href = 'https://www.instagram.com/irfu_69_/';
        } else if (lowerH.includes('twitter.com') || lowerH.includes('x.com')) {
          a.style.display = 'none';
          if (a.parentElement && a.parentElement.tagName === 'LI') {
            a.parentElement.style.display = 'none';
          }
        }
      });

      contactSection.dataset.contactPatched = 'true';
      applied++;
    }

    // ── 12. Remove Footer Playground ─────────────────────────────────────────────
    const headings = Array.from(document.querySelectorAll('h3, span'));
    const playgroundHeading = headings.find(el => el.textContent && el.textContent.includes('Footer Playground'));

    if (playgroundHeading) {
      let wrapper = playgroundHeading.parentElement;
      // Walk up the DOM to find the main container (usually has 100vw width and borderTop properties)
      // Stop before body/html.
      for (let i = 0; i < 6; i++) {
        if (!wrapper) break;
        if (wrapper.style && (wrapper.style.width === '100vw' || wrapper.style.marginLeft === '50%')) {
          break;
        }
        wrapper = wrapper.parentElement;
      }

      // Additional safety: ensure it contains a canvas before hiding
      if (wrapper && wrapper.querySelector('canvas') && wrapper.style.display !== 'none') {

        // Salvage the "Designed and developed with love" message
        const allDivs = Array.from(wrapper.querySelectorAll('div'));
        const footerDiv = allDivs.find(d => d.textContent && d.textContent.includes('Designed and Developed with love'));

        wrapper.style.display = 'none';
        applied++;

        // Re-inject it under the Contact section safely
        const contactSection = document.getElementById('contact');
        if (contactSection && footerDiv && !document.getElementById('rescued-footer')) {
          const signature = document.createElement('div');
          signature.id = 'rescued-footer';
          signature.textContent = footerDiv.textContent;
          // Format it organically to sit properly below contact
          signature.style.cssText = 'text-align: center; font-size: 0.85rem; color: #999; padding-top: 4rem; padding-bottom: 2rem; width: 100%; letter-spacing: 0.5px;';
          contactSection.appendChild(signature);
        }
      }
    }

    console.log(`[portfolio-patch] ✅ Applied ${applied} patches`);
    return applied;
  }

  // ─── WAIT FOR REACT TO MOUNT ───────────────────────────────────────────────

  function waitForReact(callback, maxAttempts = 60) {
    let attempts = 0;
    const check = () => {
      attempts++;
      const root = document.getElementById('root');
      const heroMounted = root && root.children.length > 0 && document.querySelector('.hero-section, .hero-title, .nav');
      if (heroMounted) {
        // Extra delay to let React finish all renders
        setTimeout(callback, 150);
      } else if (attempts < maxAttempts) {
        setTimeout(check, 100);
      }
    };
    check();
  }

  // Run on initial mount
  waitForReact(applyPatches);

  // Re-run on route changes (React Router navigation)
  // Use MutationObserver to detect re-renders
  let debounceTimer;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle && heroTitle.innerHTML.includes('OG')) {
        applyPatches();
      }
      // Always make sure camera section stays hidden
      const cam = document.querySelector(CAMERA_SELECTOR);
      if (cam && cam.style.display !== 'none') {
        cam.style.display = 'none';
      }

      // Ensure work section gets patched if it dynamically loads
      const workSection = document.getElementById('work');
      if (workSection && !workSection.dataset.patched) {
        applyPatches();
      }

      // Ensure photography dynamically loads patched assets
      const photoSection = document.getElementById('photography');
      if (photoSection && !photoSection.dataset.photoPatched) {
        applyPatches();
      }

      // Ensure contact section gets patched if dynamically loads
      const contactSection = document.getElementById('contact');
      if (contactSection && !contactSection.dataset.contactPatched) {
        applyPatches();
      }

      // Ensure footer playground gets removed if dynamically loads
      const headings = Array.from(document.querySelectorAll('h3'));
      if (headings.some(el => el.textContent && el.textContent.includes('Footer Playground'))) {
        applyPatches();
      }
    }, 200);
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();
