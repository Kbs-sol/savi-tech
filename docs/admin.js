(function () {
  const DRAFT_KEY = "savi-draft";
  const PASS_KEY = "savi-admin-pass";
  const AUTH_KEY = "savi-admin-auth";
  const TOKEN_KEY = "savi-gh-token";
  const INBOX_KEY = "savi-inbox";
  const REPO = {
    owner: "Kbs-sol",
    repo: "savi-technologies",
    branch: "main",
    path: "docs/content.json"
  };

  const COPY_FIELDS = [
    ["name", "Brand name"],
    ["legal", "Business name"],
    ["tagline", "Tagline"],
    ["heroTitle", "Home headline"],
    ["heroLede", "Home introduction", true],
    ["cardLine", "Identity card line"],
    ["cardServices", "Identity card services"],
    ["bandText", "Studio summary", true],
    ["aboutTitle", "About heading"],
    ["aboutNote", "Name note", true],
    ["servicesTitle", "Services heading"],
    ["servicesIntro", "Services introduction", true],
    ["approachTitle", "Process heading"],
    ["teamTitle", "Team heading"],
    ["teamIntro", "Team introduction", true],
    ["contactTitle", "Contact heading"],
    ["contactIntro", "Contact introduction", true],
    ["email", "Email"],
    ["phone", "Phone"],
    ["location", "Location"]
  ];

  if (!localStorage.getItem(PASS_KEY)) localStorage.setItem(PASS_KEY, "savi-admin");

  const loginCard = document.getElementById("login-card");
  const dash = document.getElementById("dash");

  function showDash() {
    loginCard.classList.add("hidden");
    dash.classList.remove("hidden");
    renderAll();
  }

  if (sessionStorage.getItem(AUTH_KEY) === "1") showDash();

  document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.getElementById("login-note");
    if (document.getElementById("password").value === localStorage.getItem(PASS_KEY)) {
      sessionStorage.setItem(AUTH_KEY, "1");
      note.textContent = "";
      showDash();
    } else {
      note.textContent = "That password does not match.";
    }
  });

  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem(AUTH_KEY);
    location.href = "admin.html";
  });

  document.querySelectorAll(".side-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".side-nav button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.querySelectorAll("[id^='panel-']").forEach((panel) => panel.classList.add("hidden"));
      document.getElementById("panel-" + button.dataset.panel).classList.remove("hidden");
    });
  });

  async function loadPublished() {
    const response = await fetch("content.json?ts=" + Date.now());
    if (!response.ok) throw new Error("Could not read content.json");
    return response.json();
  }

  function loadDraft() {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function saveDraft(data) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  }

  async function current() {
    return loadDraft() || loadPublished();
  }

  function field(label, value, key, multiline) {
    const wrap = document.createElement("label");
    wrap.className = "field";
    wrap.append(document.createTextNode(label));
    const input = document.createElement(multiline ? "textarea" : "input");
    if (!multiline) input.type = "text";
    if (multiline) input.rows = 3;
    input.value = value || "";
    input.dataset.key = key;
    wrap.appendChild(input);
    return wrap;
  }

  function renderAll() {
    renderCopy();
    renderCollection("services", "Services", [
      ["title", "Title", false],
      ["summary", "Summary", true],
      ["detail", "Detail", true]
    ]);
    renderCollection("steps", "Process", [
      ["title", "Title", false],
      ["text", "Text", true]
    ]);
    renderCollection("team", "Team", [
      ["name", "Name", false],
      ["role", "Role", false],
      ["initials", "Initials", false],
      ["bio", "Note", true]
    ]);
    renderInbox();
    renderPublish();
  }

  async function renderCopy() {
    const data = await current();
    const panel = document.getElementById("panel-copy");
    panel.replaceChildren();
    const heading = document.createElement("h2");
    heading.textContent = "Site copy";
    const help = document.createElement("p");
    help.className = "help";
    help.textContent = "These lines appear on the public pages. Save a draft, preview it, then publish when it looks right.";
    panel.append(heading, help);
    const form = document.createElement("form");
    COPY_FIELDS.forEach(([key, label, multiline]) => {
      form.appendChild(field(label, data.brand[key], key, !!multiline));
    });
    const about = document.createElement("label");
    about.className = "field";
    about.append(document.createTextNode("About paragraphs, one per line"));
    const area = document.createElement("textarea");
    area.rows = 6;
    area.dataset.key = "aboutParagraphs";
    area.value = (data.brand.aboutParagraphs || []).join("\n");
    about.appendChild(area);
    form.appendChild(about);
    const button = document.createElement("button");
    button.className = "btn btn-cyan";
    button.type = "submit";
    button.textContent = "Save draft";
    const toast = document.createElement("p");
    toast.className = "toast";
    form.append(button, toast);
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const next = await current();
      form.querySelectorAll("[data-key]").forEach((input) => {
        if (input.dataset.key === "aboutParagraphs") {
          next.brand.aboutParagraphs = input.value.split("\n").map((line) => line.trim()).filter(Boolean);
        } else {
          next.brand[input.dataset.key] = input.value.trim();
        }
      });
      saveDraft(next);
      toast.textContent = "Draft saved in this browser.";
    });
    panel.appendChild(form);
  }

  function blank(kind) {
    const id = kind.slice(0, 3) + "-" + Date.now();
    if (kind === "services") return { id, title: "New service", summary: "", detail: "" };
    if (kind === "steps") return { id, title: "New step", text: "" };
    return { id, name: "New person", role: "", initials: "", bio: "" };
  }

  async function renderCollection(kind, title, schema) {
    const data = await current();
    const panel = document.getElementById("panel-" + kind);
    panel.replaceChildren();
    const heading = document.createElement("h2");
    heading.textContent = title;
    panel.appendChild(heading);
    (data[kind] || []).forEach((item, index) => {
      const form = document.createElement("form");
      form.className = "item-card";
      schema.forEach(([key, label, multiline]) => form.appendChild(field(label, item[key], key, multiline)));
      const actions = document.createElement("div");
      actions.className = "row-actions";
      const save = button("Save", "btn btn-cyan", "submit");
      const up = button("Up", "mini", "button");
      const down = button("Down", "mini", "button");
      const remove = button("Delete", "danger", "button");
      actions.append(save, up, down, remove);
      form.appendChild(actions);
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const next = await current();
        schema.forEach(([key]) => {
          next[kind][index][key] = form.querySelector("[data-key='" + key + "']").value.trim();
        });
        saveDraft(next);
        renderCollection(kind, title, schema);
      });
      up.addEventListener("click", () => move(kind, index, -1, title, schema));
      down.addEventListener("click", () => move(kind, index, 1, title, schema));
      remove.addEventListener("click", async () => {
        if (!confirm("Delete this item?")) return;
        const next = await current();
        next[kind].splice(index, 1);
        saveDraft(next);
        renderCollection(kind, title, schema);
      });
      panel.appendChild(form);
    });
    const add = button("Add", "mini", "button");
    add.addEventListener("click", async () => {
      const next = await current();
      next[kind].push(blank(kind));
      saveDraft(next);
      renderCollection(kind, title, schema);
    });
    panel.appendChild(add);
  }

  async function move(kind, index, direction, title, schema) {
    const next = await current();
    const target = index + direction;
    if (target < 0 || target >= next[kind].length) return;
    const [item] = next[kind].splice(index, 1);
    next[kind].splice(target, 0, item);
    saveDraft(next);
    renderCollection(kind, title, schema);
  }

  function button(label, className, type) {
    const el = document.createElement("button");
    el.type = type;
    el.className = className;
    el.textContent = label;
    return el;
  }

  function renderInbox() {
    const panel = document.getElementById("panel-inbox");
    panel.replaceChildren();
    const heading = document.createElement("h2");
    heading.textContent = "Messages";
    const help = document.createElement("p");
    help.className = "help";
    help.textContent = "Contact form notes are stored in this browser. They are not sent to a server.";
    panel.append(heading, help);
    const inbox = JSON.parse(localStorage.getItem(INBOX_KEY) || "[]");
    if (!inbox.length) {
      const empty = document.createElement("p");
      empty.textContent = "No messages yet.";
      panel.appendChild(empty);
      return;
    }
    inbox.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "item-card";
      const title = document.createElement("strong");
      title.textContent = item.name + " · " + item.email;
      const meta = document.createElement("p");
      meta.className = "help";
      meta.textContent = (item.interest || "General") + " · " + new Date(item.createdAt).toLocaleString();
      const message = document.createElement("p");
      message.textContent = item.message;
      const remove = button("Delete", "danger", "button");
      remove.addEventListener("click", () => {
        inbox.splice(index, 1);
        localStorage.setItem(INBOX_KEY, JSON.stringify(inbox));
        renderInbox();
      });
      card.append(title, meta, message, remove);
      panel.appendChild(card);
    });
  }

  function renderPublish() {
    const panel = document.getElementById("panel-publish");
    panel.replaceChildren();
    const heading = document.createElement("h2");
    heading.textContent = "Publish";
    const help = document.createElement("p");
    help.className = "help";
    help.textContent = "Publishing updates docs/content.json on GitHub. Pages rebuilds from that file. The token stays in this browser and is never written into the site.";
    panel.append(heading, help);

    const form = document.createElement("form");
    const token = document.createElement("input");
    token.type = "password";
    token.autocomplete = "off";
    token.placeholder = "GitHub token with repo scope";
    token.value = sessionStorage.getItem(TOKEN_KEY) || "";
    const tokenField = document.createElement("label");
    tokenField.className = "field";
    tokenField.append(document.createTextNode("GitHub token for this browser session"));
    tokenField.appendChild(token);
    form.appendChild(tokenField);

    const pass = document.createElement("input");
    pass.type = "password";
    pass.autocomplete = "new-password";
    pass.placeholder = "At least 6 characters";
    const passField = document.createElement("label");
    passField.className = "field";
    passField.append(document.createTextNode("Change admin password"));
    passField.appendChild(pass);
    form.appendChild(passField);

    const actions = document.createElement("div");
    actions.className = "row-actions";
    const publish = button("Publish draft", "btn btn-cyan", "button");
    const download = button("Download JSON", "mini", "button");
    const reset = button("Discard draft", "danger", "button");
    const passBtn = button("Update password", "mini", "button");
    actions.append(publish, download, passBtn, reset);
    form.appendChild(actions);
    const toast = document.createElement("p");
    toast.className = "toast";
    form.appendChild(toast);
    panel.appendChild(form);

    publish.addEventListener("click", async () => {
      toast.style.color = "";
      const value = token.value.trim();
      if (!value) {
        toast.style.color = "#9a3412";
        toast.textContent = "Add a GitHub token to publish. It is kept for this tab only.";
        return;
      }
      sessionStorage.setItem(TOKEN_KEY, value);
      const draft = loadDraft();
      if (!draft) {
        toast.style.color = "#9a3412";
        toast.textContent = "Nothing new to publish. Save a draft first.";
        return;
      }
      toast.textContent = "Publishing…";
      try {
        await publishContent(value, draft);
        localStorage.removeItem(DRAFT_KEY);
        toast.textContent = "Published. GitHub Pages may take a minute to rebuild.";
      } catch (err) {
        toast.style.color = "#9a3412";
        toast.textContent = err.message || "Publish failed.";
      }
    });

    download.addEventListener("click", async () => {
      const data = await current();
      const blob = new Blob([JSON.stringify(data, null, 2) + "\n"], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "content.json";
      link.click();
      URL.revokeObjectURL(url);
    });

    passBtn.addEventListener("click", () => {
      if (pass.value.trim().length < 6) {
        toast.style.color = "#9a3412";
        toast.textContent = "Use at least 6 characters.";
        return;
      }
      localStorage.setItem(PASS_KEY, pass.value.trim());
      pass.value = "";
      toast.style.color = "";
      toast.textContent = "Password updated for this browser.";
    });

    reset.addEventListener("click", () => {
      if (!confirm("Discard unpublished edits in this browser?")) return;
      localStorage.removeItem(DRAFT_KEY);
      renderAll();
    });
  }

  async function publishContent(token, data) {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    const url = "https://api.github.com/repos/" + REPO.owner + "/" + REPO.repo + "/contents/" + REPO.path;
    const existing = await fetch(url + "?ref=" + REPO.branch, { headers });
    const meta = await existing.json();
    if (!existing.ok) throw new Error(meta.message || "Could not read the file on GitHub.");
    const payload = JSON.stringify(data, null, 2) + "\n";
    const content = btoa(unescape(encodeURIComponent(payload)));
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "Update site content from admin",
        content,
        sha: meta.sha,
        branch: REPO.branch
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "GitHub rejected the update.");
  }
})();
