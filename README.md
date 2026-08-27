# Mohammed Saif Ali — Portfolio V3

Production-ready React + Vite portfolio for Mohammed Saif Ali, AWS & DevOps Mentor and AI/ML graduate.

## Stack
- React 19
- Vite 7
- Plain CSS (no UI framework)
- Netlify-ready configuration

## Run locally

Requirements: Node.js 20.19+ (Node 22 recommended).

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Netlify

The repository root must contain `index.html`, `package.json`, `netlify.toml`, `src/`, and `public/`.

Netlify settings are already configured in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node: 22

If Netlify shows `Failed to resolve /src/main.jsx`, the repository has been uploaded with the wrong folder nesting. Make sure `src/main.jsx` is directly under the repository's `src/` directory.

## Included assets
- `public/saif-photo.jpg` — portfolio photo supplied for this project
- `public/Mohammed-Saif-Ali-Resume.pdf` — resume supplied for this project
- `public/favicon.svg`
- `public/robots.txt`
- `public/sitemap.xml`

## Links configured
- GitHub: https://github.com/Aisaaif
- LinkedIn: https://www.linkedin.com/in/mohammedsaifali18
- Email: reachsaif18@gmail.com

## Content note
Project, certification and internship details are based on the supplied resume; current Full Stack Academy mentoring details use the information supplied for V3.
