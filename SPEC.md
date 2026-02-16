# MIRAZSTUDIO - Digital Product & Web Development Studio

## Project Overview

- **Project Name**: MIRAZSTUDIO
- **Type**: Premium digital studio website (Single-page application with smooth scroll)
- **Core Functionality**: Showcase digital studio services, projects, and enable client contact
- **Target Users**: Potential clients seeking web development, UI/UX, and digital product services

---

## UI/UX Specification

### Layout Structure

**Page Sections (in order)**:
1. Navigation (fixed)
2. Hero Section
3. About Section
4. Services Section
5. Projects Section
6. Contact Section
7. Footer

**Responsive Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette**:
- Background Primary: `#0A0A0A` (near black)
- Background Secondary: `#141414` (dark gray)
- Background Tertiary: `#1A1A1A` (card backgrounds)
- Text Primary: `#FFFFFF` (white)
- Text Secondary: `#A3A3A3` (muted gray)
- Text Tertiary: `#525252` (subtle gray)
- Accent: `#FFFFFF` (white for highlights)
- Border: `#262626` (subtle borders)
- Hover Accent: `#FAFAFA` (slightly off-white)

**Typography**:
- Heading Font: `"Syne"` (Google Fonts) - bold, geometric, distinctive
- Body Font: `"Manrope"` (Google Fonts) - clean, modern, readable
- Hero Title: 72px desktop / 40px mobile, font-weight 800
- Section Titles: 48px desktop / 32px mobile, font-weight 700
- Body Text: 18px desktop / 16px mobile, font-weight 400
- Small Text: 14px

**Spacing System**:
- Section Padding: 120px vertical desktop / 80px mobile
- Container Max Width: 1200px
- Grid Gap: 32px desktop / 24px mobile
- Card Padding: 32px

**Visual Effects**:
- Cards: subtle border with `border-gray-800`, slight background gradient
- Buttons: white background, black text, scale on hover
- Scroll reveal: fade up with 0.6s duration, staggered delays
- Noise texture overlay on hero (optional subtle effect)

### Components

**Navigation**:
- Fixed position, backdrop blur
- Logo (MIRAZSTUDIO text) on left
- Nav links: About, Services, Projects, Contact
- CTA button: "Let's Talk"
- Mobile: hamburger menu with slide-in drawer

**Hero Section**:
- Full viewport height (100vh)
- Centered content
- Animated title with letter stagger
- Tagline in muted text
- Two buttons: "View Projects" (primary), "Contact" (outline)
- Subtle scroll indicator at bottom

**About Section**:
- Two-column layout (text + decorative element)
- Large text with highlighted keywords
- Animated line reveal on scroll

**Services Section**:
- 3-column grid (2 on tablet, 1 on mobile)
- Cards with icon, title, description
- Hover: subtle lift and border glow
- Services: 6 total

**Projects Section**:
- 2-column grid (1 on mobile)
- Project cards with image, title, description, tech tags
- Hover: image zoom, overlay with links
- "View Project" and "GitHub" buttons

**Contact Section**:
- Centered form with max-width 600px
- Fields: Name, Email, Message
- Submit button with loading state
- Alternative: email link

**Footer**:
- 4-column layout (2 on tablet, stacked on mobile)
- Logo, Navigation, Social Links, Copyright
- Minimal separator line

---

## Functionality Specification

### Core Features

1. **Smooth Scroll Navigation**: Clicking nav links smoothly scrolls to sections
2. **Scroll Animations**: Elements fade/slide in when entering viewport
3. **Project Showcase**: Display 4-6 projects with hover interactions
4. **Contact Form**: Form validation, submit feedback (console.log for demo)
5. **Responsive Design**: Fully functional on all device sizes
6. **Accessibility**: Proper ARIA labels, keyboard navigation, focus states

### User Interactions

- Nav links → smooth scroll to section
- CTA buttons → scroll to contact or projects
- Service cards → hover lift effect
- Project cards → hover overlay with links
- Contact form → validation feedback
- Social links → open in new tab

### Data Handling

- Projects stored in local JSON/array
- Form submission logs to console (frontend-only)
- No backend/API calls required

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with black/white palette applied consistently
- [ ] Syne font for headings, Manrope for body text
- [ ] All sections have proper spacing (120px desktop)
- [ ] Cards have subtle borders and hover effects
- [ ] Animations are smooth (60fps) and not jarring

### Functional Checkpoints
- [ ] Navigation links scroll to correct sections
- [ ] Mobile menu opens/closes properly
- [ ] All hover states work on interactive elements
- [ ] Form validates required fields
- [ ] Page loads without console errors

### Performance Checkpoints
- [ ] Images optimized with Next.js Image
- [ ] No layout shift on load
- [ ] Animations don't cause jank

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Syne, Manrope)
