import { profile, projects } from "./data.js";

const projectContainers = document.querySelectorAll("[data-projects]");
const statContainer = document.querySelector("[data-stats]");
const detailRoot = document.querySelector("[data-project-detail]");

function projectCard(project) {
  return `
    <article class="project-card">
      <a class="project-image" href="/src/projects/${project.slug}.html">
        <img src="${project.image}" alt="${project.title} 项目封面" />
      </a>
      <div class="project-meta">
        <span>${project.type}</span>
        <span>${project.year}</span>
      </div>
      <h3><a href="/src/projects/${project.slug}.html">${project.title}</a></h3>
      <p>${project.summary}</p>
    </article>
  `;
}

projectContainers.forEach((container) => {
  const limit = Number(container.dataset.limit || projects.length);
  container.innerHTML = projects.slice(0, limit).map(projectCard).join("");
});

if (statContainer) {
  statContainer.innerHTML = profile.stats
    .map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`)
    .join("");
}

if (detailRoot) {
  const project = projects.find((item) => item.slug === detailRoot.dataset.projectDetail);

  if (project) {
    detailRoot.innerHTML = `
      <section class="case-hero">
        <div class="case-title">
          <a class="back-link" href="/works.html">返回作品列表</a>
          <p class="eyebrow">${project.type} / ${project.year}</p>
          <h1>${project.title}</h1>
          <p class="lead">${project.summary}</p>
        </div>
        <img src="${project.image}" alt="${project.title} 项目封面" />
      </section>

      <section class="case-overview">
        <div>
          <span>Role</span>
          <strong>${project.role}</strong>
        </div>
        <div>
          <span>Palette</span>
          <strong>${project.palette}</strong>
        </div>
        <div>
          <span>Services</span>
          <strong>${project.services.join(" / ")}</strong>
        </div>
      </section>

      <section class="case-content">
        <article>
          <p class="eyebrow">Challenge & Direction</p>
          <h2>把业务目标转化为可感知的界面秩序。</h2>
          <p>${project.description}</p>
        </article>
        <aside>
          ${project.metrics.map((metric) => `<div><strong>${metric}</strong></div>`).join("")}
        </aside>
      </section>

      <section class="case-content split">
        <article>
          <p class="eyebrow">Design Notes</p>
          <h2>关键设计动作</h2>
          <ul>${project.highlights.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
        <a class="next-project" href="/contact.html">
          <span>想要类似项目？</span>
          <strong>聊聊合作方向</strong>
        </a>
      </section>
    `;
  }
}
