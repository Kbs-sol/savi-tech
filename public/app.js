(function () {
  const KEY = "savi-content-v1";

  function cloneDefault() {
    return JSON.parse(JSON.stringify(window.SAVI_DEFAULT));
  }

  function load() {
    const base = cloneDefault();
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return base;
      const saved = JSON.parse(raw);
      return {
        brand: Object.assign({}, base.brand, saved.brand || {}),
        services: Array.isArray(saved.services) && saved.services.length ? saved.services : base.services,
        steps: Array.isArray(saved.steps) && saved.steps.length ? saved.steps : base.steps,
        team: Array.isArray(saved.team) && saved.team.length ? saved.team : base.team,
        inquiries: Array.isArray(saved.inquiries) ? saved.inquiries : []
      };
    } catch (err) {
      return base;
    }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  const data = load();
  const b = data.brand;

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  };

  setText("hero-eyebrow", b.eyebrow);
  setText("hero-title", b.heroTitle);
  setText("hero-lede", b.heroLede);
  setText("hero-primary", b.heroPrimary);
  setText("hero-secondary", b.heroSecondary);
  setText("hero-tagline", b.tagline);
  setText("card-line", b.cardLine);
  setText("card-services", b.cardServices);
  setText("card-tag", b.tagline.toUpperCase());
  setText("band-label", b.bandLabel);
  setText("band-text", b.bandText);
  setText("services-title", b.servicesTitle);
  setText("services-intro", b.servicesIntro);
  setText("about-title", b.aboutTitle);
  setText("about-note", b.aboutNote);
  setText("approach-title", b.approachTitle);
  setText("team-title", b.teamTitle);
  setText("team-intro", b.teamIntro);
  setText("contact-title", b.contactTitle);
  setText("contact-intro", b.contactIntro);
  setText("footer-tag", b.tagline);
  setText("footer-legal", "© ");
  document.getElementById("year").textContent = String(new Date().getFullYear());
  document.getElementById("footer-legal").append(document.createTextNode(" " + b.footerLegal));
  document.title = b.name + " — " + b.tagline;

  const about = document.getElementById("about-body");
  (b.aboutParagraphs || []).forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p;
    about.appendChild(el);
  });

  const grid = document.getElementById("service-grid");
  data.services.forEach((svc, i) => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.innerHTML =
      '<span class="service-index">' + String(i + 1).padStart(2, "0") + "</span>" +
      "<h3></h3><p class='summary'></p><p class='more'></p>";
    card.querySelector("h3").textContent = svc.title;
    card.querySelector(".summary").textContent = svc.summary;
    card.querySelector(".more").textContent = svc.detail;
    grid.appendChild(card);
  });

  const steps = document.getElementById("steps");
  data.steps.forEach((step) => {
    const li = document.createElement("li");
    li.className = "step";
    const strong = document.createElement("strong");
    strong.textContent = step.title;
    const p = document.createElement("p");
    p.textContent = step.text;
    li.append(strong, p);
    steps.appendChild(li);
  });

  const team = document.getElementById("team-grid");
  data.team.forEach((person) => {
    const article = document.createElement("article");
    article.className = "person";
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = person.initials || person.name.slice(0, 2).toUpperCase();
    const body = document.createElement("div");
    const h = document.createElement("h3");
    h.textContent = person.name;
    const role = document.createElement("p");
    role.className = "role";
    role.textContent = person.role;
    const bio = document.createElement("p");
    bio.textContent = person.bio;
    body.append(h, role, bio);
    article.append(avatar, body);
    team.appendChild(article);
  });

  const meta = document.getElementById("contact-meta");
  const rows = [
    ["Email", b.email, b.email ? "mailto:" + b.email : ""],
    ["Phone", b.phone, b.phone ? "tel:" + b.phone.replace(/\s/g, "") : ""],
    ["Where", b.location, ""]
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

  const header = document.getElementById("site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }));

  const links = Array.from(document.querySelectorAll("[data-nav]"));
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message || !email.includes("@")) {
      note.textContent = "Please add your name, a real email, and a short message.";
      note.classList.add("error");
      return;
    }
    const current = load();
    current.inquiries.unshift({
      id: "inq-" + Date.now(),
      name,
      email,
      interest: String(fd.get("interest") || ""),
      message,
      createdAt: new Date().toISOString(),
      status: "new"
    });
    save(current);
    form.reset();
    note.classList.remove("error");
    note.textContent = "Received. We’ll reply at " + email + ".";
  });
})();
