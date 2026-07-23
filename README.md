# Ahmed Raza — Junior Full Stack Engineer Portfolio

A premium, Awwwards-quality portfolio website built with React, TypeScript, and Tailwind CSS. Features immersive Behance-style project case studies, interactive terminal, command palette, and a luxury dark theme inspired by Apple, Linear, and Stripe.

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP
- **Backend:** Vercel Serverless Functions, Supabase (PostgreSQL)
- **Deployment:** Vercel

## Features

- 🎨 Luxury dark theme with glassmorphism design
- 🖥️ Immersive project case studies with device mockups
- 🔍 Command Palette (Ctrl+K) for instant search
- 💻 Interactive developer terminal
- 📊 GitHub analytics & contribution graph
- 📜 13 professional certifications showcase
- 🎓 Currently learning section with progress bars
- 📄 Resume preview modal
- 🖱️ Custom cursor with hover states
- 📜 Scroll progress indicator
- 🔄 Back to top button
- 🎮 Konami code easter egg
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ 95+ Lighthouse performance target

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ahmedraza/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
├── api/                          # Vercel serverless functions
│   ├── db-client.js             # Supabase client (shared)
│   ├── db-wake.js               # Database wake function
│   ├── certificate-showcase.js  # Certificates API
│   ├── contact.js               # Contact form API
│   ├── currently-learning.js    # Learning items API
│   ├── live-metrics.js          # Metrics API
│   ├── project-cases.js         # Project case studies API
│   ├── project-screenshots.js   # Project screenshots API
│   ├── projects.js              # Projects API
│   └── tech-items.js            # Tech stack API
├── public/
│   ├── certs/                   # Certificate images
│   ├── projects/                # Project screenshot images
│   ├── portrait.jpg             # Professional portrait
│   └── favicon.svg              # Custom favicon
├── src/
│   ├── components/              # React components
│   │   ├── projects/            # Project-specific components
│   │   │   └── DeviceMockup.tsx # Device mockup with carousel
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── AnimatedBackground.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── MouseSpotlight.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   └── SectionHeading.tsx
│   │   ├── About.tsx
│   │   ├── Certificates.tsx
│   │   ├── CodingPhilosophy.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── Contact.tsx
│   │   ├── CurrentlyLearning.tsx
│   │   ├── DeveloperTerminal.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── GitHubAnalytics.tsx
│   │   ├── Hero.tsx
│   │   ├── LiveMetrics.tsx
│   │   ├── Loader.tsx
│   │   ├── Navbar.tsx
│   │   ├── OpenSource.tsx
│   │   ├── Projects.tsx
│   │   ├── ResumePreview.tsx
│   │   ├── TechStack.tsx
│   │   └── WhyHireMe.tsx
│   ├── pages/
│   │   └── NotFound.tsx         # Custom 404 page
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles & Tailwind
├── .env.example                 # Environment variable template
├── .gitignore
├── index.html                   # HTML entry point
├── package.json
├── tsconfig.json
├── vercel.json                  # Vercel deployment config
└── vite.config.ts               # Vite configuration
```

## Database Schema

### Tables

- **projects** — Portfolio projects with technologies and links
- **project_cases** — Detailed case study data (overview, challenge, solution, features, process, results)
- **project_screenshots** — Project screenshot images with labels
- **certificates** — Basic certificate data
- **certificate_showcase** — Enhanced certificates with issuers, images, and descriptions
- **tech_items** — Technology stack items by category
- **currently_learning** — Active learning items with progress
- **live_metrics** — Portfolio metrics (projects count, certificates, etc.)
- **contact_messages** — Contact form submissions

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+K` | Open command palette |
| `ESC` | Close modal/terminal |
| ↑↑↓↓←→←→BA | Konami code easter egg |

## License

MIT License — feel free to use this as inspiration for your own portfolio.

---

Built by **Ahmed Raza** — Junior Full Stack Engineer
