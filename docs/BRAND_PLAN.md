# SaVi Tech — branding, logo, and website theme plan

Status: **awaiting your comment on this commit.**  
This file is a plan only. The live site is not being redesigned in this commit.

Repo (the only place this plan will be pushed): https://github.com/Kbs-sol/savi-tech  
Live site, unchanged by this commit: https://kbs-sol.github.io/savi-tech/

Comment on this commit with one of:

- `go` — build the site from this plan
- `change: …` — what to change before any build
- a pick from the open decisions at the bottom

I will wait after this push and read the commit comments before changing the website.

---

## 1. What this plan is for

SaVi Tech is a small studio that designs and builds websites, online stores, and practical automations. Most visitors are founders and business owners, not engineers. The site has to look finished in the first screen, say what you do in plain language, and prove it with real work.

Position in one line:

> We design and build websites, online stores, and automations that work.

Tagline stays:

> DESIGN. DEVELOP. DELIVER.

Ethos, used as a quiet rule for every page, not as a slogan wall:

> Simple. Effective. Efficient.

## 2. People

Shown as roles, not as a name-origin lesson.

| Person | Role on the site |
| --- | --- |
| Sahera Banu | Founder · Design, creative direction, and strategy |
| Vijay Prasad | Co-founder · Product engineering and systems |

The letters in the mark can be **Sa** and **Vi**. The public pages will not say “Sa means Sahera” or “Vi means Vijay”. That explanation stays in this plan and in `SYSTEM_LITERACY.md` only, for people working on the brand.

## 3. What is wrong with the current site

The live pages already use midnight navy and electric cyan, and they already list real client work. They still talk like an agency pitch:

- Headlines such as “Architecting high-impact digital experiences” and “brand-defining digital flagships”.
- Speed claims (`< 800ms`, “42% conversion”) that a non-technical buyer cannot verify and does not need.
- “Studio manifesto”, “atelier benchmark”, “Q1 availability”. That is decoration, not confidence.
- The current logo is the word **SaVi** set in Outfit inside a rounded square, with a cyan bar and an orange dot. It depends on a web font, so the SVG is not a real mark. At favicon size the word collapses.
- Name-origin copy is still in About (“Sa is design, Vi is engineering”).

None of that gets rewritten in this commit. It is the list to fix if you approve the plan.

## 4. Brand voice

Write the way you would explain the work to a shop owner.

| Use | Do not use |
| --- | --- |
| Website, online store, WhatsApp updates, shipping, payments | Flagship, atelier, manifesto, synergy, architecture |
| We design it, build it, and hand it over | We partner with ambitious high-growth ventures |
| Order alerts, lead capture, support replies | Conversational AI routing, CRM orchestration |
| Looks right on a phone. Loads without a wait. | Sub-800ms, Lighthouse 95, zero-latency |
| Sahera Banu, founder. Vijay Prasad, co-founder. | A specialised multidisciplinary leadership bench |

Short sentences. No exclamation marks. No fake scarcity (“only two slots this quarter”).

## 5. Logo

### Decision

One primary mark: **SaVi**, not SV and not a symbol that needs a caption.

- **Sa** in paper white `#F4F7FB` — design side.
- **Vi** in electric cyan `#3EE0FF` — engineering side.
- A hairline under the word, cyan, about 1.5px at display size. No orange dot. No glow. No second outline box.
- Letters are converted to paths from a real bold grotesque (the current plan uses a clean geometric sans, similar weight to the SV letterforms already in `docs/brand/`). The SVG must render with no font installed.
- Clear space: half the height of the V on every side.
- Minimum: 28px tall in the header, 16px as the favicon crop.

### Versions to ship if you approve

| File | Use |
| --- | --- |
| `docs/brand/savi-night.svg` | Primary. Midnight plate `#07111F`, white Sa, cyan Vi. Header, favicon, social. |
| `docs/brand/savi-night-clear.svg` | Same letters, no plate. For use on an already-dark background. |
| `docs/brand/savi-paper.svg` | Second theme. Warm paper `#F6F1E8`, ink Sa `#161513`, terracotta Vi `#C4512F`. Shown on the brand section only, not as the live UI. |
| `docs/favicon.svg` | Night plate, cropped tight so SaVi still reads at 32px. |

The old `mark-*.svg` files (the geometric construction that read as SY) are not part of the system. They can be deleted in the build commit. `docs/assets/savi-logo.svg` is replaced by the path-based night mark so the header stops depending on Outfit.

### What I will not do

- No animated logo on first load.
- No 3D, glass, or gradient mesh.
- No monogram that only works if you already know the name.

## 6. Colour

### Live theme — Midnight (your colours)

This is the only theme the public site uses.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#07111F` | Page background |
| `--ink-2` | `#0B1B33` | Alternate sections |
| `--card` | `#12284A` | Cards, form, nav drawer |
| `--card-hover` | `#17335D` | Card hover, never a glow |
| `--line` | `rgba(244, 247, 251, 0.12)` | Hairline borders |
| `--paper` | `#F4F7FB` | Headings |
| `--text` | `#E8EEF6` | Body |
| `--muted` | `#9AABC2` | Secondary text, meta |
| `--cyan` | `#3EE0FF` | Links, the one primary button, Vi |
| `--cyan-deep` | `#14C4E6` | Pressed button |
| `--coral` | `#FF8A3D` | Rare. One small status or label. Not a second brand colour. |

Cyan is for action and for the Vi in the mark. It is not a background wash and not a text glow. Body text never sits on cyan.

### Second theme — Paper (my choice, logo only)

Warm paper, ink, and terracotta. It exists so the mark has a light lockup for print, proposals, and a small “two versions” panel on About. The website does not switch to this theme. A theme toggle would fight the midnight identity you already chose.

| Token | Value |
| --- | --- |
| Paper | `#F6F1E8` |
| Ink | `#161513` |
| Terracotta | `#C4512F` |

If you would rather the second version stay in the same midnight family (white plate, navy letters, cyan Vi), say so in the commit comment. I would not recommend a charcoal-and-orange site theme. That palette was on the early board; it fights the midnight vote.

## 7. Type

| Role | Face | Why |
| --- | --- | --- |
| Headlines | Fraunces, optical size 48–72, weight 560 | Editorial, not a template sans. Used large, rarely italic. |
| UI and body | Outfit, 400 / 500 / 600 | Already on the site. Readable at 16px. |
| Labels only | IBM Plex Mono, 12px, tracked | Section index, not paragraphs. |

Rules:

- One headline size per section. No stacked eyebrows that repeat the heading.
- Body 17px on desktop, 16px on a phone, line-height 1.55.
- Measure of body text capped near 62 characters.
- No all-caps paragraphs. The tagline is the exception, and it appears once per page.

## 8. Layout and motion

References, used as discipline, not copied:

- **bluorng.com** — simple header, large type, air, collection-style rows. We take the structure, not the fashion imagery.
- **twohalves.co** — two equal columns for design and engineering. Used once, on About, as Sahera and Vijay side by side.
- **seedjewelry.com** — hairline rules, quiet type, lots of unused space.
- **Apple** — one idea per screen, thumb-sized buttons, no layout jump.

Page frame:

- Sticky header, 64px, blur only after scroll. Logo left. Five links. One button: **Start a project**.
- Mobile: same header, button becomes the menu. Menu is a full-width sheet, links at 20px, close control obvious. No hover-only actions.
- Sections alternate `#07111F` and `#0B1B33`. Cards use a 1px hairline, 16px radius, no drop shadow heavier than a soft 8% black.
- Hero is `min-height: 100dvh` minus the header, so the address bar on iPhone does not crop the button.
- Desktop scroll can use the Lenis setup already in `site.js`. Phones keep native scroll. No scroll-jacking, no pinned scenes, no cursor effects.
- Motion: 200ms colour and transform on links and cards. Respect `prefers-reduced-motion`.

## 9. Pages, after approval

Information architecture stays close to what is already deployed.

| Page | Job |
| --- | --- |
| Home | What we do, four proof links, six services, two people, one contact button. |
| Work | Every public project, with a live link. No private repos. |
| Services | The six offers in plain language, each with one example. |
| About | Two people and how the work runs. Logo versions live here. |
| Contact | Name, email, what you need, message. Honest note that messages stay in this browser until a real inbox exists. |
| Admin | Unchanged job: edit `content.json`, preview, publish. Not linked in the public header. |

### Home, top to bottom

1. Header.
2. Hero. Headline: **Websites, stores, and automations that work.** Subline: one sentence on design, build, and handover. Buttons: **Start a project** and **See the work**. Tagline under the buttons, once.
3. A single quiet line: Sahera Banu, founder. Vijay Prasad, co-founder. Hyderabad · remote.
4. Work. Four cards, image or name, one sentence, **Open live site**. No metric chips.
5. Services. Numbered rows, not a six-up card grid. Title, one sentence, link to the services page.
6. How it runs. Three steps: Design, Develop, Deliver. One sentence each.
7. Close. Repeat the headline’s promise and the contact button. Footer with the mark, tagline, and page links.

### Services, in this order

1. Websites — company and brand sites.
2. Online stores — shops with cart, checkout, and a phone layout that is easy to buy from.
3. Landing pages — one page, one offer, one next step.
4. Product screens — app and tool interfaces.
5. WhatsApp automation — order alerts, lead capture, support replies.
6. Shipping and payment automations — Shiprocket, payment status, the boring steps that should not be done by hand.

Each service names one real example where we have one. No invented outcomes.

## 10. Work we will show

Only public URLs. No client repository links. No embeds that expose source.

| Work | What we say | Link |
| --- | --- | --- |
| INTRU | Oversized streetwear shop. Product pages, sizes, cart, checkout. | https://intru.in |
| Vyra Herbals | Natural hair-care shop with Pan-India delivery. | https://vyraherbals.com |
| Vyra Hair Tracker | Companion for routines, scores, and photo check-ins. Interactive preview, not a store listing. | https://vyra-preview.surge.sh/ |
| PhotoFrame PFS | Custom frame preview and pricing. | https://photoframepfs.pages.dev/ |
| Doraemon | Media library. Trailers and clips only — no full films. | https://doraemon-6lm.pages.dev/ |
| Campus Assist | Campus helper for students: questions, routes, and everyday tasks. | https://campusassist.pages.dev/ |
| Vijayavyuham | Named project. No live preview yet, so it is a line in a “also building” list, not a case card. | Public repo only, not linked as a preview: https://github.com/Kbs-sol/vijayavyuham |
| Vipanan Studios | Same treatment. Mention, no fake preview. | https://github.com/Kbs-sol/vipanan-studios |

Those last two GitHub links are the project’s own public repos, not private client code. If you would rather not link them at all, say so.

Rules for the work page:

- A card needs a working public URL or it does not get a card.
- No “42% lift”, no load-time badges, no client quotes we do not have in writing.
- Logos only if they are already in this repo or we draw a type treatment. No scraping brand assets from the live stores.

## 11. What stays technically

- `docs/` remains the GitHub Pages root.
- `docs/content.json` remains the only editable copy. The plan’s headlines replace the current brand strings there, in the build commit, not in this one.
- `site.js` keeps filling the pages from that file, including draft preview.
- Admin password and GitHub token stay in the browser. Nothing secret is added to the repo.
- Lenis stays desktop-only. Layout uses `100dvh` where a screen must fill the phone.
- Other repositories stay read-only. This plan and any later build go only to `Kbs-sol/savi-tech`, branch `main`.

## 12. Build order, if you say go

1. Draw the three SaVi SVGs as paths and swap the header and favicon.
2. Replace brand strings in `content.json` with the plain-language set in this plan. Add the four extra projects. Remove metric claims.
3. Restyle Home, Work, Services, About, and Contact to the section order above. Keep the admin.
4. Delete unused SY marks if nothing links them.
5. Check desktop and a 390px phone: no overflow, menu works, every external link opens, logo reads as SaVi.
6. Commit and push to `main`. Pages will update on its own.

I will not start that build until a comment on this commit says to.

## 13. Open decisions — comment with a number if you care

1. **Logo word.** I recommend **SaVi**. The earlier SV letterforms are a fallback if you still want only two letters.
2. **Second theme.** I recommend paper + terracotta as a logo lockup only. Say if you want it dropped.
3. **Coral.** Keep `#FF8A3D` as a rare label, or remove it so the site is only navy, paper, and cyan.
4. **Name spelling.** This plan uses **Sahera Banu**, matching the current live site and this brief. An earlier note spelled it Sahara. Confirm which is correct.
5. **Unlaunched work.** Mention Vijayavyuham and Vipanan Studios without previews, or leave them off the public site.
6. **Contact.** Keep `contact@savitech.studio` and `+91 91219 93498` as published, or clear them until you confirm they should be public.

Default if you only write `go`: SaVi mark, paper lockup kept on About, coral used once, Sahera spelling, both extra projects mentioned but not featured, contact details left as they are now.
