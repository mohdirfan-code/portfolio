# My Portfolio Website

A personal portfolio website cloned from [gowthamoleti.com](https://www.gowthamoleti.com) — a stunning React + Vite portfolio with beautiful animations, dark mode, and case studies.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool (pre-built) |
| React Router | Page navigation |
| Framer Motion | Animations |
| react-helmet-async | Page title/meta tags |
| Google Fonts | Typography |
| Fontshare (Satoshi) | Typography |
| html2canvas | Screenshot/canvas export |
| LiquidGL | Fluid background effects |

---

## 📁 Project Structure

```
portfolio-site/
├── index.html          ← Main entry point (fixed paths)
├── vite.svg            ← Favicon
├── vercel.json         ← Vercel deployment config (SPA routing)
├── _redirects          ← Netlify deployment config (SPA routing)
├── notchshelf-logo.webp
└── assets/
    ├── index-f92d7118.js       ← Pre-built React app (515KB)
    ├── index-b23cb8d8.css      ← Pre-built CSS (64KB)
    ├── district-icon-fad26ad7.png
    └── html2canvas.min.js      ← Local copy of html2canvas
```

---

## 🚀 Running Locally

You do **NOT** need Node.js or npm. This is a pre-built static site.

### Option 1: VS Code Live Server (Recommended for Beginners)

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (search in VS Code Extensions: `ritwickdey.LiveServer`)
3. Open the `portfolio-site/` folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. Your browser opens automatically at `http://127.0.0.1:5500`

### Option 2: Using `npx serve` (Requires Node.js)

```bash
# Install Node.js from https://nodejs.org first, then:
npx serve .
```

Open `http://localhost:3000` in your browser.

### Option 3: Python (if you have Python installed)

```bash
python -m http.server 8080
```

Open `http://localhost:8080` in your browser.

> ⚠️ **Important**: Do NOT open `index.html` by double-clicking it in File Explorer. The React app uses JavaScript modules which require an HTTP server to work. Always use one of the methods above.

---

## 🌍 Deploying to the Internet (Free)

### Deploy to Netlify (Easiest — Drag & Drop)

1. Go to [netlify.com](https://netlify.com) and create a free account
2. Log in and click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the entire `portfolio-site/` folder onto the page
4. Wait ~30 seconds for deployment
5. Netlify gives you a free URL like `https://your-name.netlify.app` 🎉

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and create a free account
2. Click **"Add New"** → **"Project"**
3. Push this folder to a GitHub repository first:
   ```bash
   git init
   git add .
   git commit -m "Portfolio website"
   gh repo create my-portfolio --public --push  # If you have GitHub CLI
   ```
4. Connect your GitHub repo in Vercel
5. Set **Framework Preset** to **"Other"**
6. Leave Build Command empty, set Output Directory to `.`
7. Deploy! You'll get a free URL like `https://my-portfolio.vercel.app` 🎉

---

## ✏️ Customizing Content

> **Note**: This project uses a pre-built (minified) bundle, so editing individual components is not straightforward. The best way to fully customize this is to build the project from source. The original portfolio is open-source at:
> 👉 **[github.com/gowthamoleti/portfolio](https://github.com/gowthamoleti/portfolio)** ← Check if source exists here

If source code is found:
1. Clone the original repo
2. Install dependencies: `npm install`
3. Replace content with your own details
4. Run locally: `npm run dev`
5. Build for production: `npm run build`
6. Deploy the `dist/` folder

---

## 📞 Original Design Credit

Original design and code by **Gowtham Oleti** — `gowthamoleti.com`

---

## 📄 License

This project is for **personal portfolio use only**. Please respect the original creator's work.
