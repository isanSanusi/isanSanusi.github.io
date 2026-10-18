/* Halaman: project */
V.project = (q, slug) => {
  const p = P.find((x) => x.slug === slug);
  if (!p) return V.nf();
  const c = p.content,
    rel = P.filter((x) => x.category === p.category && x.id !== p.id).slice(
      0,
      3,
    );
  const L = [
    ["demo", "Lihat demo"],
    ["repo", "Repository"],
    ["file", "Unduh file contoh"],
  ]
    .filter(([k]) => p.links[k])
    .map(
      ([k, t]) =>
        `<span class="note" style="padding:8px 14px">${t} (placeholder)</span>`,
    )
    .join("");
  return `<div class="wrap" data-cat="${p.category}"><section style="padding-bottom:32px"><nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a> / <a href="#/portfolio">Portfolio</a> / <a href="#/portfolio?cat=${p.category}">${CATS[p.category].n}</a> / ${esc(p.title)}</nav>
${tag(p.category)}<span class="demo">Data demonstrasi</span><h1 style="font-size:clamp(2rem,5vw,3.4rem)">${esc(p.title)}</h1><p style="font-size:1.1rem;max-width:60ch">${esc(p.description)}</p>
<div class="pd"><div><div class="cv">${cover(p.category, p.id)}</div>
<div class="prose"><h2>Latar belakang &amp; tujuan</h2><p>${c.goal}</p><h2>Masalah</h2><p>${c.problem}</p><h2>Proses &amp; keputusan</h2><ol>${c.process.map((x) => `<li>${x}</li>`).join("")}</ol>
<div class="xtra"><h3>${c.xl}</h3><ul>${c.x.map((x) => `<li>${x}</li>`).join("")}</ul></div><h2>Hasil akhir</h2><p>${c.result}</p></div></div>
<aside class="side"><h3>Tipe</h3><div>${p.type}</div><h3>Tools</h3><div>${p.tools.map((t) => `<span class="pill">${t}</span>`).join("")}</div><h3>Tag</h3><div>${p.tags.map((t) => `<span class="pill">#${t}</span>`).join("")}</div><h3>Tautan</h3><div class="row">${L}</div><h3>Dipublikasikan</h3><div>${fmt(p.publishedAt)}</div></aside></div></section>
<section style="padding-top:24px"><h2>Proyek terkait</h2><div class="grid">${rel.map(card).join("") || "<p>Belum ada proyek terkait.</p>"}</div><p style="margin-top:32px"><a class="btn" href="#/portfolio?cat=${p.category}">← Kembali ke katalog</a></p></section></div>`;
};
