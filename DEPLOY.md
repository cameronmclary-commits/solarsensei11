# Deploy Solar Sensei

## Option 1: GitHub Pages (Free, Recommended)

### Quick Setup (5 minutes)

1. **Create a GitHub repo**
   ```bash
   # In the solar-sensei folder:
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   - Go to github.com → New repository → Name it `solar-sensei` → Public
   - Copy the remote URL, then:
   ```bash
   git remote add origin https://github.com/YOURUSERNAME/solar-sensei.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable Pages**
   - Repo Settings → Pages (left sidebar)
   - Source: "Deploy from a branch"
   - Branch: `main` / `/ (root)`
   - Save

4. **Done!** Your site will be live at:
   `https://YOURUSERNAME.github.io/solar-sensei/`

   (Takes 1-2 minutes first deploy)

### Auto-deploy on push (optional)
The site auto-updates when you push to `main`. No workflow file needed for root deployment.

---

## Option 2: Netlify (Drag & Drop)

1. Go to app.netlify.com/drop
2. Drag the `solar-sensei` folder onto the page
3. Get a live URL instantly (e.g., `https://random-name.netlify.app`)

---

## Option 3: Vercel (CLI)

```bash
npm i -g vercel
cd solar-sensei
vercel --prod
```

---

## Option 4: Local Preview (No Install)

### Windows (PowerShell) — **Easiest**
```powershell
# Right-click preview.ps1 → "Run with PowerShell"
# Or from terminal:
.\preview.ps1
```

### Windows (Batch file)
```cmd
# Double-click preview.bat
```

### Mac/Linux
```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open: **http://localhost:8000**

---

## Important: ES Modules Need a Server

The site uses `<script type="module">` which **won't work** with `file://` (double-clicking index.html). You **must** use one of the server options above.

---

## Custom Domain (GitHub Pages)

1. Add `CNAME` file to repo root:
   ```
   solarsensei.com
   ```
2. DNS: Add CNAME record → `YOURUSERNAME.github.io`
3. Repo Settings → Pages → Custom domain → Enter domain → Enforce HTTPS

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page / JS errors | You're using `file://` — use a server above |
| Styles not loading | Check `src/css/main.css` path in index.html |
| Chart not showing | Chart.js loads from CDN — needs internet |
| 404 on refresh | GitHub Pages doesn't support SPA routing — not an issue for this static site |