# Design Brief: WE ARE ONE Festival Platform

## Tone & Purpose
Maximalist neon-futurism. Showcase global EDM and family festivals with transcendent energy and visual intensity. Emotional arc: excitement → immersion → action.

## Differentiation
LED-glow typography, glassmorphic layered depth, electric neon accents on near-black voids, animated particle/aurora backgrounds, pulsing interactive elements. No safe defaults—every surface has intentional treatment.

## Color Palette (Dark Mode)

| Token | OKLCH | Usage |
|:------|:------|:------|
| Background | 0.08 0 0 | Deep space void |
| Foreground | 0.96 0 0 | Soft white text |
| Primary (Cyan) | 0.65 0.2 180 | Hero CTAs, active states, neon borders |
| Secondary (Magenta) | 0.55 0.23 310 | Energy pulses, accent highlights |
| Tertiary (Amber) | 0.65 0.18 70 | Festival warmth, secondary CTAs |
| Card Surface | 0.15 0.01 260 | Glassmorphic festival cards |
| Border | 0.25 0.02 260 | Subtle dividers, input borders |
| Muted | 0.18 0.01 260 | Secondary surfaces, disabled states |

## Typography

| Role | Font | Usage |
|:-----|:-----|:------|
| Display | General Sans | Hero headings, festival names, major CTAs (sizes 32–64px with glow) |
| Body | Figtree | Descriptions, event details, body copy (16–18px) |
| Mono | JetBrains Mono | Code, technical notes, ticket codes (14px) |

## Shape Language
- Card radii: 12px (glassmorphic festival listings)
- Button radii: 8px (sharp, modern CTA appearance)
- Glow elements: no radius (pure neon borders) or 16px (soft ambient orbs)
- Density: spacious (6–12px padding inside cards, 20–32px gap between sections)

## Elevation & Depth
1. **Background**: Deep space (0.08 0 0), static or animated particle field
2. **Card Layer**: Glassmorphic with backdrop-filter blur(10px), semi-transparent dark surface
3. **Overlay Layer**: Floating modals, pop-ups with stronger glass effect
4. **Interactive Layer**: Neon borders and glow shadows on hover/active states

## Structural Zones

| Zone | Treatment | Example |
|:-----|:----------|:--------|
| **Header** | Minimal dark, logo + nav links, sticky top, subtle border-b cyan glow | WE ARE ONE logo, Home/Festivals/Packages/Jobs/Contact/Admin |
| **Hero** | Full-width background image or animated particle field, massive centered logo + slogan, oversized CTA buttons | "One World 2 Vibes" headline, dual CTAs (cyan primary, amber secondary) |
| **Content** | Spacious grid of glassmorphic cards, each with neon-bordered accent, hover lift effect | 3-col grid desktop, 1-col mobile, festival listings with glow borders |
| **Footer** | Dark muted surface (0.12 0 0), social icon row, legal links, copyright, subtle top border | Social links (cyan/magenta hovers), contact email |

## Component Patterns
- **CTA Buttons**: Cyan neon border with glow on .dark, smooth fade-in on load, hover state lifts shadow
- **Festival Cards**: Glassmorphic (glass-effect class), alternating neon borders (cyan/magenta/amber), title in General Sans with micro glow
- **Modal Pop-ups**: Stronger glass effect, centered overlay, cyan border accent, close button with magenta hover
- **Navigation**: Inline links with underline-on-hover (cyan), active link text-shadow glow

## Motion & Animation
- **Entrance**: fade-in + slide-up on cards (500ms ease-out, staggered by 100ms per card)
- **Hover**: Box-shadow glow intensifies, text-shadow brightness increases on interactive elements
- **Pulsing**: Ambient pulse-glow (2s infinite) on accent badges or key CTAs
- **Transitions**: All interactive state changes via transition-smooth (0.3s cubic-bezier)

## Constraints & Anti-Patterns
- NO: uniform rounded corners, flat surfaces, pastel color mixing
- NO: generic Tailwind defaults (use custom glow classes exclusively)
- NO: shadows without neon logic (glow shadows tied to accent colors)
- NO: animations without purpose (every animation serves emotional narrative: energy or urgency)
- YES: Bold color commitment (cyan dominates, magenta punctuates, amber warmth)
- YES: Intentional layering (background ≠ card ≠ overlay)

## Responsive Breakpoints (Tailwind)
- **Mobile (base)**: single-column cards, large touch targets (48px min), reduced font sizes
- **Tablet (md)**: 2-column grid, balanced spacing
- **Desktop (lg)**: 3-column grid, full-width hero, optimized typography scale

## Signature Detail
**LED Glow Headings**: All festival names and major CTAs use `.glow-cyan`, `.glow-magenta`, or `.glow-amber` text-shadow effect for authentic neon aesthetic. Neon borders on cards glow via box-shadow with matching color + 60% opacity. On hover, glow intensifies—text and border brightness +20%.

## Dependencies
- Fonts: General Sans (display), Figtree (body), JetBrains Mono (mono) — loaded via @font-face from `/assets/fonts/`
- Animations: fade-in, slide-up, pulse-glow defined in tailwind.config.js keyframes
- Utilities: glow-*, glass-effect, neon-border-* defined in index.css @layer utilities
