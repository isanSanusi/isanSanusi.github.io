import { projectThumbnail, escapeHTML } from "./project-card.js";

export function renderProjectDetail(project) {
  const category =
    { web: "Web Development", design: "Visual Design", excel: "Excel / Data" }[
      project.category
    ] || project.category;
  const realDemo = project.demo && project.demo !== "#";
  const realRepo = project.repo && project.repo !== "#";
  return `<div class="dialog-hero"><span class="eyebrow">${escapeHTML(category)} / ${project.year}</span><h2 id="dialog-title">${escapeHTML(project.title)}</h2><p class="dialog-description">${escapeHTML(project.longDescription || project.description)}</p>${projectThumbnail(project)}<div class="tag-list">${project.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div></div>
    <div class="detail-grid"><section class="detail-panel"><h3>Problem</h3><p>${escapeHTML(project.problem || "Details to be added.")}</p></section><section class="detail-panel"><h3>Goal</h3><p>${escapeHTML(project.goal || "Details to be added.")}</p></section><section class="detail-panel"><h3>Process</h3><p>${escapeHTML(project.process || "Details to be added.")}</p></section><section class="detail-panel"><h3>Result</h3><p>${escapeHTML(project.result || "Details to be added.")}</p></section></div>
    <section class="content-block"><h3>Tools & stack</h3><div class="tag-list">${project.tools.map((tool) => `<span class="tag">${escapeHTML(tool)}</span>`).join("")}</div></section>
    <div class="dialog-actions">${realDemo ? `<a class="button button-primary" href="${escapeHTML(project.demo)}" target="_blank" rel="noreferrer">Live demo ↗</a>` : ""}${realRepo ? `<a class="button" href="${escapeHTML(project.repo)}" target="_blank" rel="noreferrer">Repository ↗</a>` : ""}<button class="button" data-close-dialog type="button">Close details</button></div>`;
}
