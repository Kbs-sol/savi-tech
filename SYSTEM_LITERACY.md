# SYSTEM LITERACY: SaVi Tech Platform & Codebase

> **Confidential & Proprietary Studio Specification**  
> **Brand**: SaVi Tech (SaVi Technologies)  
> **Positioning**: High-Performance Boutique Web Engineering & Digital Product Studio  
> **Founders**: Sahera Banu (Design & Creative Direction) & Vijay Prasad (Engineering & Product Architecture)  
> **Tagline**: `DESIGN. DEVELOP. DELIVER.`  
> **Active Production Repository**: `https://github.com/Kbs-sol/savi-tech`  
> **Live GitHub Pages URL**: `https://kbs-sol.github.io/savi-tech/`

---

## 1. System Philosophy: Simple, Effective, and Efficient

The core guiding principle of **SaVi Tech** is **Anti-Bloat Engineering**:
1. **Simple**: Zero framework overhead where not required. No heavy hydration penalties, no 5MB 3D canvas runtimes that freeze mobile devices. Every visitor arrives at content instantly.
2. **Effective**: Clear, transparent conversion funnels. Potential high-ticket clients (founders, D2C brand owners, CTOs) validate studio credibility within 10 seconds through verified production metrics, real client showcases, and frictionless inquiry channels.
3. **Efficient**: Ultra-fast static delivery via GitHub Pages / Cloudflare edge networks. Sub-800ms load times globally, semantic SEO schema markup for organic discoverability, and clean vanilla architecture (HTML5 + Modern CSS + Modular Vanilla JS + Lenis inertial scrolling).

---

## 2. Benchmark Case Studies & Reference Analysis

The architecture and design decisions of this studio are calibrated against world-class digital benchmarks:

| Reference | Core Essence | How SaVi Tech Implements It Efficiently |
| :--- | :--- | :--- |
| **Two Halves (`twohalves.co`)** | Duality concept: Design & Engineering operating in unison. Bold typography and cinematic atmosphere. | Represented by the foundational unity of **Sahera (Sa: Design/Creative)** and **Vijay (Vi: Engineering/Systems)** in the **SaVi** identity. |
| **Seed Jewelry (`seedjewelry.com`)** | Ultra-refined typography, generous negative space, microscopic borders, quiet confidence. | Clean typographic contrast (Outfit + IBM Plex Mono), hairline satin borders (`rgba(244, 247, 251, 0.12)`), and restraint. |
| **Spyker Cars (`spykercars.com`)** | Hand-built bespoke craftsmanship, aviation dials, engineering precision. | The "Studio Benchmark" spec box and technical delivery framework (`DESIGN. DEVELOP. DELIVER.`). |
| **Apple / Google** | Flawless contrast, instant accessibility, zero layout shifts (`dvh`), and direct value proposition. | Sub-800ms page load speeds, dynamic viewport height, and 100% responsive 60–120fps touch scrolling. |
| **intru.in & vyraherbals.com** | Founder's verified client builds: Streetwear D2C and Organic Health/Wellness flagships. | Displayed with live flagship links and verified production metrics (e.g. 42% conversion lift, sub-800ms loads). |
| **Vyra Hair Tracker** | Cross-platform mobile ecosystem build. | Interactive web sandbox demo hosted live at `https://vyra-preview.surge.sh/`. |

---

## 3. Directory Layout & Codebase Architecture

```
savi-tech/
├── docs/                           # Production web root deployed by GitHub Pages
│   ├── index.html                  # Flagship Landing Page (Hero, Spec Box, Work, Process, Team)
│   ├── work.html                   # Dedicated Case Studies & Live Interactive Previews
│   ├── services.html               # 6 Core Studio Capabilities & Deliverables
│   ├── about.html                  # Studio Manifesto, Origin of "SaVi", & Leadership Bios
│   ├── contact.html                # Project Discovery Form with 24-hr Guaranteed Reply SLA
│   ├── 404.html                    # Lightweight fallback error page
│   ├── favicon.svg                 # Precision SVG SaVi emblem for browser tabs
│   ├── content.json                # Single Source of Truth (SSOT) data model for studio copy & projects
│   ├── site.js                     # Dynamic data hydrator, form handler, & Lenis scroll coordinator
│   ├── styles.css                  # Responsive design tokens, grid system, and kinetic motion physics
│   ├── assets/                     # Studio graphics and client brand assets
│   │   ├── savi-logo.svg           # High-resolution architectural SaVi emblem
│   │   └── clients/                # Transparent client logos for featured case studies
│   │       ├── intru-logo.png
│   │       ├── intru-logo-white.png
│   │       ├── vyra-logo.png
│   │       └── vyra-final-logo.png
│   └── brand/                      # Vector SV brand mark iterations & color swatches
├── src/                            # Optional TypeScript / Hono worker starter templates
├── SYSTEM_LITERACY.md              # This comprehensive system documentation
├── README.md                       # High-level repository orientation
├── package.json                    # Local dev scripts (Vite / Wrangler preview)
└── tsconfig.json                   # TypeScript configuration
```

---

## 4. Visual Design System & Color Tokens

The visual language adheres to the studio's signature midnight & electric cyan palette:

```css
:root {
  --ink: #07111F;             /* Midnight Navy: Primary Base Background */
  --ink-2: #0B1B33;           /* Deep Navy: Alternating Section Background */
  --navy: #102444;            /* Surface Card Fill */
  --card: #12284A;            /* Container Card Surface */
  --card-hover: #17335D;      /* Interactive Hover Elevation */
  --line: rgba(244, 247, 251, 0.12); /* Hairline Structural Borders */
  --paper: #F4F7FB;           /* Clean Alabaster Headings */
  --muted: #9AABC2;           /* Soft Slate Blue Body Copy */
  --text: #E8EEF6;            /* Secondary Body Copy */
  --cyan: #3EE0FF;            /* Electric Cyan: Primary Interactive Accent */
  --cyan-deep: #14C4E6;       /* Cyan Gradient Depth */
  --cyan-glow: rgba(62, 224, 255, 0.18);
  --cyan-border: rgba(62, 224, 255, 0.32);
  --orange: #FF8A3D;          /* Warm Coral Secondary Accent */
  --white: #FFFFFF;
  --font: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --mono: "IBM Plex Mono", ui-monospace, monospace;
}
```

---

## 5. Privacy & Security Rules (MANDATORY FOR ALL AGENTS)

> [!CAUTION]
> **Strict Proprietary Code Shielding:**
> 1. **NEVER expose raw GitHub repository URLs** for client projects (e.g. `intru-genz`, `vyra-herbals`, `vyra-hair-tracker`) on public-facing pages. Client source code is private intellectual property.
> 2. Always link to **Live Production URLs** or **Public Sandbox Demos**:
>    * intru.in: `https://intru.in`
>    * Vyra Herbals: `https://vyraherbals.com`
>    * Vyra Hair Tracker: `https://vyra-preview.surge.sh/`
>    * PhotoFrame PFS: `https://theframehouse.in`

---

## 6. Kinetic Motion & Scroll Architecture

* **Engine**: **Lenis v1.1.18** (by Darkroom Engineering / Studio Freight).
* **Desktop Physics**: Inertial momentum scroll with normalized wheel velocity and standard exponential easing (`Math.min(1, 1.001 - Math.pow(2, -10 * t))`).
* **Mobile Hardware Optimization**: `smoothTouch: false` and hardware touch bypass enabled. On iOS and Android, Lenis steps aside to allow native hardware-accelerated 60/120Hz momentum scrolling.
* **Scroll-Triggered Reveals**: Built with native `IntersectionObserver` targeting `.reveal` and adding `.is-visible` on viewport intersection. Uses GPU transforms (`transform: translateY(0)` and `opacity: 1`) to eliminate layout reflow.

---

## 7. Strategic Recommendations for the Next Agent

When onboarding another AI or human agent to continue evolving this codebase, keep these high-impact guidelines in mind:

1. **Keep It Simple & Lean**:
   * Do not introduce massive JS frameworks (like Next.js or heavy WebGL bundles) unless the user explicitly requests dynamic server-side rendering. The current static build delivers perfect Lighthouse scores (98–100) and instant edge loading.
2. **Organic Client Acquisition Levers**:
   * **Case Study Teardowns**: Expand `/work.html` with short, deconstructed engineering stories (e.g., *"How we achieved 780ms load times on intru.in using Cloudflare edge caching"*). This captures high-intent organic Google searches from founders looking for high-performance builds.
   * **Live Interactive Widgets**: Add an interactive ROI / Timeline calculator widget on `/services.html` where prospective clients can select deliverables and see estimated milestone sprints.
3. **Conversion Friction Minimization**:
   * Maintain the direct founder mailto fallback in `docs/site.js` so client project inquiries are never lost even without an active mail server.
   * Consider connecting a free serverless webhook (e.g., Formspree or Resend) to dispatch inquiries directly to `kbskumar331@gmail.com` and `contact@savitech.studio`.
4. **Visual Polish & Micro-Delights**:
   * Maintain the crisp, high-contrast **SaVi** branding mark in both dark and light modes.
   * Keep typography clean and readable: Google Font **Outfit** for geometric authority paired with **IBM Plex Mono** for technical precision.
