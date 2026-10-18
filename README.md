# Personal Portfolio Hub (prototype)

HTML5 + CSS3 + Vanilla JS. Tanpa framework, tanpa build step.

## Menjalankan
Klik dua kali `index.html` (routing memakai hash, jadi jalan tanpa server).
Opsional: `python -m http.server 8000` lalu buka http://localhost:8000

## Struktur
- index.html — kerangka (navbar, <main id="app">, footer) + urutan script
- css/ tokens (warna, radius) · base · layout (nav/footer) · components · pages · responsive
- js/data/ site.js (identitas, kategori) · projects.js · articles.js
- js/utils.js — helper, cover SVG, kartu proyek, registry `V`
- js/views/ satu file per halaman (home, portfolio, project, about, journal, contact, notfound)
- js/router.js — router hash (#/, #/portfolio?cat=web, #/project/slug, #/journal/slug)
- js/main.js — menu mobile & render awal

Urutan tag <script> di index.html penting (data → utils → views → router → main).
