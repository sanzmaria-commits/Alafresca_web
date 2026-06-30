const ASSET_VERSION = "20260630-018";
let content = window.ALAFRESCA_CONTENT;
let cmsOverrides = {};

async function loadSharedCmsOverrides() {
  if (location.protocol === "file:") return;
  try {
    const response = await fetch(`cms-data.json?ts=${Date.now()}`);
    if (!response.ok) return;
    const data = await response.json();
    if (data && typeof data === "object") {
      if (data.__content && typeof data.__content === "object") {
        content = data.__content;
        renderDynamicContent();
      }
      cmsOverrides = { ...cmsOverrides, ...data };
      delete cmsOverrides.__content;
      applyCmsOverrides();
    }
  } catch {
    // The static file view still works without shared CMS data.
  }
}

const navLinks = [
  ["ayuda.html", "En qué puede ayudarte"],
  ["trabaja.html", "Cómo trabaja"],
  ["eventos.html", "Eventos y encuentros"],
  ["notas.html", "Notas de turismo"],
  ["quien.html", "Quién hay detrás"],
  ["contacto.html", "Contacto", "nav-cta"]
];

const iconNames = ["chair", "bell", "leaf", "table", "fronton", "plaza"];
const iconSvg = {
  chair: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 20h19M18 20V9h15v11M20 20v18M33 20v18M18 30h17"/></svg>',
  bell: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 38h18M18 38V18l6-6 6 6v20M14 22h20M24 12V7M21 29h6"/></svg>',
  leaf: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M38 10C22 10 12 19 12 34c15 0 24-9 26-24Z"/><path d="M12 34c7-9 13-14 23-20"/></svg>',
  table: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 20h28M14 20v18M34 20v18M16 29h16M17 14h14c4 0 7 2 7 6H10c0-4 3-6 7-6Z"/></svg>',
  fronton: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 38V12h28v26M10 29h28M18 38V18M27 24c4 1 6 4 6 8"/></svg>',
  plaza: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 35h30M14 35V22h20v13M18 22v-7h12v7M24 15V9M12 27h24"/></svg>'
};

function $(selector) {
  return document.querySelector(selector);
}

function render(selector, html) {
  const el = $(selector);
  if (el) el.innerHTML = html;
}

function assetUrl(value) {
  if (typeof value !== "string" || !value.startsWith("assets/")) return value;
  return value.includes("?") ? `${value}&v=${ASSET_VERSION}` : `${value}?v=${ASSET_VERSION}`;
}

function syncPhotoBackgrounds() {
  document.querySelectorAll(".hero-media img, .photo-panel img, .post-visual img, .example-photo img").forEach((img) => {
    const parent = img.parentElement;
    const src = img.currentSrc || img.getAttribute("src");
    if (parent && src) parent.style.backgroundImage = `url("${src}")`;
  });
}

function italicizeBrandMentions(root = document.body) {
  const skipSelector = "nav,.main-nav,.brand,.site-header,script,style,title,.brand-mention";
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.includes("A la fresca")) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest(skipSelector)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const parts = node.nodeValue.split("A la fresca");
    const fragment = document.createDocumentFragment();
    parts.forEach((part, index) => {
      if (part) fragment.append(document.createTextNode(part));
      if (index < parts.length - 1) {
        const em = document.createElement("em");
        em.className = "brand-mention";
        em.textContent = "A la fresca";
        fragment.append(em);
      }
    });
    node.replaceWith(fragment);
  });
}

function postHref(index) {
  return `nota.html?post=${index}`;
}

function postDate(post, index) {
  return post.date || ["12 junio 2026", "8 junio 2026", "3 junio 2026"][index % 3];
}

function noteFilterKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function noteCategoryMatches(postCategory, filter) {
  const postKey = noteFilterKey(postCategory);
  const filterKey = noteFilterKey(filter);
  return filterKey === "todas" || postKey === filterKey || filterKey.startsWith(postKey) || postKey.startsWith(filterKey);
}

function renderNotePosts(filter = "Todas") {
  const posts = content.notePosts || [];
  const visiblePosts = posts
    .map((post, index) => ({ post, index }))
    .filter(({ post }) => noteCategoryMatches(post.category, filter));

  render("#note-posts", visiblePosts.length ? visiblePosts.map(({ post, index }) => `
    <article class="post-example">
      <div class="post-visual"><img src="${assetUrl(post.image || "assets/photos/calle-pueblo.jpg")}" alt=""></div>
      <div class="post-copy">
        <div class="post-meta"><span>${post.category}</span><time datetime="">${postDate(post, index)}</time></div>
        <h2>${post.title}</h2>
        <p>${post.text}</p>
        <div class="post-actions"><a class="text-link" href="${postHref(index)}">Leer nota</a><a class="comment-link" href="${postHref(index)}#comentarios">Comentar</a></div>
      </div>
    </article>
  `).join("") : `<div class="empty-posts"><p>No hay notas publicadas todavía en esta categoría.</p></div>`);
  syncPhotoBackgrounds();
  italicizeBrandMentions();
}

function bindNoteFilters() {
  const filters = document.querySelectorAll("[data-note-filter]");
  if (!filters.length) return;
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.toggle("is-active", item === button));
      renderNotePosts(button.dataset.noteFilter || "Todas");
    });
  });
}

function applyCmsOverrides() {
  document.querySelectorAll("[data-cms-text]").forEach((el) => {
    const value = cmsOverrides[el.dataset.cmsText];
    if (typeof value === "string") el.textContent = value;
  });
  document.querySelectorAll("[data-cms-src]").forEach((el) => {
    const value = cmsOverrides[el.dataset.cmsSrc];
    if (typeof value === "string" && value) el.setAttribute("src", assetUrl(value));
  });
  syncPhotoBackgrounds();
  italicizeBrandMentions();
}

render(".main-nav", navLinks.map(([url, label, className]) => `<a${className ? ` class="${className}"` : ""} href="${url}">${label}</a>`).join(""));

const menuToggle = $(".menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", (event) => {
    const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
    event.currentTarget.setAttribute("aria-expanded", String(!expanded));
    document.body.classList.toggle("nav-open", !expanded);
  });
}

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  });
});

function methodCard(item, index) {
  return `<article class="method-card">
    <span class="line-icon">${iconSvg[iconNames[index % iconNames.length]]}</span>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  </article>`;
}

function renderDynamicContent() {
  render("#home-method", content.method.map(methodCard).join(""));
  render("#work-method", content.method.map(methodCard).join(""));

  render("#situation-cards", content.situations.map((item, index) => `
    <a class="situation-card" href="ayuda.html">
      <span class="line-icon">${iconSvg[iconNames[index]]}</span>
      <h3>${item.title}</h3>
      <p>${item.short}</p>
    </a>
  `).join(""));

  render("#situation-accordion", content.situations.map((item, index) => `
    <details class="accordion-item" ${index === 0 ? "open" : ""}>
      <summary>
        <span class="accordion-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="accordion-title-group">
          <span class="accordion-title">${item.title}</span>
          <span class="accordion-summary">${item.short}</span>
        </span>
        <span class="accordion-toggle" aria-hidden="true"></span>
      </summary>
      <div class="accordion-body">
        ${item.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        <div class="mini-columns">
          <div><h4>Qué podemos poner en marcha</h4><ul>${item.launch.map((entry) => `<li>${entry}</li>`).join("")}</ul></div>
          <div><h4>Qué puede cambiar</h4><ul>${item.change.map((entry) => `<li>${entry}</li>`).join("")}</ul></div>
        </div>
        <h4>Cómo lo hacemos</h4>
        <p>${item.how}</p>
      </div>
    </details>
  `).join(""));

  render("#examples", content.examples.map((example) => `
    <article class="example-card">
      <div class="example-photo"><img src="${assetUrl(example.image || "assets/photos/banco-charla-wide.png")}" alt=""></div>
      <div class="example-content">
        <h3>${example.title}</h3>
        <div class="example-steps">
          ${example.steps.map(([label, text]) => `<div><span>${label}</span><p>${text}</p></div>`).join("")}
        </div>
      </div>
    </article>
  `).join(""));

  render("#collaboration", content.collaboration.map((item, index) => `
    <article class="collab-card">
      <span class="line-icon">${iconSvg[iconNames[index]]}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join(""));

  render("#event-formats", content.eventFormats.map(([title, text], index) => `
    <article>
      <span class="line-icon">${iconSvg[iconNames[index]]}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join(""));

  render("#note-categories", [["Todas", "Ver todas las notas publicadas."], ...(content.notesCategories || [])].map(([title, text], index) => `
    <button class="note-filter-card${index === 0 ? " is-active" : ""}" type="button" data-note-filter="${title}">
      <span class="line-icon">${iconSvg[iconNames[index]]}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    </button>
  `).join(""));

  renderNotePosts();
  bindNoteFilters();

  const noteDetail = $("#note-detail");
  if (noteDetail) {
    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("post") || 0);
    const posts = content.notePosts || [];
    const post = posts[index] || posts[0];
    if (post) {
      document.title = `${post.title} · A la fresca`;
      noteDetail.innerHTML = `
        <section class="page-hero note-detail-hero">
          <div><div class="post-meta"><span>${post.category}</span><time datetime="">${postDate(post, index)}</time></div><h1>${post.title}</h1><p>${post.text}</p><a class="text-link" href="notas.html">Volver a Notas de turismo</a></div>
          <div class="photo-panel"><img src="${assetUrl(post.image || "assets/photos/calle-pueblo.jpg")}" alt=""></div>
        </section>
        <section class="section note-comments" id="comentarios">
          <form class="comment-form">
            <div><p class="eyebrow">Comentarios</p><h2>¿Quieres comentar esta nota?</h2><p>Deja tu nombre, correo y comentario. Este formulario es una maqueta para preparar la sección de comentarios.</p></div>
            <label>Nombre <input type="text" name="name" required></label>
            <label>Email <input type="email" name="email" required></label>
            <label>Comentario <textarea name="comment" rows="5" required></textarea></label>
            <button class="button button-dark" type="submit">Enviar comentario</button>
          </form>
        </section>
      `;
    }
  }
}

renderDynamicContent();
syncPhotoBackgrounds();
italicizeBrandMentions();

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  form.reset();
  if (form.classList.contains("comment-form")) {
    alert("Gracias por tu comentario. En la versión final podrá revisarse antes de publicarse.");
    return;
  }
  alert("Gracias por contármelo. He recibido tu mensaje. Lo leeré con calma y me pondré en contacto contigo para conocer un poco mejor la situación y ver cuál puede ser el siguiente paso.");
});

const legalDialog = $("#legal-dialog");
const legalContent = $("#legal-content");
if (legalDialog && legalContent) {
  document.querySelectorAll("[data-legal]").forEach((button) => {
    button.addEventListener("click", () => {
      const legal = content.legal[button.dataset.legal];
      legalContent.innerHTML = `<h2>${legal.title}</h2>${legal.sections.map(([title, text]) => `<h3>${title}</h3><p>${text}</p>`).join("")}`;
      italicizeBrandMentions(legalContent);
      legalDialog.showModal();
    });
  });
  $(".close-dialog")?.addEventListener("click", () => legalDialog.close());
}

const cookieBanner = $("#cookie-banner");
if (cookieBanner) {
  const cookieChoice = localStorage.getItem("alafresca-cookie-choice");
  if (!cookieChoice) cookieBanner.classList.add("is-visible");
  document.querySelectorAll("[data-cookie]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem("alafresca-cookie-choice", button.dataset.cookie);
      cookieBanner.classList.remove("is-visible");
    });
  });
  $("#cookie-settings")?.addEventListener("click", () => cookieBanner.classList.add("is-visible"));
}

applyCmsOverrides();
loadSharedCmsOverrides();
