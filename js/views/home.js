/* Halaman: home */
V.home = () => {
  const f = P.filter((p) => p.featured).slice(0, 4),
    rc = [...P].sort(byNew).slice(0, 4);

  return `
  <div class="wrap">
    <div class="hero">
      <div>
        <span class="eyebrow">Personal Portfolio Hub · Journal</span>
        <h1>${SITE.headline}</h1>
        <p style="font-size:1.1rem;max-width:48ch">${SITE.intro}</p>
        <div class="row">
          <a class="btn pri" href="#/portfolio">Lihat Portfolio →</a>
          <a class="btn" href="#/about">Tentang saya</a>
        </div>
      </div>

      <div class="stack">${Object.entries(CATS)
        .map(
          ([k, c]) =>
            `
        <a class="tile" data-cat="${k}" href="#/portfolio?cat=${k}">
          <span class="ic" aria-hidden="true">${c.ic}</span>
          <span><strong>${c.n}</strong><small>${P.filter((p) => p.category === k).length} proyek</small></span>
        </a>`,
        )
        .join("")}
      </div>
    </div>
  </div>
  
  <section>
    <div class="wrap">
      <span class="eyebrow">Specialties</span><h2>Tiga bidang, satu ruang.</h2>
      <div class="spec">${Object.entries(CATS)
        .map(
          ([k, c]) =>
            `
          <a class="scard" data-cat="${k}" href="#/portfolio?cat=${k}">
            <span class="ic" aria-hidden="true">${c.ic}</span>
            <h3>${c.n}</h3>
            <p>${c.d}</p>
            <span class="go">Lihat karya ${c.n} →</span>
          </a>`,
        )
        .join("")}
      </div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="wrap">
      <span class="eyebrow">Featured Projects</span>
      <h2>Proyek unggulan</h2>
      <div class="feat">${f.map(card).join("")}</div>
    </div>
  </section>

  <section style="padding-top:0">
  <div class="wrap">
      <span class="eyebrow">What I Do</span>
      <h2>Yang bisa saya kerjakan</h2>
      <div class="wid">${Object.entries(CATS)
        .map(
          ([k, c]) =>
            `
        <div data-cat="${k}">
          <h3>${c.n}</h3>
          <ul>${c.w.map((x) => `<li>${x}</li>`).join("")}</ul>
        </div>`,
        )
        .join("")}
      </div>
    </div>
  </section>

  <section class="recent">
    <div class="wrap">
      <span class="eyebrow">Recently Added</span>
      <h2>Baru ditambahkan</h2>
      <div class="rl">${rc
        .map(
          (p) => `<a href="#/project/${p.slug}" data-cat="${p.category}">
        <time datetime="${p.publishedAt}">${fmt(p.publishedAt)}</time>
        <h3>${esc(p.title)}</h3>
        <span style="color:var(--a)">${CATS[p.category].n} →</span>
        </a>`,
        )
        .join("")}
      </div>
    </div>
  </section>

  <section>
    <div class="wrap two">
      <div>
        <span class="eyebrow">About</span>
        <h2>Sedikit tentang saya</h2>
      </div>
      <div>
        <p>${SITE.name} — placeholder perkenalan singkat. Ceritakan latar belakang, cara bekerja, dan apa yang sedang Anda pelajari.</p>
        <a class="btn" href="#/about">Baca selengkapnya →</a>
      </div>
    </div>
  </section>
      
  <section style="padding-top:0">
    <div class="wrap">
      <div class="cta">
        <h2>Punya ide? Mari diskusikan.</h2>
        <p>Terbuka untuk proyek dan kolaborasi.</p>
        <a class="btn pri" href="#/contact">Hubungi saya</a>
      </div>
    </div>
  </section>`;
};
