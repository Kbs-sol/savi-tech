# SaVi Tech

Website for **SaVi Technologies**. Brand name: **SaVi Tech**.

Tagline: **Design. Develop. Deliver.**

Sahara Banu is the founder. Vijay Prasad is the co-founder. The name is Sahara + Vijay + Technology. SaVi Tech is the brand. SaVi Technologies is the business name.

## Pages

GitHub Pages publishes the `docs/` folder.

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about.html` | About the studio and the name |
| `/services.html` | Website design, development, landing pages, UI/UX, app development, digital solutions |
| `/team.html` | Founder and co-founder |
| `/contact.html` | Contact form |
| `/admin.html` | Admin: edit copy, services, process, and team, then publish |
| `/404.html` | Missing page |

## Brand

Midnight `#07111F` and electric cyan `#3EE0FF`. The mark is a wordmark, not an icon. A short cyan stroke sits under the name.

## Admin

Open `/admin.html`.

- First-visit password on a new browser: `savi-admin`. Change it under Publish.
- This password only unlocks the editor in that browser. It is not account security.
- Save a draft, then open **Preview draft** to check it on this browser.
- **Publish** writes `docs/content.json` to this GitHub repository. Pages rebuilds from that file. Paste a GitHub token with `repo` scope when publishing. The token stays in the browser tab and is not saved in the repository.
- Contact messages stay in the browser that submitted them. There is no mail server on GitHub Pages.

## Local preview

```bash
python3 -m http.server 3000 --directory docs --bind 0.0.0.0
```

## Repository layout

- `docs/` — the website GitHub Pages serves
- `docs/content.json` — editable site content
- `src/` — unused starter app from the original template; the live site does not use it

## Not included

- Shared inbox or email delivery
- Case studies, client lists, or expanded team biographies
