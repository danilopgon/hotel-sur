---
name: Hotel Sur
description: Brutalist, cinematic official site for an alternative rock and electronics band.
colors:
  primary: "#f55033"
  neutral-900: "#0a0a0a"
  neutral-800: "#111111"
  neutral-700: "#1a1a1a"
  neutral-0: "#ffffff"
  communicator-light: "#f0f0f0"
  communicator-lighter: "#e0e0e0"
  destructive: "#e11d48"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3.75rem, 12vw, 8rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(1.875rem, 6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0"
  body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.1rem"
  label:
    fontFamily: "Barlow, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1rem"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-0}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  input-dark:
    backgroundColor: "{colors.neutral-800}"
    textColor: "{colors.neutral-0}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
  release-card:
    backgroundColor: "{colors.neutral-900}"
    textColor: "{colors.neutral-0}"
    rounded: "{rounded.xl}"
---

# Design System: Hotel Sur

## 1. Overview

**Creative North Star: "The Gravity Ritual"**

Hotel Sur's interface is a dark, textural music site built around pressure, loss, and physical sound. It should feel like a cinematic poster system that became interactive: full-bleed artwork, uppercase condensed type, orange-red marks, grain, slow scroll pressure, and abrupt light interruptions when the narrative needs air.

The system rejects interchangeable band templates, SaaS polish, lifestyle cleanliness, and decorative animation. Dark is the default world. White sections are narrative ruptures, not layout variety. Every screen should feel authored for this band and this album cycle.

**Key Characteristics:**
- Dark, image-led, and atmospheric by default.
- Orange-red is the signal color for titles, CTAs, focus, and live energy.
- Condensed uppercase headings carry the brutalist poster voice.
- Motion is cinematic pressure, never decoration.
- Light surfaces are rare interruptions with a reason.

## 2. Colors

The palette is almost black, almost paper, and a single hot orange-red that behaves like a signal flare.

### Primary
- **Signal Red** (`primary`): The Hotel Sur mark color. Use it for hero titles, section titles, primary actions, focus rings, orbital motifs, play icons, and rare accents. Its job is tension and recognition, not decoration.

### Neutral
- **Stage Black** (`neutral-900`): The dominant background for hero, releases, contact, press, and live sections. It is the default world.
- **Backline Black** (`neutral-800`): Secondary dark surface for form fields, nav overlays, and dark component interiors.
- **Charcoal Cut** (`neutral-700`): Borders, muted dark fills, and component separation when pure contrast would be too clean.
- **Rupture White** (`neutral-0`): Used for intentional light sections and foreground text. Do not alternate it with dark for rhythm alone.
- **Smoke Text** (`communicator-light`, `communicator-lighter`): Muted copy and supporting text on dark surfaces.
- **Error Rose** (`destructive`): Form validation and destructive states only.

### Named Rules

**The Dark World Rule.** Start from `neutral-900`. Use light sections only as a narrative rupture.

**The Signal Rule.** `primary` must stay rare enough to feel charged. If everything is red, nothing is urgent.

**The No Generic Palette Rule.** Do not introduce indie beige, Spotify green, SaaS blue, purple gradients, or lifestyle pastels.

## 3. Typography

**Display Font:** Barlow Condensed with sans-serif fallback
**Body Font:** Barlow with sans-serif fallback
**Label/Mono Font:** Barlow with sans-serif fallback

**Character:** The pairing is direct and poster-like. Condensed uppercase headings create physical pressure; Barlow body copy keeps the Spanish editorial content readable without softening the atmosphere.

### Hierarchy
- **Display** (700, `clamp(3.75rem, 12vw, 8rem)`, line-height 1): Hero and album-title moments only.
- **Headline** (700, `clamp(1.875rem, 6vw, 3.75rem)`, line-height 1.05): Section titles such as releases, shop, press, and shows.
- **Title** (700, `1.125rem` to `1.875rem`, line-height 1.1): Card titles, release names, product names, and show details.
- **Body** (400 or 500, `16px`, line-height 1.5): Paragraphs, form content, and supporting copy. Keep long prose at roughly 65 to 75 characters per line.
- **Label** (500, `0.75rem`, letter-spacing `0.1rem`, uppercase where semantic): Dates, metadata, navigation details, and compact UI labels.

### Named Rules

**The Poster Voice Rule.** Headings are uppercase, condensed, and blunt. Do not turn Hotel Sur headings into polite title case.

**The Readable Brutalism Rule.** Brutal does not mean illegible. Body text must remain comfortable, especially on black.

## 4. Elevation

The system is mostly flat and layered through tone, imagery, overlays, grain, scale, blur, and focus rings. Shadows appear only on functional objects such as product tiles, release cards, mobile navigation, or hover states. Avoid soft floating-card depth as a default visual language.

### Shadow Vocabulary
- **Micro Surface** (`shadow-xs`): Shadcn button and input default, used only as a subtle control affordance.
- **Product Lift** (`shadow-lg`): Merch tiles that behave like tactile objects.
- **Release Hover** (`hover:shadow-xl`): Media cards can gain depth on hover, paired with image scale and ring change.
- **Mobile Nav Drop** (`shadow-lg`): Mobile menu separation over content.

### Named Rules

**The Flat Stage Rule.** Surfaces are flat at rest. Depth comes from image layers and tonal pressure before shadows.

## 5. Components

### Buttons
- **Shape:** Compact rounded rectangle (`8px`) from the shadcn base.
- **Primary:** `primary` background, `neutral-0` text, `36px` height, `8px 16px` padding. Commonly uppercase and bold in brand CTAs.
- **Hover / Focus:** Hover shifts to approximately 90% primary opacity. Focus uses a visible `primary` ring with offset on dark surfaces.
- **Outline / Ghost:** Outline keeps transparent or dark background with `primary` text and a faint primary border. Ghost nav buttons stay quiet until hover.

### Cards / Containers
- **Corner Style:** Release cards use a more cinematic `14px` radius. Merch tiles use `8px`.
- **Background:** Release cards are image-first with black gradient overlays. Merch cards use product imagery with `neutral-900/60` overlays.
- **Shadow Strategy:** Cards can lift on hover, but the image and overlay do most of the work.
- **Border:** Release cards use faint white rings (`white/5` at rest, `white/10` on hover), not heavy frames.
- **Internal Padding:** Card overlays use `20px` to `24px`, tighter on mobile when image density is high.

### Inputs / Fields
- **Style:** Dark fields use `neutral-800` fill, `neutral-700` border, `neutral-0` text, and `8px` radius.
- **Focus:** Border shifts to `primary`, with a 3px translucent ring.
- **Error / Disabled:** Error uses `destructive`; disabled fields reduce opacity and pointer interaction.

### Navigation
- **Style:** Fixed top navigation on `neutral-900/90` with slight backdrop blur. Brand wordmark is `primary`, bold, and compact.
- **Desktop:** Inline nav items use primary and ghost button variants. Active route uses a filled primary button.
- **Mobile:** Burger lines are primary, the menu opens as a dark blurred panel, and each item is full width for touch.

### Release Card

Release cards are the signature repeated object: image-led, darkened with a bottom gradient, uppercase white title, faint ring, and a primary play signal. Hover scales and shifts the image with GSAP, creating a physical movement rather than a decorative effect.

### Hero

The hero is full-screen, layered, and scroll-bound. Album artwork layers move, scale, and blur at different rates while grain intensifies. Text enters through opacity, blur, scale, and vertical movement. Respect reduced motion globally.

## 6. Do's and Don'ts

### Do:
- **Do** start brand surfaces from `neutral-900` and build pressure with image layers, grain, and typography.
- **Do** use `primary` for titles, CTAs, rings, play signals, and orbital marks.
- **Do** keep headings uppercase, condensed, and forceful.
- **Do** make every animation emotionally purposeful and respect reduced motion.
- **Do** preserve strong contrast and visible focus states for WCAG 2.1 AA.
- **Do** use white sections as a flash, memory, cut, rupture, or breathing space after density.

### Don't:
- **Don't** make this look like a generic indie band template or clean Webflow-style site.
- **Don't** use startup/SaaS aesthetics or overly polished lifestyle branding.
- **Don't** build a "Hero + listen now + tour dates" layout that could belong to any band.
- **Don't** rely on Spotify-card grids as the primary visual language.
- **Don't** add scroll animations with no emotional purpose.
- **Don't** use side-stripe borders, gradient text, decorative glassmorphism, or nested cards.
- **Don't** alternate dark and light sections just for variety.
