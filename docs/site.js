(function () {
  const page = document.body.dataset.page || "";

  function text(id, value) {
    const el = document.getElementById(id);
    if (el && value != null && value !== "") el.textContent = value;
  }

  function fillBrand(brand) {
    text("hero-title", brand.heroTitle);
    text("hero-lede", brand.heroLede);
    text("hero-tagline", brand.tagline);
    text("card-line", brand.cardLine);
    text("card-services", brand.cardServices);
    text("card-tag", (brand.tagline || "").toUpperCase());
    text("band-text", brand.bandText);
    text("services-title", brand.servicesTitle);
    text("services-intro", brand.servicesIntro);
    text("about-title", brand.aboutTitle);
    text("about-note", brand.aboutNote);
    text("approach-title", brand.approachTitle);
    text("team-title", brand.teamTitle);
    text("team-intro", brand.teamIntro);
    text("contact-title", brand.contactTitle);
    text("contact-intro", brand.contactIntro);
    text("footer-tag", brand.tagline);
    text("footer-legal-name", brand.legal || brand.name);

    const about = document.getElementById("about-body");
    if (about && Array.isArray(brand.aboutParagraphs)) {
      about.replaceChildren();
      brand.aboutParagraphs.forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        about.appendChild(p);
      });
    }

    document.querySelectorAll("[data-brand-name]").forEach((el) => {
      el.textContent = brand.name || "SaVi Tech";
    });

    const meta = document.getElementById("contact-meta");
    if (meta) {
      meta.replaceChildren();
      const rows = [
        ["Email", brand.email, brand.email ? "mailto:" + brand.email : ""],
        ["Phone", brand.phone, brand.phone ? "tel:" + String(brand.phone).replace(/\s/g, "") : ""],
        ["Where", brand.location, ""]
      ];
      rows.forEach(([label, value, href]) => {
        if (!value) return;
        const wrap = document.createElement("div");
        const dt = document.createElement("dt");
        dt.textContent = label;
        const dd = document.createElement("dd");
        if (href) {
          const a = document.createElement("a");
          a.href = href;
          a.textContent = value;
          dd.appendChild(a);
        } else {
          dd.textContent = value;
        }
        wrap.append(dt, dd);
        meta.appendChild(wrap);
      });
    }

    const interest = document.getElementById("interest-select");
    if (interest && interest.options.length <= 1 && Array.isArray(window.__saviServices)) {
      interest.replaceChildren();
      window.__saviServices.forEach((service) => {
        const option = document.createElement("option");
        option.textContent = service.title;
        interest.appendChild(option);
      });
      const other = document.createElement("option");
      other.textContent = "Something else";
      interest.appendChild(other);
    }
  }

  function renderServices(services, mode) {
    const grid = document.getElementById(mode === "full" ? "service-list" : "service-grid");
    if (!grid) return;
    grid.replaceChildren();
    services.forEach((service, index) => {
      if (mode === "full") {
        const row = document.createElement("article");
        row.className = "service-row";
        row.id = service.id || "service-" + (index + 1);
        const num = document.createElement("span");
        num.className = "index";
        num.textContent = String(index + 1).padStart(2, "0");
        const heading = document.createElement("h3");
        heading.textContent = service.title || "Service";
        const copy = document.createElement("div");
        const summary = document.createElement("p");
        summary.textContent = service.summary || "";
        const detail = document.createElement("p");
        detail.className = "more";
        detail.textContent = service.detail || "";
        copy.append(summary, detail);
        row.append(num, heading, copy);
        grid.appendChild(row);
        return;
      }
      const card = document.createElement("article");
      card.className = "service-card";
      const num = document.createElement("span");
      num.className = "index";
      num.textContent = String(index + 1).padStart(2, "0");
      const heading = document.createElement("h3");
      heading.textContent = service.title || "Service";
      const summary = document.createElement("p");
      summary.textContent = service.summary || "";
      card.append(num, heading, summary);
      grid.appendChild(card);
    });
  }

  function renderSteps(steps) {
    const list = document.getElementById("steps");
    if (!list) return;
    list.replaceChildren();
    steps.forEach((step) => {
      const item = document.createElement("li");
      item.className = "step";
      const strong = document.createElement("strong");
      strong.textContent = step.title || "";
      const p = document.createElement("p");
      p.textContent = step.text || "";
      item.append(strong, p);
      list.appendChild(item);
    });
  }

  function renderTeam(team) {
    const grid = document.getElementById("team-grid");
    if (!grid) return;
    grid.replaceChildren();
    team.forEach((person) => {
      const article = document.createElement("article");
      article.className = "person";
      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = person.initials || String(person.name || "").slice(0, 2).toUpperCase();
      const body = document.createElement("div");
      const heading = document.createElement("h3");
      heading.textContent = person.name || "";
      const role = document.createElement("p");
      role.className = "role";
      role.textContent = person.role || "";
      const bio = document.createElement("p");
      bio.textContent = person.bio || "";
      body.append(heading, role, bio);
      article.append(avatar, body);
      grid.appendChild(article);
    });
  }

  function bindChrome() {
    const header = document.getElementById("site-header");
    if (header) {
      const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    const menuBtn = document.getElementById("menu-btn");
    const nav = document.getElementById("nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      nav.querySelectorAll("a").forEach((link) => {
        if (link.dataset.nav === page) link.setAttribute("aria-current", "page");
        link.addEventListener("click", () => {
          nav.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function bindForm() {
    const form = document.getElementById("contact-form");
    const note = document.getElementById("form-note");
    if (!form || !note) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      if (!name || !email.includes("@") || message.length < 4) {
        note.textContent = "Add your name, a real email, and a short message.";
        note.className = "form-note error";
        return;
      }
      const inbox = JSON.parse(localStorage.getItem("savi-inbox") || "[]");
      inbox.unshift({
        id: "inq-" + Date.now(),
        name,
        email,
        interest: String(data.get("interest") || ""),
        message,
        createdAt: new Date().toISOString(),
        status: "new"
      });
      localStorage.setItem("savi-inbox", JSON.stringify(inbox.slice(0, 200)));
      form.reset();
      note.className = "form-note";
      note.textContent = "Received. This note is saved in the admin inbox on this browser.";
    });
  }

  async function start() {
    bindChrome();
    bindForm();
    try {
      const params = new URLSearchParams(location.search);
      let content = null;
      if (params.get("draft") === "1") {
        const raw = localStorage.getItem("savi-draft");
        if (raw) content = JSON.parse(raw);
        const bar = document.createElement("div");
        bar.className = "draft-bar";
        bar.textContent = content ? "Draft preview. This is not published yet. " : "No draft in this browser. Showing the published site. ";
        const back = document.createElement("a");
        back.href = "admin.html";
        back.textContent = "Back to admin";
        bar.appendChild(back);
        document.body.prepend(bar);
      }
      if (!content) {
        const response = await fetch("content.json?ts=" + Date.now());
        if (!response.ok) return;
        content = await response.json();
      }
      window.__saviServices = content.services || [];
      fillBrand(content.brand || {});
      renderServices(content.services || [], page === "services" ? "full" : "cards");
      renderSteps(content.steps || []);
      renderTeam(content.team || []);
      const interest = document.getElementById("interest-select");
      if (interest) {
        const current = interest.value;
        interest.replaceChildren();
        (content.services || []).forEach((service) => {
          const option = document.createElement("option");
          option.textContent = service.title;
          interest.appendChild(option);
        });
        const other = document.createElement("option");
        other.textContent = "Something else";
        interest.appendChild(other);
        if (current) interest.value = current;
      }
    } catch (err) {
      /* Static fallback copy in the HTML still renders. */
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
