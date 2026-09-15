/* ============================================================
   APP.JS — builds the navigation, switches pages, and runs the
   figure viewer. You should not need to edit this file to add
   projects, images, or text. All of that lives in /content.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- helpers ---------------------------------------- */

  const $ = (id) => document.getElementById(id);

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  const pad2 = (n) => String(n).padStart(2, "0");

  function host(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); }
    catch (e) { return ""; }
  }

  /* ---------- page list -------------------------------------- */

  const projects = (typeof PROJECTS !== "undefined" ? PROJECTS : [])
    .filter((p) => p && !p.hidden);

  const pages = [{ kind: "about", id: "about", title: "About" }]
    .concat(projects.map((p) => ({ kind: "project", id: p.id, title: p.title, data: p })))
    .concat([{ kind: "contact", id: "contact", title: "Contact" }]);

  pages.forEach((p, i) => { p.sheet = "A-" + pad2(i); });

  const site = (typeof SITE !== "undefined") ? SITE : {};
  const href = (p) => (p.kind === "project" ? "#/p/" + p.id : "#/" + p.id);

  /* ---------- navigation ------------------------------------- */

  function buildNav() {
    $("navName").textContent = site.name || "Portfolio";
    $("topbarName").textContent = site.name || "Portfolio";
    const tb = site.titleBlock || [];
    $("navRole").textContent = tb.length ? tb[0].value : "";
    const mail = site.contact && site.contact.email;
    $("navEmail").textContent = mail || "";

    $("sheetlist").innerHTML = pages.map((p) =>
      '<li><a class="sheetlink" href="' + href(p) + '" data-id="' + esc(p.id) + '">' +
        '<span class="num">' + p.sheet + '</span>' +
        '<span class="name">' + esc(p.title) + '</span>' +
      '</a></li>'
    ).join("");
  }

  function markCurrent(id) {
    document.querySelectorAll(".sheetlink").forEach((a) => {
      if (a.dataset.id === id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  /* ---------- shared partials -------------------------------- */

  function blockHead(title, tick) {
    return '<div class="block-head"><h2>' + esc(title) + '</h2>' +
      (tick ? '<span class="tick">' + esc(tick) + '</span>' : '') + '</div>';
  }

  function titleBlock(cells) {
    if (!cells || !cells.length) return "";
    return '<div class="titleblock">' + cells.map((c) =>
      '<div class="tb-cell"><span class="tb-label">' + esc(c.label) + '</span>' +
      '<span class="tb-value">' + esc(c.value) + '</span></div>'
    ).join("") + '</div>';
  }

  function figures(images) {
    if (!images || !images.length) return "";
    return '<div class="figures">' + images.map((im, i) =>
      '<figure class="figure">' +
        '<button class="figure-btn" data-fig="' + i + '">' +
          '<img src="' + esc(im.src) + '" alt="' + esc(im.caption || "Project figure") + '" loading="lazy">' +
        '</button>' +
        '<figcaption><span class="fignum">Fig. ' + (i + 1) + '</span>' +
          esc(im.caption || "") + '</figcaption>' +
      '</figure>'
    ).join("") + '</div>';
  }

  function footNav(index) {
    const prev = pages[index - 1], next = pages[index + 1];
    let out = '<div class="sheet-foot">';
    if (prev) out += '<a class="foot-link" href="' + href(prev) + '">' +
      '<span class="dir">Previous — ' + prev.sheet + '</span>' +
      '<span class="to">' + esc(prev.title) + '</span></a>';
    if (next) out += '<a class="foot-link foot-next" href="' + href(next) + '">' +
      '<span class="dir">Next — ' + next.sheet + '</span>' +
      '<span class="to">' + esc(next.title) + '</span></a>';
    return out + '</div>';
  }

  /* ---------- pages ------------------------------------------ */

  function renderAbout() {
    const a = site.about || {};
    let html =
      '<section class="hero">' +
        '<h1 class="hero-name">' + esc(site.name || "Your Name") + '</h1>' +
        '<p class="hero-tagline">' + esc(site.tagline || "") + '</p>' +
        titleBlock(site.titleBlock) +
      '</section>' +
      '<div class="wrap">' +
        '<section class="block">' +
          blockHead("About", "A-00") +
          '<div class="about-grid">' +
            '<div class="measure">' +
              (a.paragraphs || []).map((t, i) =>
                i === 0 ? '<p class="lede">' + esc(t) + '</p>' : '<p>' + esc(t) + '</p>'
              ).join("") +
            '</div>';

    if (a.photo) {
      html += '<figure class="portrait">' +
        '<img src="' + esc(a.photo) + '" alt="Portrait of ' + esc(site.name || "the author") + '">' +
        (a.photoCaption ? '<figcaption>' + esc(a.photoCaption) + '</figcaption>' : '') +
        '</figure>';
    }
    html += '</div></section>';

    if (a.skills && a.skills.length) {
      html += '<section class="block">' + blockHead("What I work with") +
        '<div class="skills">' + a.skills.map((g) =>
          '<div class="skill-group"><h3>' + esc(g.group) + '</h3><ul>' +
          (g.items || []).map((s) => '<li>' + esc(s) + '</li>').join("") +
          '</ul></div>'
        ).join("") + '</div></section>';
    }

    if (a.timeline && a.timeline.length) {
      html += '<section class="block">' + blockHead("Recently") +
        '<ul class="timeline">' + a.timeline.map((t) =>
          '<li><span class="when">' + esc(t.when) + '</span><span>' + esc(t.what) + '</span></li>'
        ).join("") + '</ul></section>';
    }

    return html + footNav(0) + '</div>';
  }

  function renderProject(p, index) {
    const page = pages[index];
    let html =
      '<header class="sheet-head">' +
        '<span class="sheet-num">Sheet ' + page.sheet + '</span>' +
        '<h1 class="sheet-title">' + esc(p.title) + '</h1>' +
        '<p class="sheet-sub">' + esc(p.subtitle || "") + '</p>' +
        titleBlock(p.specs) +
      '</header>' +
      '<div class="wrap">';

    if (p.summary) {
      html += '<section class="block"><p class="lede">' + esc(p.summary) + '</p></section>';
    }

    if (p.images && p.images.length) {
      html += '<section class="block">' + blockHead("Figures",
        p.images.length + (p.images.length === 1 ? " figure" : " figures")) +
        figures(p.images) + '</section>';
    }

    (p.sections || []).forEach((s) => {
      html += '<section class="block">' + blockHead(s.heading) +
        '<div class="measure"><p>' + esc(s.body) + '</p></div></section>';
    });

    if (p.highlights && p.highlights.length) {
      html += '<section class="block">' + blockHead("Outcomes") +
        '<ul class="highlights">' +
        p.highlights.map((h) => '<li>' + esc(h) + '</li>').join("") +
        '</ul></section>';
    }

    if (p.links && p.links.length) {
      html += '<section class="block"><div class="btnrow">' +
        p.links.map((l) => '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
          esc(l.label) + '</a>').join("") +
        '</div></section>';
    }

    return html + footNav(index) + '</div>';
  }

  function renderContact(index) {
    const c = site.contact || {};
    const page = pages[index];
    let html =
      '<header class="sheet-head">' +
        '<span class="sheet-num">Sheet ' + page.sheet + '</span>' +
        '<h1 class="sheet-title">Contact</h1>' +
        '<p class="sheet-sub">' + esc(c.blurb || "") + '</p>' +
      '</header>' +
      '<div class="wrap">' +
        '<section class="block">' + blockHead("Email") +
          '<a class="contact-email" href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>' +
        '</section>';

    if (c.resume) {
      html += '<section class="block">' + blockHead("Resume") +
        '<div class="measure">' +
          (c.resumeNote ? '<p>' + esc(c.resumeNote) + '</p>' : '') +
          '<div class="btnrow">' +
            '<a class="btn btn-solid" href="' + esc(c.resume) + '" target="_blank" rel="noopener">Open resume</a>' +
            '<a class="btn" href="' + esc(c.resume) + '" download>Download PDF</a>' +
          '</div>' +
        '</div></section>';
    }

    if (c.links && c.links.length) {
      html += '<section class="block">' + blockHead("Elsewhere") +
        '<ul class="linklist">' + c.links.map((l) =>
          '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
          '<span>' + esc(l.label) + '</span><span class="host">' + esc(host(l.url)) + '</span></a></li>'
        ).join("") + '</ul></section>';
    }

    return html + footNav(index) + '</div>';
  }

  /* ---------- missing images --------------------------------- */

  function guardImages() {
    document.querySelectorAll(".sheet img").forEach((img) => {
      img.addEventListener("error", function () {
        const file = (img.getAttribute("src") || "").split("/").pop();
        const box = document.createElement("div");
        box.className = "figure-empty";
        box.innerHTML = '<span>' + esc(file) + '</span>' +
          '<span>Add this file to the images folder</span>';
        const btn = img.closest(".figure-btn");
        const target = btn || img;
        if (btn) btn.replaceWith(box); else target.replaceWith(box);
      });
    });
  }

  /* ---------- router ----------------------------------------- */

  let currentFigs = [];

  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    let index = 0;

    if (hash.indexOf("p/") === 0) {
      const id = hash.slice(2);
      const i = pages.findIndex((p) => p.kind === "project" && p.id === id);
      if (i > -1) index = i;
    } else if (hash === "contact") {
      index = pages.length - 1;
    }

    const page = pages[index];
    const main = $("sheet");

    if (page.kind === "about") main.innerHTML = renderAbout();
    else if (page.kind === "contact") main.innerHTML = renderContact(index);
    else main.innerHTML = renderProject(page.data, index);

    currentFigs = (page.data && page.data.images) || [];
    markCurrent(page.id);
    guardImages();
    closeNav();

    document.title = page.kind === "about"
      ? (site.name || "Portfolio")
      : page.title + " — " + (site.name || "Portfolio");

    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }

  /* ---------- figure viewer ---------------------------------- */

  const viewer = $("viewer");
  let figIndex = 0, lastFocus = null;

  function showFig(i) {
    if (!currentFigs.length) return;
    figIndex = (i + currentFigs.length) % currentFigs.length;
    const f = currentFigs[figIndex];
    $("viewerImg").src = f.src;
    $("viewerImg").alt = f.caption || "Project figure";
    $("viewerCap").textContent = "Fig. " + (figIndex + 1) + " — " + (f.caption || "");
    const many = currentFigs.length > 1;
    $("viewerPrev").hidden = !many;
    $("viewerNext").hidden = !many;
  }

  function openViewer(i) {
    lastFocus = document.activeElement;
    viewer.hidden = false;
    showFig(i);
    $("viewerClose").focus();
  }

  function closeViewer() {
    viewer.hidden = true;
    $("viewerImg").removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }

  /* ---------- mobile nav ------------------------------------- */

  const nav = $("sidenav"), scrim = $("navScrim"), menuBtn = $("menuBtn");

  function openNav() {
    nav.classList.add("open");
    scrim.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
  }
  function closeNav() {
    nav.classList.remove("open");
    scrim.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }

  /* ---------- wiring ----------------------------------------- */

  buildNav();

  menuBtn.addEventListener("click", () =>
    nav.classList.contains("open") ? closeNav() : openNav());
  scrim.addEventListener("click", closeNav);

  document.addEventListener("click", (e) => {
    const fig = e.target.closest(".figure-btn");
    if (fig) { openViewer(Number(fig.dataset.fig)); return; }
    if (e.target.closest(".viewer-close")) closeViewer();
    if (e.target.closest(".viewer-prev")) showFig(figIndex - 1);
    if (e.target.closest(".viewer-next")) showFig(figIndex + 1);
    if (e.target === viewer) closeViewer();
  });

  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) {
      if (e.key === "Escape") closeNav();
      return;
    }
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowLeft") showFig(figIndex - 1);
    if (e.key === "ArrowRight") showFig(figIndex + 1);
  });

  window.addEventListener("hashchange", route);
  route();
})();
