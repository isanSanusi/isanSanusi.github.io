/* Helper bersama: selector, format tanggal, cover SVG, kartu proyek */
const V = {}; // registry view: V.nama = (query, slug) => html
const $ = (s, r = document) => r.querySelector(s);
const fmt = (d) =>
  new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const tag = (c) =>
  `<span class="tag"><i aria-hidden="true">${CATS[c].ic}</i>${CATS[c].n}</span>`;
function cover(c, k = 0) {
  const o = k % 3;
  if (c === "web")
    return `<svg viewBox="0 0 320 200" role="img" aria-label="Ilustrasi placeholder jendela browser"><rect x="30" y="24" width="260" height="152" rx="10" fill="none" stroke="currentColor" stroke-opacity=".5"/><path d="M30 50h260" stroke="currentColor" stroke-opacity=".5"/><circle cx="46" cy="37" r="3" fill="currentColor"/><circle cx="58" cy="37" r="3" fill="currentColor" opacity=".5"/><rect x="48" y="68" width="${110 + o * 20}" height="14" rx="4" fill="currentColor"/><rect x="48" y="92" width="150" height="8" rx="4" fill="currentColor" opacity=".35"/><rect x="48" y="108" width="120" height="8" rx="4" fill="currentColor" opacity=".35"/><rect x="214" y="68" width="60" height="90" rx="6" fill="currentColor" opacity=".18"/></svg>`;
  if (c === "design")
    return `<svg viewBox="0 0 320 200" role="img" aria-label="Ilustrasi placeholder bentuk geometris"><circle cx="${120 + o * 20}" cy="100" r="62" fill="currentColor" opacity=".85"/><circle cx="190" cy="100" r="62" fill="none" stroke="currentColor" stroke-width="2"/><rect x="220" y="40" width="50" height="50" rx="8" fill="currentColor" opacity=".3" transform="rotate(${12 + o * 10} 245 65)"/></svg>`;
  let r = "";
  for (let i = 0; i < 5; i++)
    r += `<path d="M40 ${60 + i * 24}h240" stroke="currentColor" stroke-opacity=".3"/>`;
  return `<svg viewBox="0 0 320 200" role="img" aria-label="Ilustrasi placeholder tabel dan grafik"><rect x="40" y="36" width="240" height="24" fill="currentColor" opacity=".25"/>${r}<path d="M110 36v144M180 36v144" stroke="currentColor" stroke-opacity=".3"/><rect x="52" y="${150 - o * 6}" width="14" height="${26 + o * 6}" fill="currentColor"/><rect x="122" y="${120}" width="14" height="56" fill="currentColor" opacity=".6"/><rect x="192" y="${100 + o * 8}" width="14" height="${76 - o * 8}" fill="currentColor"/></svg>`;
}
const card = (p) =>
  `
<a class="card" data-cat="${p.category}" href="#/project/${p.slug}">
  <div class="cv">${cover(p.category, p.id)}</div>
  <div class="cb">${tag(p.category)}
    <span class="status">Published</span>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.description)}</p>
  </div>
</a>`;
const byNew = (a, b) => b.publishedAt.localeCompare(a.publishedAt);
