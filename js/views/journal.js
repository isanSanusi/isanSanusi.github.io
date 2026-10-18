/* Halaman: journal */
const jf = { c: "all" };
V.journal = () => {
  const l = [...J]
    .sort(byNew)
    .filter((a) => jf.c === "all" || a.category === jf.c);
  return `<div class="wrap"><section><span class="eyebrow">Journal</span><h1 style="font-size:clamp(2rem,5vw,3.4rem)">Catatan &amp; eksperimen</h1><p>Semua artikel di bawah adalah <strong>contoh demonstrasi</strong>.</p>
<div class="chips" id="jc" role="group" aria-label="Filter kategori">${["all", ...Object.keys(CATS)].map((k) => `<button class="chip" data-k="${k}" ${k !== "all" ? `data-cat="${k}"` : ""} aria-pressed="${jf.c === k}">${k === "all" ? "All" : CATS[k].n}</button>`).join("")}</div>
<div class="grid">${l.map((a) => `<a class="card" data-cat="${a.category}" href="#/journal/${a.slug}"><div class="cb">${tag(a.category)}<span class="demo">Contoh</span><h3>${a.title}</h3><p>${a.excerpt}</p><p style="margin-top:12px;font-size:.8rem"><time datetime="${a.publishedAt}">${fmt(a.publishedAt)}</time></p></div></a>`).join("")}</div></section></div>`;
};
V.journal.init = () => {
  $("#jc").onclick = (e) => {
    const b = e.target.closest("button");
    if (b) {
      jf.c = b.dataset.k;
      route();
    }
  };
};
V.article = (q, slug) => {
  const a = J.find((x) => x.slug === slug);
  if (!a) return V.nf();
  const rel = J.filter((x) => x.id !== a.id);
  return `<div class="wrap" data-cat="${a.category}"><section><nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a> / <a href="#/journal">Journal</a> / ${a.title}</nav>${tag(a.category)}<span class="demo">Artikel contoh</span><h1 style="font-size:clamp(2rem,5vw,3.2rem);max-width:20ch">${a.title}</h1><p><time datetime="${a.publishedAt}">${fmt(a.publishedAt)}</time></p><div class="prose" style="font-size:1.1rem;line-height:1.8">${a.content.map((p) => `<p>${p}</p>`).join("")}</div>
<h2 style="margin-top:56px">Artikel terkait</h2><div class="grid">${rel.map((r) => `<a class="card" data-cat="${r.category}" href="#/journal/${r.slug}"><div class="cb">${tag(r.category)}<h3>${r.title}</h3><p>${r.excerpt}</p></div></a>`).join("")}</div></section></div>`;
};
