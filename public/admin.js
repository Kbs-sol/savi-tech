(function () {
  const KEY = "savi-content-v1";
  const AUTH = "savi-admin-auth";
  const PASS = "savi-admin-pass";

  function load() {
    const base = JSON.parse(JSON.stringify(window.SAVI_DEFAULT));
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return base;
      const saved = JSON.parse(raw);
      return {
        brand: Object.assign({}, base.brand, saved.brand || {}),
        services: Array.isArray(saved.services) ? saved.services : base.services,
        steps: Array.isArray(saved.steps) ? saved.steps : base.steps,
        team: Array.isArray(saved.team) ? saved.team : base.team,
        inquiries: Array.isArray(saved.inquiries) ? saved.inquiries : []
      };
    } catch (e) {
      return base;
    }
  }

  function persist(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  if (!localStorage.getItem(PASS)) {
    localStorage.setItem(PASS, "savi-admin");
  }

  const loginCard = document.getElementById("login-card");
  const dash = document.getElementById("dash");

  function showDash() {
    loginCard.classList.add("hidden");
    dash.classList.remove("hidden");
    renderAll();
  }

  if (sessionStorage.getItem(AUTH) === "1") showDash();

  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.getElementById("password").value;
    const note = document.getElementById("login-note");
    if (value && value === localStorage.getItem(PASS)) {
      sessionStorage.setItem(AUTH, "1");
      note.textContent = "";
      showDash();
    } else {
      note.textContent = "That password doesn’t match.";
    }
  });

  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem(AUTH);
    location.reload();
  });

  document.querySelectorAll(".side-nav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".side-nav button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll("[id^='panel-']").forEach((p) => p.classList.add("hidden"));
      document.getElementById("panel-" + btn.dataset.panel).classList.remove("hidden");
    });
  });

  function field(label, value, key, multiline) {
    const wrap = document.createElement("label");
    wrap.className = "field";
    wrap.append(document.createTextNode(label));
    const input = document.createElement(multiline ? "textarea" : "input");
    if (multiline) input.rows = 3;
    input.value = value || "";
    input.dataset.key = key;
    wrap.appendChild(input);
    return wrap;
  }

  function renderAll() {
    renderCopy();
    renderList("services", "Services", [
      ["title", "Title", false],
      ["summary", "Summary", true],
      ["detail", "Detail", true]
    ]);
    renderList("steps", "Process", [
      ["title", "Title", false],
      ["text", "Text", true]
    ]);
    renderList("team", "Team", [
      ["name", "Name", false],
      ["role", "Role", false],
      ["initials", "Initials", false],
      ["bio", "Note", true]
    ]);
    renderInquiries();
    renderSettings();
  }

  function renderCopy() {
    const data = load();
    const panel = document.getElementById("panel-copy");
    panel.innerHTML = "<h2>Site copy</h2><p>These fields appear across the public pages.</p>";
    const form = document.createElement("form");
    const keys = [
      ["name", "Brand name"],
      ["legal", "Legal name"],
      ["tagline", "Tagline"],
      ["eyebrow", "Eyebrow"],
      ["heroTitle", "Hero title"],
      ["heroLede", "Hero text", true],
      ["heroPrimary", "Primary button"],
      ["heroSecondary", "Secondary button"],
      ["cardLine", "Card line"],
      ["cardServices", "Card services"],
      ["bandLabel", "Band label"],
      ["bandText", "Band text", true],
      ["servicesTitle", "Services heading"],
      ["servicesIntro", "Services intro", true],
      ["aboutTitle", "About heading"],
      ["aboutNote", "Name note", true],
      ["approachTitle", "Process heading"],
      ["teamTitle", "Team heading"],
      ["teamIntro", "Team intro", true],
      ["contactTitle", "Contact heading"],
      ["contactIntro", "Contact intro", true],
      ["email", "Email"],
      ["phone", "Phone"],
      ["location", "Location"],
      ["footerLegal", "Footer legal line"]
    ];
    keys.forEach(([key, label, multi]) => {
      form.appendChild(field(label, data.brand[key], key, !!multi));
    });
    const about = document.createElement("label");
    about.className = "field";
    about.append(document.createTextNode("About paragraphs (one per line)"));
    const area = document.createElement("textarea");
    area.rows = 6;
    area.dataset.key = "aboutParagraphs";
    area.value = (data.brand.aboutParagraphs || []).join("\n");
    about.appendChild(area);
    form.appendChild(about);

    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-cyan";
    saveBtn.type = "submit";
    saveBtn.textContent = "Save copy";
    form.appendChild(saveBtn);
    const toast = document.createElement("p");
    toast.className = "toast";
    form.appendChild(toast);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const next = load();
      form.querySelectorAll("[data-key]").forEach((input) => {
        if (input.dataset.key === "aboutParagraphs") {
          next.brand.aboutParagraphs = input.value.split("\n").map((s) => s.trim()).filter(Boolean);
        } else {
          next.brand[input.dataset.key] = input.value.trim();
        }
      });
      persist(next);
      toast.textContent = "Saved. Refresh the public site to see it.";
    });
    panel.appendChild(form);
  }

  function blankItem(kind) {
    const id = kind + "-" + Date.now();
    if (kind === "services") return { id, title: "New service", summary: "", detail: "" };
    if (kind === "steps") return { id, title: "New step", text: "" };
    return { id, name: "New person", role: "", initials: "", bio: "" };
  }

  function renderList(kind, title, schema) {
    const data = load();
    const panel = document.getElementById("panel-" + kind);
    panel.innerHTML = "";
    const h = document.createElement("h2");
    h.textContent = title;
    panel.appendChild(h);
    const list = document.createElement("div");
    data[kind].forEach((item, index) => {
      const card = document.createElement("form");
      card.className = "item-card";
      schema.forEach(([key, label, multi]) => card.appendChild(field(label, item[key], key, multi)));
      const actions = document.createElement("div");
      actions.className = "row-actions";
      const saveBtn = document.createElement("button");
      saveBtn.className = "btn btn-cyan";
      saveBtn.type = "submit";
      saveBtn.textContent = "Save";
      const up = document.createElement("button");
      up.type = "button";
      up.className = "mini";
      up.textContent = "Up";
      const down = document.createElement("button");
      down.type = "button";
      down.className = "mini";
      down.textContent = "Down";
      const del = document.createElement("button");
      del.type = "button";
      del.className = "danger";
      del.textContent = "Delete";
      actions.append(saveBtn, up, down, del);
      card.appendChild(actions);
      card.addEventListener("submit", (e) => {
        e.preventDefault();
        const next = load();
        const target = next[kind][index];
        card.querySelectorAll("[data-key]").forEach((input) => {
          target[input.dataset.key] = input.value.trim();
        });
        persist(next);
        renderList(kind, title, schema);
      });
      up.addEventListener("click", () => move(kind, index, -1, title, schema));
      down.addEventListener("click", () => move(kind, index, 1, title, schema));
      del.addEventListener("click", () => {
        if (!confirm("Delete this item?")) return;
        const next = load();
        next[kind].splice(index, 1);
        persist(next);
        renderList(kind, title, schema);
      });
      list.appendChild(card);
    });
    panel.appendChild(list);
    const add = document.createElement("button");
    add.className = "btn btn-ghost";
    add.type = "button";
    add.textContent = "Add";
    add.style.color = "#122033";
    add.style.borderColor = "#d7e0ea";
    add.addEventListener("click", () => {
      const next = load();
      next[kind].push(blankItem(kind));
      persist(next);
      renderList(kind, title, schema);
    });
    panel.appendChild(add);
  }

  function move(kind, index, dir, title, schema) {
    const next = load();
    const j = index + dir;
    if (j < 0 || j >= next[kind].length) return;
    const [item] = next[kind].splice(index, 1);
    next[kind].splice(j, 0, item);
    persist(next);
    renderList(kind, title, schema);
  }

  function renderInquiries() {
    const data = load();
    const panel = document.getElementById("panel-inquiries");
    panel.innerHTML = "<h2>Messages</h2>";
    if (!data.inquiries.length) {
      const p = document.createElement("p");
      p.textContent = "No messages yet. Submissions from the contact form on this browser appear here.";
      panel.appendChild(p);
      return;
    }
    data.inquiries.forEach((inq, index) => {
      const card = document.createElement("article");
      card.className = "item-card";
      const h = document.createElement("strong");
      h.textContent = inq.name + " · " + inq.email;
      const meta = document.createElement("p");
      meta.style.color = "#4d5d72";
      meta.textContent = (inq.interest || "General") + " · " + new Date(inq.createdAt).toLocaleString() + " · " + (inq.status || "new");
      const msg = document.createElement("p");
      msg.textContent = inq.message;
      const actions = document.createElement("div");
      actions.className = "row-actions";
      const toggle = document.createElement("button");
      toggle.className = "mini";
      toggle.type = "button";
      toggle.textContent = inq.status === "read" ? "Mark new" : "Mark read";
      toggle.addEventListener("click", () => {
        const next = load();
        next.inquiries[index].status = next.inquiries[index].status === "read" ? "new" : "read";
        persist(next);
        renderInquiries();
      });
      const del = document.createElement("button");
      del.className = "danger";
      del.type = "button";
      del.textContent = "Delete";
      del.addEventListener("click", () => {
        const next = load();
        next.inquiries.splice(index, 1);
        persist(next);
        renderInquiries();
      });
      const reply = document.createElement("a");
      reply.className = "mini";
      reply.href = "mailto:" + encodeURIComponent(inq.email) + "?subject=" + encodeURIComponent("SaVi Tech");
      reply.textContent = "Reply by email";
      actions.append(toggle, reply, del);
      card.append(h, meta, msg, actions);
      panel.appendChild(card);
    });
  }

  function renderSettings() {
    const panel = document.getElementById("panel-settings");
    panel.innerHTML = "<h2>Settings</h2>";
    const form = document.createElement("form");
    form.appendChild(field("New password", "", "pass", false));
    const btn = document.createElement("button");
    btn.className = "btn btn-cyan";
    btn.type = "submit";
    btn.textContent = "Update password";
    form.appendChild(btn);
    const toast = document.createElement("p");
    toast.className = "toast";
    form.appendChild(toast);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = form.querySelector("input").value.trim();
      if (value.length < 6) {
        toast.textContent = "Use at least 6 characters.";
        toast.style.color = "#9a3412";
        return;
      }
      localStorage.setItem(PASS, value);
      toast.style.color = "";
      toast.textContent = "Password updated for this browser.";
      form.reset();
    });
    panel.appendChild(form);

    const reset = document.createElement("button");
    reset.className = "danger";
    reset.type = "button";
    reset.textContent = "Reset all content to defaults";
    reset.style.marginTop = "18px";
    reset.addEventListener("click", () => {
      if (!confirm("This clears edits and messages in this browser.")) return;
      localStorage.removeItem(KEY);
      renderAll();
    });
    panel.appendChild(reset);
    const note = document.createElement("p");
    note.style.color = "#4d5d72";
    note.textContent = "Edits are stored in this browser only. They are not sent to a server. Export is the JSON below — keep a copy if you change machines.";
    panel.appendChild(note);
    const dump = document.createElement("textarea");
    dump.rows = 8;
    dump.readOnly = true;
    dump.value = JSON.stringify(load(), null, 2);
    dump.style.width = "100%";
    panel.appendChild(dump);
  }
})();
