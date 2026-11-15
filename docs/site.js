(function () {
  "use strict";

  // ── Helpers ──
  function text(id, value) {
    const el = document.getElementById(id);
    if (el && value != null && value !== "") el.textContent = value;
  }

  // ── Apply brand copy from content.json ──
  function applyBrand(brand) {
    if (!brand) return;
    text("hero-lede", brand.heroLede);
    text("hero-tagline", brand.tagline);
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
        p.style.marginBottom = "22px";
        aboutContainer.appendChild(p);
      });
    }

    // Contact meta — build from brand data
    const contactMeta = document.getElementById("contact-meta");
    if (contactMeta) {
      const wa = (brand.phone || "+91 83330 66370").replace(/[\s+]/g, '');
      const items = [
        { label: "Email", value: brand.email || "contact@savitech.studio", href: "mailto:" + (brand.email || "contact@savitech.studio") },
        { label: "WhatsApp & Phone", value: brand.phone || "+91 83330 66370", href: "tel:+" + wa },
        { label: "Location", value: brand.location || "Hyderabad · Worldwide Remote", href: null }
      ];

      contactMeta.replaceChildren();
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

  // ── Render Projects (privacy-first: NO github links ever) ──
  function renderProjects(projects, targetId) {
    const container = document.getElementById(targetId || "projects-grid");
    if (!container || !Array.isArray(projects)) return;

    // Only replace if the container is empty (let static HTML take priority)
    if (container.children.length > 0) return;

    container.replaceChildren();
    projects.forEach(proj => {
      const card = document.createElement("article");
      card.className = "project-card reveal";

      // Visual header
      const visual = document.createElement("div");
      visual.className = "project-visual";
      const accent = proj.accent || "#102444";
      visual.style.background = `linear-gradient(135deg, ${accent} 0%, #07111F 100%)`;

      const inner = document.createElement("div");
      inner.className = "project-visual-inner";

      const name = document.createElement("div");
      name.textContent = proj.title;
      name.style.cssText = "font-size:1.3rem;font-weight:700;color:#fff;font-family:var(--font);";

      const cat = document.createElement("div");
      cat.className = "project-visual-name";
      cat.textContent = proj.category.toLowerCase();

      inner.append(name, cat);
      visual.appendChild(inner);

      // Body
      const body = document.createElement("div");
      body.className = "project-body";

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
        const sp = document.createElement("span");
        sp.style.cssText = "font-size:0.95rem;font-weight:600;color:var(--paper);font-family:var(--font);";
        sp.textContent = proj.client;
        logoWrap.appendChild(sp);
      }

      const tag = document.createElement("span");
      tag.className = "project-tag";
      tag.textContent = proj.category;
      top.append(logoWrap, tag);

      const title = document.createElement("h3");
      title.className = "project-title";
      title.textContent = proj.title;

      const summary = document.createElement("p");
      summary.className = "project-summary";
      summary.textContent = proj.summary;

      const metricsWrap = document.createElement("div");
      metricsWrap.className = "project-metrics";
      (proj.metrics || []).forEach(m => {
        const pill = document.createElement("span");
        pill.className = "metric-pill";
        pill.textContent = "✦ " + m;
        metricsWrap.appendChild(pill);
      });

      const techWrap = document.createElement("div");
      techWrap.className = "project-tech";
      (proj.tech || []).forEach(t => {
        const tSpan = document.createElement("span");
        tSpan.className = "tech-tag";
        tSpan.textContent = t;
        techWrap.appendChild(tSpan);
      });

      body.append(top, title, summary, metricsWrap, techWrap);

      // Footer links — NEVER show github links
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
        live.textContent = "Visit Live ↗";
        links.appendChild(live);
      }

      if (proj.previewUrl && proj.previewUrl !== proj.liveUrl) {
        const prev = document.createElement("a");
        prev.href = proj.previewUrl;
        prev.target = "_blank";
        prev.rel = "noopener noreferrer";
        prev.className = "link-preview";
        prev.textContent = "Interactive Preview ↗";
        links.appendChild(prev);
      }

      const clientLabel = document.createElement("span");
      clientLabel.style.cssText = "font-size:0.72rem;color:var(--muted);font-family:var(--mono);";
      clientLabel.textContent = proj.client;

      foot.append(links, clientLabel);
      body.appendChild(foot);

      card.append(visual, body);
      container.appendChild(card);
    });

    observeReveals();
  }

  // ── Render Services as numbered editorial list ──
  function renderServiceList(services) {
    // Try the new service-list container first
    const list = document.getElementById("service-list");
    const grid = document.getElementById("service-grid");
    const target = list || grid;
    if (!target || !Array.isArray(services)) return;
    if (target.children.length > 0) return; // static HTML takes priority

    target.replaceChildren();
    services.forEach((s, idx) => {
      const row = document.createElement("div");
      row.className = "service-row" + (s.highlight ? " highlight-row" : "");

      const num = document.createElement("span");
      num.className = "service-num";
      num.textContent = String(idx + 1).padStart(2, "0");

      const icon = document.createElement("span");
      icon.className = "service-icon";
      icon.textContent = s.icon || "✦";

      const info = document.createElement("div");
      info.className = "service-info";

      const title = document.createElement("h3");
      title.textContent = s.title;
      if (s.highlight) {
        const badge = document.createElement("span");
        badge.className = "service-whatsapp-badge";
        badge.textContent = "Popular";
        title.appendChild(badge);
      }

      const summary = document.createElement("p");
      summary.className = "summary";
      summary.textContent = s.summary;

      const detail = document.createElement("p");
      detail.className = "detail";
      detail.textContent = s.detail || "";

      const toggle = document.createElement("button");
      toggle.className = "service-toggle";
      toggle.setAttribute("aria-label", "Learn more about " + s.title);
      toggle.innerHTML = 'Learn more <span class="arrow">›</span>';
      toggle.addEventListener("click", () => {
        row.classList.toggle("open");
      });

      info.append(title, summary, detail, toggle);
      row.append(num, icon, info);
      target.appendChild(row);
    });
  }

  // ── Render Process Steps ──
  function renderSteps(steps) {
    const grid = document.getElementById("steps-grid");
    if (!grid || !Array.isArray(steps)) return;
    if (grid.children.length > 0) return;

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

  // ── Render Team ──
  function renderTeam(team) {
    const grid = document.getElementById("team-grid");
    if (!grid || !Array.isArray(team)) return;
    if (grid.children.length > 0) return;

    grid.replaceChildren();
    team.forEach(member => {
      const card = document.createElement("article");
      card.className = "team-card reveal";

      // Founder mark with initial
      const mark = document.createElement("div");
      mark.className = "founder-mark";
      const initial = (member.initials || member.name || "?")[0];
      mark.innerHTML = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="24" font-family="'Outfit',system-ui,sans-serif" font-size="22" font-weight="800" fill="#3EE0FF">${initial}</text>
      </svg>`;

      const info = document.createElement("div");

      const name = document.createElement("h3");
      name.textContent = member.name;

      const role = document.createElement("p");
      role.className = "role";
      role.textContent = member.role;

      const discipline = document.createElement("p");
      discipline.className = "discipline";
      discipline.textContent = member.discipline || "";

      const bio = document.createElement("p");
      bio.className = "bio";
      bio.textContent = member.bio;

      info.append(name, role, discipline, bio);
      card.append(mark, info);
      grid.appendChild(card);
    });
    observeReveals();
  }

  // ── Mobile Nav ──
  function setupNav() {
    const menuBtn = document.getElementById("menu-btn");
    const nav = document.getElementById("nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
        // Animate hamburger to X
        const spans = menuBtn.querySelectorAll("span");
        if (isOpen) {
          spans[0].style.transform = "translateY(6.5px) rotate(45deg)";
          spans[1].style.opacity = "0";
          spans[2].style.transform = "translateY(-6.5px) rotate(-45deg)";
        } else {
          spans[0].style.transform = "";
          spans[1].style.opacity = "";
          spans[2].style.transform = "";
        }
      });

      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          nav.classList.remove("open");
          document.body.style.overflow = "";
          const spans = menuBtn.querySelectorAll("span");
          spans[0].style.transform = "";
          spans[1].style.opacity = "";
          spans[2].style.transform = "";
        });
      });
    }

    // Active link highlight
    const page = document.body.dataset.page || "home";
    const activeLink = document.querySelector(`.nav a[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add("active");
  }

  // ── Service Toggle (for static HTML rows) ──
  function setupServiceToggles() {
    document.querySelectorAll(".service-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const row = btn.closest(".service-row");
        if (row) row.classList.toggle("open");
      });
    });
  }

  // ── Contact Form ──
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
        alert("Please fill in your name, email, and project description.");
        return;
      }

      // Store locally
      try {
        const leads = JSON.parse(localStorage.getItem("savi_inquiries") || "[]");
        leads.push({ name, email, interest, message, date: new Date().toISOString() });
        localStorage.setItem("savi_inquiries", JSON.stringify(leads));
      } catch (err) { /* silent */ }

      // mailto fallback — direct to founders
      const subject = encodeURIComponent(`[SaVi Tech] ${interest} Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hi Sahera & Vijay,\n\nName: ${name}\nEmail: ${email}\nLooking for: ${interest}\n\nProject Details:\n${message}\n\n— Sent via savitech.studio`
      );
      window.location.href = `mailto:contact@savitech.studio?subject=${subject}&body=${body}`;

      if (statusBox) {
        statusBox.textContent = `Thank you, ${name}! Your message has been sent to Sahera & Vijay. We'll reply within 24 hours.`;
        statusBox.className = "form-status success";
        statusBox.style.display = "block";
      }
      form.reset();
    });
  }

  // ── Intersection Observer for reveals ──
  let observer;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => el.classList.add("is-visible"));
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
      }, { threshold: 0.1, rootMargin: "0px 0px -48px 0px" });
    }
    document.querySelectorAll(".reveal:not(.is-visible), .reveal-stagger:not(.is-visible)").forEach(el => observer.observe(el));
  }

  // ── Lenis smooth scroll (desktop only, touch bypass) ──
  function initSmoothScroll() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js";
    script.onload = () => {
      if (typeof window.Lenis === "function") {
        const lenis = new window.Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          smoothTouch: false
        });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
      }
    };
    document.head.appendChild(script);
  }

  // ── Init ──
  async function init() {
    // Year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setupNav();
    setupServiceToggles();
    setupContactForm();
    initSmoothScroll();
    observeReveals();

    // Load content.json
    try {
      const res = await fetch("content.json");
      if (res.ok) {
        const data = await res.json();
        applyBrand(data.brand);
        renderProjects(data.projects);
        renderServiceList(data.services);
        renderSteps(data.steps);
        renderTeam(data.team);
        observeReveals();
      }
    } catch (err) {
      console.warn("content.json not loaded, static HTML is active.", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
