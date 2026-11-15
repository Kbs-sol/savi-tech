(function () {
  "use strict";

  // Safeguarded element text updater
  function text(id, value) {
    const el = document.getElementById(id);
    if (el && value != null && value !== "") el.textContent = value;
  }

  // Populate brand copy
  function applyBrand(brand) {
    if (!brand) return;
    text("hero-title", brand.heroTitle);
    text("hero-lede", brand.heroLede);
    text("hero-tagline", brand.tagline);
    text("card-line", brand.cardLine);
    text("card-services", brand.cardServices);
    text("band-text", brand.bandText);
    text("services-title", brand.servicesTitle);
    text("services-intro", brand.servicesIntro);
    text("about-title", brand.aboutTitle);
    text("about-note", brand.aboutNote);
    text("team-title", brand.teamTitle);
    text("team-intro", brand.teamIntro);
    text("contact-title", brand.contactTitle);
    text("contact-intro", brand.contactIntro);

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const legalEl = document.getElementById("footer-legal-name");
    if (legalEl) legalEl.textContent = brand.legal || brand.name || "SaVi Technologies";

    // About paragraphs
    const aboutContainer = document.getElementById("about-body");
    if (aboutContainer && Array.isArray(brand.aboutParagraphs)) {
      aboutContainer.replaceChildren();
      brand.aboutParagraphs.forEach(pText => {
        const p = document.createElement("p");
        p.textContent = pText;
        p.style.marginBottom = "20px";
        aboutContainer.appendChild(p);
      });
    }

    // Contact metadata
    const contactMeta = document.getElementById("contact-meta");
    if (contactMeta) {
      contactMeta.replaceChildren();
      const items = [
        { label: "Direct Inquiries", value: brand.email || "contact@savitech.studio", href: "mailto:" + (brand.email || "contact@savitech.studio") },
        { label: "Phone / WhatsApp", value: brand.phone || "+91 91219 93498", href: "tel:" + (brand.phone ? brand.phone.replace(/\s+/g, '') : "+919121993498") },
        { label: "Studio Location", value: brand.location || "Hyderabad · Worldwide Remote", href: null }
      ];

      items.forEach(item => {
        const wrap = document.createElement("div");
        wrap.className = "meta-item";
        const dt = document.createElement("dt");
        dt.textContent = item.label;
        const dd = document.createElement("dd");
        if (item.href) {
          const a = document.createElement("a");
          a.href = item.href;
          a.textContent = item.value;
          dd.appendChild(a);
        } else {
          dd.textContent = item.value;
        }
        wrap.append(dt, dd);
        contactMeta.appendChild(wrap);
      });
    }
  }

  // Render Projects Grid (NO GITHUB LINKS - PRIVACY FIRST, ONLY LIVE AND PREVIEW URLS)
  function renderProjects(projects, targetId) {
    const container = document.getElementById(targetId || "projects-grid");
    if (!container || !Array.isArray(projects)) return;

    container.replaceChildren();
    projects.forEach(proj => {
      const card = document.createElement("article");
      card.className = "project-card reveal";

      // Top logo / category
      const top = document.createElement("div");
      top.className = "project-card-top";

      const logoWrap = document.createElement("div");
      logoWrap.className = "project-logo-wrap";
      if (proj.logo) {
        const img = document.createElement("img");
        img.src = proj.logo;
        img.alt = proj.client + " logo";
        img.className = "project-logo-img";
        logoWrap.appendChild(img);
      } else {
        const span = document.createElement("span");
        span.style.fontFamily = "var(--font-mono)";
        span.style.fontWeight = "700";
        span.style.fontSize = "1.2rem";
        span.style.color = "#FFFFFF";
        span.textContent = proj.title;
        logoWrap.appendChild(span);
      }

      const tag = document.createElement("span");
      tag.className = "project-tag";
      tag.textContent = proj.category;
      top.append(logoWrap, tag);

      // Body info
      const body = document.createElement("div");
      const title = document.createElement("h3");
      title.className = "project-title";
      title.textContent = proj.title;

      const summary = document.createElement("p");
      summary.className = "project-summary";
      summary.textContent = proj.description || proj.summary;

      // Metrics
      const metricsWrap = document.createElement("div");
      metricsWrap.className = "project-metrics";
      if (Array.isArray(proj.metrics)) {
        proj.metrics.forEach(m => {
          const pill = document.createElement("span");
          pill.className = "metric-pill";
          pill.textContent = "✦ " + m;
          metricsWrap.appendChild(pill);
        });
      }

      // Tech tags
      const techWrap = document.createElement("div");
      techWrap.className = "project-tech";
      if (Array.isArray(proj.tech)) {
        proj.tech.forEach(t => {
          const tSpan = document.createElement("span");
          tSpan.className = "tech-tag";
          tSpan.textContent = t;
          techWrap.appendChild(tSpan);
        });
      }

      body.append(title, summary, metricsWrap, techWrap);

      // Footer links: only live production or sandbox preview, NEVER github
      const foot = document.createElement("div");
      foot.className = "project-footer";

      const links = document.createElement("div");
      links.className = "project-links";

      if (proj.liveUrl) {
        const live = document.createElement("a");
        live.href = proj.liveUrl;
        live.target = "_blank";
        live.rel = "noopener noreferrer";
        live.className = "link-out";
        live.innerHTML = "Visit Flagship ↗";
        links.appendChild(live);
      }

      if (proj.previewUrl && proj.previewUrl !== proj.liveUrl) {
        const prev = document.createElement("a");
        prev.href = proj.previewUrl;
        prev.target = "_blank";
        prev.rel = "noopener noreferrer";
        prev.className = "link-preview";
        prev.innerHTML = "Interactive Web Preview ↗";
        links.appendChild(prev);
      }

      const clientLabel = document.createElement("span");
      clientLabel.style.fontSize = "0.75rem";
      clientLabel.style.color = "var(--text-dim)";
      clientLabel.style.fontFamily = "var(--font-mono)";
      clientLabel.textContent = proj.client;

      foot.append(links, clientLabel);

      card.append(top, body, foot);
      container.appendChild(card);
    });

    observeReveals();
  }

  // Render Services
  function renderServices(services) {
    const grid = document.getElementById("service-grid");
    if (!grid || !Array.isArray(services)) return;

    grid.replaceChildren();
    services.forEach((s, idx) => {
      const card = document.createElement("article");
      card.className = "service-card reveal";

      const idxSpan = document.createElement("span");
      idxSpan.className = "index";
      idxSpan.textContent = "0" + (idx + 1) + " · ATELIER CAPABILITY";

      const title = document.createElement("h3");
      title.textContent = s.title;

      const p = document.createElement("p");
      p.textContent = s.detail || s.summary;

      card.append(idxSpan, title, p);
      grid.appendChild(card);
    });

    observeReveals();
  }

  // Render Process Steps
  function renderSteps(steps) {
    const grid = document.getElementById("steps-grid");
    if (!grid || !Array.isArray(steps)) return;

    grid.replaceChildren();
    steps.forEach(step => {
      const card = document.createElement("article");
      card.className = "step-card reveal";

      const title = document.createElement("h3");
      title.textContent = step.title;

      const p = document.createElement("p");
      p.textContent = step.text;

      card.append(title, p);
      grid.appendChild(card);
    });

    observeReveals();
  }

  // Render Team
  function renderTeam(team) {
    const grid = document.getElementById("team-grid");
    if (!grid || !Array.isArray(team)) return;

    grid.replaceChildren();
    team.forEach(member => {
      const card = document.createElement("article");
      card.className = "team-card reveal";

      const avatar = document.createElement("div");
      avatar.className = "avatar-badge";
      avatar.textContent = member.initials || "SV";

      const info = document.createElement("div");
      const name = document.createElement("h3");
      name.textContent = member.name;

      const role = document.createElement("p");
      role.className = "role";
      role.textContent = member.role;

      const bio = document.createElement("p");
      bio.className = "bio";
      bio.textContent = member.bio;

      info.append(name, role, bio);
      card.append(avatar, info);
      grid.appendChild(card);
    });

    observeReveals();
  }

  // Setup Mobile Nav Toggle with Lock
  function setupNav() {
    const menuBtn = document.getElementById("menu-btn");
    const nav = document.getElementById("nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      // Close when clicking link on mobile
      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          nav.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }

    // Set active link
    const page = document.body.dataset.page || "home";
    const activeLink = document.querySelector(`.nav a[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add("active");
  }

  // Setup Contact Form
  function setupContactForm() {
    const form = document.getElementById("contact-form");
    const statusBox = document.getElementById("form-status");
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");
      const interest = formData.get("interest");
      const message = formData.get("message");

      if (!name || !email || !message) {
        alert("Please complete all required fields.");
        return;
      }

      try {
        const leads = JSON.parse(localStorage.getItem("savi_inquiries") || "[]");
        leads.push({ name, email, interest, message, date: new Date().toISOString() });
        localStorage.setItem("savi_inquiries", JSON.stringify(leads));
      } catch (err) {
        console.warn("Storage unavailable", err);
      }

      // Direct founder mailto fallback
      const subject = encodeURIComponent(`[SaVi Tech Project Inquiry] - ${interest} from ${name}`);
      const body = encodeURIComponent(`Hi Sahera & Vijay,\n\nName: ${name}\nEmail: ${email}\nLooking for: ${interest}\n\nProject Scope & Goals:\n${message}\n\nSent via savitech.studio`);
      window.location.href = `mailto:kbskumar331@gmail.com,contact@savitech.studio?subject=${subject}&body=${body}`;

      if (statusBox) {
        statusBox.textContent = `Thank you, ${name}. Your project inquiry has been queued directly to Sahera & Vijay. We guarantee a reply within 24 hours.`;
        statusBox.className = "form-status success";
        statusBox.style.display = "block";
      }

      form.reset();
    });
  }

  // Viewport Reveal Observer
  let observer;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => observer.observe(el));
  }

  // Lightweight Inertial Smooth Scrolling (Lenis Integration with Native Mobile Bypass)
  function initSmoothScroll() {
    // On touch devices or reduced motion, native hardware momentum is best for 60fps
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return; // Keep mobile 100% native 60-120fps

    // Dynamically load Lenis from unpkg for zero-bundle weight
    const script = document.createElement("script");
    script.src = "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js";
    script.onload = () => {
      if (typeof window.Lenis === "function") {
        const lenis = new window.Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false // Crucial for mobile performance
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    };
    document.head.appendChild(script);
  }

  // Init
  async function init() {
    setupNav();
    setupContactForm();
    initSmoothScroll();

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mark existing static cards for reveal
    document.querySelectorAll(".project-card, .service-card, .step-card, .team-card, .inbound-box, .studio-spec-box").forEach(el => {
      el.classList.add("reveal");
    });
    observeReveals();

    try {
      const res = await fetch("content.json");
      if (res.ok) {
        const data = await res.json();
        applyBrand(data.brand);
        renderProjects(data.projects);
        renderServices(data.services);
        renderSteps(data.steps);
        renderTeam(data.team);
      }
    } catch (err) {
      console.warn("Failed to load content.json, relying on static markup", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
