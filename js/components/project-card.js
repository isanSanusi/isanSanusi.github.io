const categoryMeta = {
  web: { label: 'Web Development', glyph: '</>', color: '#c7f36b' },
  design: { label: 'Visual Design', glyph: '✳', color: '#d8b7ff' },
  excel: { label: 'Excel / Data', glyph: '▦', color: '#8de3d3' }
};

export function projectThumbnail(project, extraClass = '') {
  const meta = categoryMeta[project.category] || categoryMeta.web;
  const fallback = `<div class="thumb-fallback" style="--thumb-accent:${meta.color}"><span class="thumb-label">${meta.label}</span><span class="thumb-glyph">${meta.glyph}</span><span class="thumb-title">${project.title}</span></div>`;
  if (!project.image) return `<div class="project-thumb ${extraClass}">${fallback}</div>`;
  const fit = project.imageFit === 'contain' ? 'contain' : 'cover';
  return `<div class="project-thumb ${extraClass}"><img src="${escapeAttr(project.image)}" alt="${escapeAttr(project.imageAlt || project.title)}" style="object-fit:${fit}" loading="lazy" onload="this.nextElementSibling.style.display='none'" onerror="this.remove()">${fallback}</div>`;
}

export function projectCard(project) {
  const category = categoryMeta[project.category]?.label || project.category;
  return `<article class="project-card"><button class="project-card-button" type="button" data-project="${escapeAttr(project.slug)}" aria-label="View ${escapeAttr(project.title)} project details">
    ${projectThumbnail(project)}
    <div class="project-card-body"><div class="project-card-top"><span class="pill"><span class="pill-dot"></span>${category}</span><span class="project-year">${project.year}</span></div>
    <h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p>
    <div class="project-card-footer"><div class="tag-list">${project.tags.slice(0,3).map(tag=>`<span class="tag">${escapeHTML(tag)}</span>`).join('')}</div><span class="text-link" aria-hidden="true">↗</span></div></div></button></article>`;
}

export function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
export function escapeAttr(value = '') { return escapeHTML(value); }
