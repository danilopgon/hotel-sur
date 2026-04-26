## Design Context

### Project
Official website for **Hotel Sur**, an alternative rock + electronics band from Tarancón (Cuenca), Spain. Founded 2019. Current release: *Sobre la Gravedad (Parte 1)* — nine songs exploring loss in its various forms. A second part is in development.

### Users
Spanish-speaking music fans, alternative/indie listeners, potential concert attendees, press contacts, and booking agents. They arrive looking for emotional connection with the music, not information architecture. They should feel something before they read anything.

### Brand Personality
**Brutalist / atmospheric / emotional**
— or when rawer tone is needed: **Raw / hypnotic / vulnerable**

The site should feel direct, textural, cinematic, and emotionally charged. Not polished in a corporate or lifestyle-brand way.

### Aesthetic Direction

**Dark is the default world.** The site is predominantly dark, with white/light sections used as intentional narrative interruptions — a flash, a memory, a cut, a rupture, a breathing space after emotional density. Never alternate dark/light for layout variety alone.

**Reference moods:**
- Massive Attack — dark, political, textural, atmospheric
- Arca — experimental, disruptive, intense
- Aphex Twin — strange, unsettling, memorable
- Holly Herndon — digital, conceptual, art-tech driven
- Brutalist editorial layouts, dark cinematic microsites, textural poster systems, album campaign landing pages
- Interfaces that feel like installations, not SaaS products

**Avoid:**
- Generic indie band templates or clean Webflow-style sites
- Startup/SaaS aesthetics, overly polished lifestyle branding
- Scroll animations with no emotional purpose
- Spotify-card grids as the primary visual language
- "Hero + listen now + tour dates" layouts that feel interchangeable
- If it could belong to any band, it is wrong

### Emotional Register by Section
The site is a progression, not a static marketing page. Each section has a distinct emotional register:

| Section | Mood |
|---|---|
| Hero / Album narrative | Heavy, atmospheric, introspective, almost uncomfortable |
| Releases | Ritualistic, contemplative, focused on emotional weight of the music |
| About | Human, direct, poetic but not pretentious |
| Press | Serious, credentialed, still dark |
| Shows / Live | Urgent, physical, energetic, tense |
| Shop / Merch | Functional, but within the same brutalist visual system |

### Technical Design System

**Colors:**
- Primary: `#f55033` (orange-red — used for brand marks, CTAs, accents, borders)
- Neutral scale: `#0a0a0a` / `#111111` / `#1a1a1a` (dark backgrounds)
- White: `#ffffff` (light interruptions only — use with intent)
- Communicator light: `#f0f0f0` / `#e0e0e0` (muted text on dark)

**Typography:**
- Body: Barlow 400/500 — clean, readable
- Headings: Barlow Condensed 600/700 — always uppercase, condensed, tracking-tight
- All headings are uppercase; letter-spacing applied to body (`0.1rem`)

**Motion:**
- GSAP + ScrollTrigger for scroll-driven animations
- Lenis for smooth scrolling (user should never feel trapped)
- `useReduceMotion` hook applied globally — always respect it
- Every animation must have an emotional reason; no decoration

### Design Principles
1. **Texture over polish.** The grain overlay, dark depth, and raw typography are intentional — don't clean them away.
2. **Tension over decoration.** Animations should build emotional pressure, not show off.
3. **Emotional rhythm over random animation.** Pacing is cinematic — sections have moods, transitions have meaning.
4. **Brutalist structure over generic layout.** Break from conventional band-site templates; if it looks interchangeable, redesign.
5. **Every light section must mean something.** White is used as rupture, not variety. Justify it or go dark.
6. **Clear hierarchy even when raw.** The design can feel brutal, but the user should never be lost.
7. **WCAG 2.1 AA accessibility.** Strong contrast (especially grey-on-black), visible focus states, skip links, meaningful ARIA labels, keyboard navigable. Make the intense version usable, not boring.

### One-Line Direction
Hotel Sur's site should feel like a brutalist, cinematic music interface about loss: dark, textural, emotionally heavy, but alive with the physical tension of a live band.
