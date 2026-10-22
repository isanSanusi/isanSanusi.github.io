/* Halaman: portfolio */
const S = { cat: "all", type: "all", sort: "new", q: "" };
V.portfolio = (q) => {
  if (q.cat && (q.cat === "all" || CATS[q.cat])) S.cat = q.cat;
  const types = [...new Set(P.map((p) => p.type))].sort();
  return `
  <div class="wrap">
    <section style="padding-bottom:24px">
      <span class="eyebrow">Portfolio</span>
      <h1 style="font-size:clamp(2rem,5vw,3.4rem)">Semua proyek</h1>
      <div class="chips" id="ch" role="group" aria-label="Filter niche">${[
        "all",
        ...Object.keys(CATS),
      ]
        .map(
          (k) => `
        <button class="chip" data-k="${k}" ${k !== "all" ? `data-cat="${k}"` : ""} aria-pressed="${S.cat === k}">${k === "all" ? "All" : CATS[k].n}</button>`,
        )
        .join("")}
      </div>
      <div class="bar">
        <div>
          <label for="q" class="eyebrow" style="margin:0 0 6px">Cari judul atau tag</label>
          <input id="q" type="search" value="${esc(S.q)}" placeholder="mis. dashboard, logo, css">
        </div>
        <div>
          <label for="ty" class="eyebrow" style="margin:0 0 6px">Tipe</label>
          <select id="ty">
            <option value="all">Semua tipe</option>${types.map((t) => `<option ${S.type === t ? "selected" : ""}>${t}</option>`).join("")}
          </select>
        </div>
        <div>
          <label for="so" class="eyebrow" style="margin:0 0 6px">Urutkan</label>
          <select id="so">
            <option value="new" ${S.sort === "new" ? "selected" : ""}>Terbaru</option>
            <option value="feat" ${S.sort === "feat" ? "selected" : ""}>Unggulan</option>
          </select>
        </div>
      </div>
      <div class="row" style="margin-bottom:20px">
        <span id="cnt" role="status" style="color:var(--mu)"></span>
        <button class="btn" id="rs" hidden>Reset filter</button>
      </div>
      <div class="grid" id="gr"></div>
    </section>
  </div>`;
};
function grid() {
  let r = P.filter(
    (p) =>
      (S.cat === "all" || p.category === S.cat) &&
      (S.type === "all" || p.type === S.type) &&
      (!S.q ||
        (p.title + " " + p.tags.join(" "))
          .toLowerCase()
          .includes(S.q.toLowerCase())),
  );
  r.sort(
    S.sort === "feat"
      ? (a, b) => b.featured - a.featured || byNew(a, b)
      : byNew,
  );
  $("#gr").innerHTML = r.length
    ? r.map(card).join("")
    : `
    <div class="empty" style="grid-column:1/-1">
      <h3>Tidak ada proyek yang cocok</h3>
      <p>Coba kata kunci lain atau hapus filter.</p>
    </div>`;
  $("#cnt").textContent = `${r.length} proyek ditemukan`;
  $("#rs").hidden =
    S.cat === "all" && S.type === "all" && !S.q && S.sort === "new";
  document
    .querySelectorAll("#ch .chip")
    .forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === S.cat));
}
V.portfolio.init = () => {
  grid();
  $("#ch").onclick = (e) => {
    const b = e.target.closest("button");
    if (b) {
      S.cat = b.dataset.k;
      grid();
    }
  };
  $("#q").oninput = (e) => {
    S.q = e.target.value;
    grid();
  };
  $("#ty").onchange = (e) => {
    S.type = e.target.value;
    grid();
  };
  $("#so").onchange = (e) => {
    S.sort = e.target.value;
    grid();
  };
  $("#rs").onclick = () => {
    Object.assign(S, { cat: "all", type: "all", sort: "new", q: "" });
    route();
  };
};
