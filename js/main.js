import { profile, experience, education, skills } from "./data/profile.js";
import { projects } from "./data/projects.js";
import { journal } from "./data/journal.js";
import {
  projectCard,
  projectThumbnail,
  escapeHTML,
} from "./components/project-card.js";
import { renderProjectDetail } from "./components/project-modal.js";
import { initNavbar, updateActiveNavigation } from "./components/navbar.js";
import { initTheme } from "./modules/theme.js";

const app = document.querySelector("#app");
const projectDialog = document.querySelector("#project-dialog");
const articleDialog = document.querySelector("#article-dialog");
let portfolioState = { category: "all", query: "", sort: "newest" };

function hydrateProfile() {
  document.querySelectorAll("[data-profile]").forEach((node) => {
    const key = node.dataset.profile;
    if (profile[key]) node.textContent = profile[key];
  });
  document.querySelectorAll("[data-profile-link]").forEach((node) => {
    const key = node.dataset.profileLink;
    if (profile[key]) node.href = profile[key];
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
  document.title = `${profile.logo} — Portfolio`;
}

function renderHome() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  return `<section class="hero"><div><span class="availability">Available for selected projects</span><p class="eyebrow" style="margin-top:26px">Web · Design · Data automation</p><h1>Building useful things, <span class="headline-soft">with a little more intention.</span></h1><p class="hero-copy">I'm ${escapeHTML(profile.name)}, a multidisciplinary builder working across web interfaces, visual identity, and practical automation for everyday business problems.</p><div class="hero-actions"><a class="button button-primary" href="#/portfolio">Explore my work <span>↗</span></a><a class="button" href="#/contact">Start a conversation</a></div><div class="hero-meta"><span>⌁ Based in West Bandung</span><span>↗ Independent / hands-on</span></div></div><div class="hero-visual"><div class="orbit-card"><div class="orbit-top"><span>PERSONAL PORTFOLIO</span><span>V.02</span></div><div class="orbit-symbol">s.</div><div class="orbit-bottom"><div><strong>${escapeHTML(profile.alias)}</strong><small>DESIGN × DEVELOPMENT × SYSTEMS</small></div><span class="mono accent">✳ 2026</span></div></div><div class="floating-label"><strong>3 disciplines</strong><span>One practical mindset</span></div></div></section>
  <div class="service-strip">
    <div class="service-item"><strong>01 / Web Development</strong><span>Interfaces & useful tools</span></div>
    <div class="service-item"><strong>02 / Visual Design</strong><span>Identity, vector, mockups</span></div>
    <div class="service-item"><strong>03 / Excel & Data</strong><span>Automation and dashboards</span></div>
  </div>
  <section class="section home-projects"><div class="section-head"><div><p class="eyebrow">Selected work</p><h2>Small details.<br>Useful outcomes.</h2></div><a class="text-link" href="#/portfolio">View all projects ↗</a></div><div class="project-grid">${featured.map(projectCard).join("")}</div></section>
  <div class="marquee-line"><span>WEB DEVELOPMENT <b>✳</b></span><span>VISUAL DESIGN <b>✳</b></span><span>DATA AUTOMATION <b>✳</b></span><span>BUILT WITH INTENTION <b>✳</b></span></div>
  <section class="section"><div class="section-head"><div><p class="eyebrow">A little about me</p><h2>Practical by nature.<br>Curious by default.</h2></div><p>Experience across operations, design, and development shapes how I approach products: start with the real workflow, make the important state visible, and keep the solution maintainable.</p></div><div class="stat-row"><div class="stat"><strong>3</strong><span>CORE DISCIPLINES</span></div><div class="stat"><strong>4</strong><span>JOURNAL NOTES</span></div><div class="stat"><strong>01</strong><span>FOCUS: USEFUL WORK</span></div></div><div style="margin-top:25px"><a class="button" href="#/about">More about my background ↗</a></div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">From the journal</p><h2>Notes from the work.</h2></div><a class="text-link" href="#/journal">Read the journal ↗</a></div><div class="journal-grid">${journal.slice(0, 2).map(journalCard).join("")}</div></section>
  <section class="section"><div class="section-head"><div><p class="eyebrow">Have a project in mind?</p><h2>Let's make it<br>work better.</h2></div><div><p>Tell me what you're trying to build, fix, or make clearer.</p><a class="button button-primary" href="#/contact">Get in touch ↗</a></div></div></section>`;
}

function journalCard(article) {
  return `<article class="journal-card" role="button" tabindex="0" data-article="${escapeHTML(article.slug)}"><div class="journal-meta"><span>${escapeHTML(article.date)}</span><span>·</span><span>${escapeHTML(article.read)}</span><span class="pill">${escapeHTML(article.category)}</span></div><h3>${escapeHTML(article.title)}</h3><p>${escapeHTML(article.excerpt)}</p><div class="journal-bottom"><span class="text-link">Read article ↗</span><span class="project-year">${escapeHTML(article.read)} READ</span></div></article>`;
}

function renderPortfolio() {
  const filters = [
    ["all", "All work"],
    ["web", "Web"],
    ["design", "Design"],
    ["excel", "Excel / Data"],
  ];
  return `<section class="page-intro"><p class="eyebrow">Portfolio / selected work</p><h1>Work that solves<br><span class="muted">real problems.</span></h1><p>A collection of web builds, visual design, and automation projects. Open a project to see the problem, process, and outcome.</p></section><div class="portfolio-toolbar"><div class="filter-list" role="group" aria-label="Filter projects by category">${filters.map(([key, label]) => `<button class="filter-button" data-filter="${key}" aria-pressed="${portfolioState.category === key}">${label}</button>`).join("")}</div><div class="toolbar-controls"><label class="sr-only" for="project-search">Search projects</label><input id="project-search" class="field" type="search" placeholder="Search projects…" value="${escapeHTML(portfolioState.query)}"><label class="sr-only" for="project-sort">Sort projects</label><select id="project-sort" class="field"><option value="newest" ${portfolioState.sort === "newest" ? "selected" : ""}>Newest first</option><option value="oldest" ${portfolioState.sort === "oldest" ? "selected" : ""}>Oldest first</option><option value="az" ${portfolioState.sort === "az" ? "selected" : ""}>A–Z</option></select></div></div><div id="project-results" class="project-grid">${renderProjectResults()}</div>`;
}

function getFilteredProjects() {
  const query = portfolioState.query.trim().toLowerCase();
  const result = projects.filter((project) => {
    const categoryMatch =
      portfolioState.category === "all" ||
      project.category === portfolioState.category;
    const haystack = [
      project.title,
      project.description,
      project.category,
      ...project.tags,
      ...project.tools,
    ]
      .join(" ")
      .toLowerCase();
    return categoryMatch && (!query || haystack.includes(query));
  });
  if (portfolioState.sort === "oldest") result.sort((a, b) => a.year - b.year);
  else if (portfolioState.sort === "az")
    result.sort((a, b) => a.title.localeCompare(b.title));
  else result.sort((a, b) => b.year - a.year);
  return result;
}
function renderProjectResults() {
  const list = getFilteredProjects();
  return list.length
    ? list.map(projectCard).join("")
    : '<div class="empty-state" style="grid-column:1/-1">No projects match your search. Try another term or category.</div>';
}

function renderJournal() {
  return `<section class="page-intro"><p class="eyebrow">Journal / field notes</p><h1>Thinking out<br><span class="muted">loud, occasionally.</span></h1><p>Notes about design systems, automation, and lessons learned from building around real workflows.</p></section><section class="section" style="padding-top:24px"><div class="journal-grid">${journal.map(journalCard).join("")}</div></section>`;
}

function renderAbout() {
  return `<section class="section"><div class="about-layout"><aside class="about-aside"><p class="eyebrow">About me</p><h2>Sandi Hadiansyah <span class="muted">— builder from Cililin.</span></h2><p>I work across web development, visual design, and data automation. My perspective comes from a mix of field operations, small-business workflows, and hands-on making.</p><a class="button" href="#/contact">Get in touch ↗</a></aside><div class="content-stack"><section class="content-block"><h3>How I think about the work</h3><p>I like practical solutions that make the next step obvious. Good interfaces reduce friction; good design creates consistency; good automation gives people time back. I try to bring all three into the same project when it makes sense.</p></section><section class="content-block"><h3>Work experience</h3>${experience.map((item) => `<div class="timeline-item"><div class="timeline-date">${escapeHTML(item.period)}</div><div><h4>${escapeHTML(item.role)} <span class="muted">/ ${escapeHTML(item.org)}</span></h4><p>${escapeHTML(item.desc)}</p></div></div>`).join("")}</section>

  <section class="content-block">
    ${
      "" /* <h3>Education</h3> 
  ${education
    .map(
      (item) => `
    <div class="timeline-item">
    <div class="timeline-date">EDUCATION</div>
    <div>
    <h4>${escapeHTML(item.name)}</h4>
    <p>${escapeHTML(item.detail)}</p> 
    </div></div>
    `,
    )
    .join("")}
    </section> 
    */
    }
    <section class="content-block">
    <h3>Skills</h3>
    <div class="skill-groups">${skills.map((group) => `<div class="skill-group"><h4>${escapeHTML(group.category)}</h4><div class="tag-list">${group.items.map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join("")}</div></div>`).join("")}</div></section></div></div></section>`;
}

function renderContact() {
  return `<section class="section"><div class="contact-layout"><div><p class="eyebrow">Contact</p><h1 style="font-size:clamp(2.8rem,7vw,5.2rem)">Let's talk<br><span class="muted">about your idea.</span></h1><p>Share a little context about your project, timeline, or the problem you're trying to solve. The form opens your email app; it does not send data to a backend.</p><div class="contact-details"><div class="contact-detail"><span>Email</span><a href="mailto:${escapeHTML(profile.email)}">${escapeHTML(profile.email)} ↗</a></div><div class="contact-detail"><span>Location</span><strong>${escapeHTML(profile.location)}</strong></div><div class="contact-detail"><span>Social</span><div class="footer-links"><a href="${escapeHTML(profile.github)}" target="_blank" rel="noreferrer">GitHub ↗</a><a href="${escapeHTML(profile.behance)}" target="_blank" rel="noreferrer">Behance ↗</a><a href="${escapeHTML(profile.linkedin)}" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></div></div><form class="contact-form" id="contact-form"><div class="form-grid"><div class="form-field"><label for="contact-name">Your name</label><input id="contact-name" name="name" autocomplete="name" required placeholder="Name"></div><div class="form-field"><label for="contact-email">Email address</label><input id="contact-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com"></div></div><div class="form-field"><label for="contact-topic">Topic</label><select id="contact-topic" name="topic"><option>Web Development</option><option>Design</option><option>Excel / Data</option><option>Other</option></select></div><div class="form-field"><label for="contact-message">Message</label><textarea id="contact-message" name="message" required placeholder="Tell me about your project, timeline, budget…"></textarea></div><button class="button button-primary" type="submit">Prepare email ↗</button><p style="font-size:11px;margin:12px 0 0">In-memory demo — no backend. Your email app will open with the message drafted.</p></form></div></section>`;
}

function renderNotFound() {
  return `<section class="not-found"><p class="eyebrow" style="justify-content:center">404 / page not found</p><h1 style="font-size:4rem">Lost the thread?</h1><p>The page you're looking for doesn't exist here.</p><a class="button button-primary" href="#/">Back home ↗</a></section>`;
}

function currentRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}
function renderRoute() {
  const route = currentRoute().replace(/\/$/, "") || "/";
  updateActiveNavigation(route);
  if (route === "/") app.innerHTML = renderHome();
  else if (route === "/portfolio") app.innerHTML = renderPortfolio();
  else if (route === "/journal") app.innerHTML = renderJournal();
  else if (route === "/about") app.innerHTML = renderAbout();
  else if (route === "/contact") app.innerHTML = renderContact();
  else if (route.startsWith("/project/")) {
    const project = projects.find(
      (item) => item.slug === route.slice("/project/".length),
    );
    if (project) {
      app.innerHTML = `<section class="page-intro"><p class="eyebrow">Project details</p><h1>${escapeHTML(project.title)}</h1><p>${escapeHTML(project.description)}</p><button class="button" id="open-current-project">Open case study ↗</button></section>`;
      document
        .querySelector("#open-current-project")
        ?.addEventListener("click", () => openProject(project));
    } else app.innerHTML = renderNotFound();
  } else if (route.startsWith("/article/")) {
    const article = journal.find(
      (item) => item.slug === route.slice("/article/".length),
    );
    if (article) {
      app.innerHTML = `<section class="page-intro"><p class="eyebrow">Journal article</p><h1>${escapeHTML(article.title)}</h1><p>${escapeHTML(article.excerpt)}</p><button class="button" id="open-current-article">Read article ↗</button></section>`;
      document
        .querySelector("#open-current-article")
        ?.addEventListener("click", () => openArticle(article));
    } else app.innerHTML = renderNotFound();
  } else app.innerHTML = renderNotFound();
  bindRouteEvents();
  window.scrollTo({ top: 0, behavior: "instant", left: 0 });
}

function openProject(project) {
  document.querySelector("#dialog-content").innerHTML =
    renderProjectDetail(project);
  if (!projectDialog.open) projectDialog.showModal();
}
function openArticle(article) {
  document.querySelector("#article-dialog-content").innerHTML =
    `<article class="article-content"><div class="journal-meta"><span>${escapeHTML(article.date)}</span><span>·</span><span>${escapeHTML(article.read)}</span><span class="pill">${escapeHTML(article.category)}</span></div><h2 id="article-dialog-title">${escapeHTML(article.title)}</h2><p class="muted">${escapeHTML(article.excerpt)}</p><div class="article-body">${escapeHTML(
      article.content,
    )
      .split("\n\n")
      .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
      .join("")}</div></article>`;
  if (!articleDialog.open) articleDialog.showModal();
}
function bindRouteEvents() {
  document.querySelectorAll("[data-project]").forEach((button) =>
    button.addEventListener("click", () => {
      const project = projects.find(
        (item) => item.slug === button.dataset.project,
      );
      if (project) {
        openProject(project);
      }
    }),
  );
  document.querySelectorAll("[data-article]").forEach((card) => {
    const open = () => {
      const article = journal.find(
        (item) => item.slug === card.dataset.article,
      );
      if (article) {
        openArticle(article);
      }
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
  document.querySelectorAll("[data-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      portfolioState.category = button.dataset.filter;
      document
        .querySelectorAll("[data-filter]")
        .forEach((filter) =>
          filter.setAttribute("aria-pressed", String(filter === button)),
        );
      updateProjectResults();
    }),
  );
  document
    .querySelector("#project-search")
    ?.addEventListener("input", (event) => {
      portfolioState.query = event.target.value;
      updateProjectResults();
    });
  document
    .querySelector("#project-sort")
    ?.addEventListener("change", (event) => {
      portfolioState.sort = event.target.value;
      updateProjectResults();
    });
  document
    .querySelector("#contact-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const name = String(form.get("name") || "").trim();
      const email = String(form.get("email") || "").trim();
      const topic = String(form.get("topic") || "Other");
      const message = String(form.get("message") || "").trim();
      const subject = encodeURIComponent(`Portfolio inquiry — ${topic}`);
      const body = encodeURIComponent(
        `Hi ${profile.name},\n\n${message}\n\n— ${name}\n${email}`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    });
}
function updateProjectResults() {
  const target = document.querySelector("#project-results");
  if (target) target.innerHTML = renderProjectResults();
  document.querySelectorAll("[data-project]").forEach((button) =>
    button.addEventListener("click", () => {
      const project = projects.find(
        (item) => item.slug === button.dataset.project,
      );
      if (project) {
        openProject(project);
      }
    }),
  );
}

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-dialog]")) {
    projectDialog.close();
    articleDialog.close();
  }
});
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
articleDialog.addEventListener("click", (event) => {
  if (event.target === articleDialog) articleDialog.close();
});
window.addEventListener("hashchange", renderRoute);
initNavbar();
initTheme();
hydrateProfile();
renderRoute();
