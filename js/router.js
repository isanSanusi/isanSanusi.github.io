/* Router hash sederhana */
function route(focus) {
  const h = location.hash.replace(/^#\/?/, ""),
    [path, qs] = h.split("?"),
    seg = path.split("/"),
    q = Object.fromEntries(new URLSearchParams(qs || ""));
  const name = seg[0] || "home";
  const map = {
    home: V.home,
    portfolio: V.portfolio,
    project: V.project,
    about: V.about,
    journal: seg[1] ? V.article : V.journal,
    contact: V.contact,
  };
  const fn = map[name] || V.nf;
  $("#app").innerHTML = fn(q, seg[1]);
  const init =
    name === "portfolio"
      ? V.portfolio.init
      : name === "journal" && !seg[1]
        ? V.journal.init
        : name === "contact"
          ? V.contact.init
          : null;
  init && init();
  const nav = name === "project" ? "portfolio" : name;
  document
    .querySelectorAll(".menu a")
    .forEach((a) =>
      a.dataset.r === nav
        ? a.setAttribute("aria-current", "page")
        : a.removeAttribute("aria-current"),
    );
  $("#mn").classList.remove("open");
  $("#bg").setAttribute("aria-expanded", "false");
  if (focus !== false) {
    window.scrollTo(0, 0);
    $("#app").focus({ preventScroll: true });
  }
}
