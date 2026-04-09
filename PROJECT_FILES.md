# Master Portfolio Hub - Project Files Reference

Complete guide to all project files, their purposes, and how they interconnect.

---

## 📁 Root Configuration Files

### `package.json`
- **Purpose**: NPM package configuration and dependency management
- **Key Info**: 
  - Defines npm scripts: `dev`, `build`, `start`, `lint`, `type-check`, `studio`
  - Lists all dependencies (React 19, Next.js 16.2.3, Sanity, Tailwind CSS)
  - Project metadata (name, version, license)
- **Connections**: Referenced by npm CLI and CI/CD pipelines

### `tsconfig.json`
- **Purpose**: TypeScript compiler configuration
- **Key Features**:
  - Strict type checking enabled
  - Path alias: `@/*` maps to `./src/*`
  - Target: ES2020
  - Module resolution: bundler
  - Includes `.next/types` for Next.js type augmentation
- **Connections**: Used by TypeScript compiler and VS Code for type checking

### `next.config.js`
- **Purpose**: Next.js framework configuration
- **Features**:
  - Remote image optimization from Sanity CDN (cdn.sanity.io)
  - Security headers for Studio route
- **Connections**: Next.js reads on build and dev

### `tailwind.config.js`
- **Purpose**: Tailwind CSS customization
- **Includes**:
  - Custom color palette (primary, secondary, accent, success, warning, error)
  - Custom fonts (Inter, Fira Code)
  - Content scanning paths (src/app, src/components)
- **Connections**: Used by PostCSS during CSS compilation

### `postcss.config.js`
- **Purpose**: PostCSS plugin configuration
- **Plugins**: @tailwindcss/postcss for processing Tailwind directives
- **Connections**: Processes all CSS files during build

### `.eslintrc.json`
- **Purpose**: ESLint linting rules configuration
- **Config**: Extends Next.js core-web-vitals preset
- **Connections**: Used by `npm run lint` and IDE for real-time feedback

### `.env.local.example`
- **Purpose**: Template for environment variables
- **Variables**:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
  - `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (production/preview)
  - `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version
  - `SANITY_API_TOKEN` - Optional, for publishing from server
- **Connections**: Copy to `.env.local` (not committed) before running

### `.gitignore`
- **Purpose**: Specify files/folders to exclude from Git
- **Excludes**: node_modules, .next, .env.local, build artifacts
- **Connections**: Git uses on commit to filter files

### `.dockerignore`
- **Purpose**: Specify files to exclude from Docker builds
- **Excludes**: Similar to .gitignore plus node_modules, .next, sanity/dist
- **Connections**: Docker daemon uses when building images

---

## 🐳 Docker & Deployment

### `Dockerfile`
- **Purpose**: Multi-stage Docker build configuration
- **Stages**:
  1. **Builder**: Node 20-alpine, installs deps, builds Next.js app
  2. **Runner**: Minimal Node image, copies only production files, runs app
- **Optimization**: Reduces final image size by excluding devDependencies
- **Connections**: Used by `docker build` and docker-compose

### `docker-compose.yml`
- **Purpose**: Container orchestration configuration
- **Services**:
  - **portfolio**: Next.js app (port 3000), mounts node_modules
  - **backend**: Placeholder for future backend service
- **Network**: portfolio-network for service communication
- **Env Vars**: Reads from `.env.local` for Sanity credentials
- **Connections**: Used by `docker-compose up -d`

---

## 🎨 Frontend - Styling & Design

### `src/styles/globals.css`
- **Purpose**: Global styles applied to entire application
- **Contains**:
  - Tailwind directives import (@import "tailwindcss")
  - Base layer: HTML/body resets, heading/paragraph styles
  - Components layer: Utility classes (.btn-primary, .card, .container-max)
- **Connections**: Imported by `src/app/layout.tsx`

### `src/lib/design-tokens.ts`
- **Purpose**: Centralized design token definitions
- **Exports**:
  - Colors: primary, secondary, accent, semantic colors
  - Typography: font stacks, sizes, weights
  - Spacing: consistent spacing scale
  - Breakpoints: responsive design breakpoints
  - Shadows, border-radius constants
- **Connections**: Imported by components for consistent styling
- **Usage Example**:
  ```typescript
  import { colors, typography } from '@/lib/design-tokens'
  ```

---

## 🔄 Sanity CMS Integration

### `src/lib/sanity.client.ts`
- **Purpose**: Configure and export Sanity client
- **Exports**:
  - `client`: Configured Sanity client instance
  - `sanityFetch()`: Typed fetch wrapper for queries
- **Configuration**:
  - Reads from environment variables
  - Uses CDN in production, live API in development
- **Connections**: 
  - Imported by pages and components to fetch data
  - Validates that `NEXT_PUBLIC_SANITY_PROJECT_ID` and dataset exist

### `src/lib/queries.ts`
- **Purpose**: Pre-built Sanity GROQ query strings
- **Queries**:
  - `PROJECTS_QUERY` - All projects sorted by date
  - `FEATURED_PROJECTS_QUERY` - Only featured projects
  - `PROJECT_BY_SLUG_QUERY` - Single project by slug
  - `EXPERIENCE_QUERY` - All work experience
  - `SKILLS_QUERY` - All skills
  - `SKILLS_BY_CATEGORY_QUERY` - Skills filtered by category
- **Connections**: Imported and used in page components via `sanityFetch()`

### `sanity/sanity.config.ts`
- **Purpose**: Main Sanity Studio configuration
- **Configuration**:
  - Project ID and dataset from environment
  - Base path: `/studio`
  - Schema types: Imports from `schemas/index.ts`
- **Connections**: Used by Sanity CLI and Next-Sanity plugin

### `sanity/schemas/index.ts`
- **Purpose**: Central schema type definitions export
- **Exports**: Array of all schema types (project, experience, skill)
- **Connections**: Imported by `sanity.config.ts` and used throughout CMS

### `sanity/schemas/project.ts`
- **Purpose**: Sanity schema definition for portfolio projects
- **Fields**:
  - title, slug, description, content (with images)
  - technologies (array), externalUrl, dates
  - featured flag, publishedAt timestamp
- **Preview**: Shows title and featured image in Studio
- **Connections**: Referenced in PROJECTS_QUERY

### `sanity/schemas/experience.ts`
- **Purpose**: Sanity schema definition for work experience
- **Fields**:
  - company, position, description, highlights
  - technologies, startDate, endDate, isCurrent flag
  - location, companyUrl, display order
- **Preview**: Shows "position at company" format
- **Connections**: Referenced in EXPERIENCE_QUERY

### `sanity/schemas/skill.ts`
- **Purpose**: Sanity schema definition for technical skills
- **Fields**:
  - name, category (frontend/backend/devops/tools/databases/other)
  - proficiency (beginner/intermediate/advanced/expert)
  - years, description, relatedProjects reference
  - display order
- **Preview**: Shows skill name and category
- **Connections**: Referenced in SKILLS_QUERY, linked to projects

---

## 🏗️ App Router & Pages

### `src/app/layout.tsx`
- **Purpose**: Root layout component wrapping all pages
- **Structure**:
  - HTML/head setup with metadata
  - Flex container: Header → main content → Footer
  - Imports global CSS styles
- **Connections**:
  - Wraps all pages (/, /portfolio, /resume, /studio)
  - Imports `Header` and `Footer` from shared components
  - Imports `globals.css`
- **Children**: All page components render in `<main>`

### `src/app/page.tsx`
- **Purpose**: Home page (`/` route)
- **Sections**:
  1. Hero Section: Gradient background, welcome message, CTAs
  2. Features Section: What I Do (Web Dev, Full-Stack, Performance)
  3. CTA Section: Call-to-action for collaboration
- **Connections**: 
  - Uses `Heading`, `Paragraph` from Typography
  - Links to `/portfolio` and `/resume` routes
  - Uses Lucide icons (Code2, Briefcase, Zap)

### `src/app/portfolio/page.tsx`
- **Purpose**: Portfolio showcase page (`/portfolio` route)
- **Content**:
  - Header section describing portfolio
  - Featured projects grid
  - Other works grid
  - Each project shows tech stack and links
- **Data**: Uses placeholder data (in production: fetch from Sanity via queries.ts)
- **Connections**:
  - Uses `Heading`, `Paragraph`, `Badge` components
  - Uses `ExternalLink` icon from Lucide
  - [Will integrate]: `FEATURED_PROJECTS_QUERY` and `PROJECTS_QUERY`

### `src/app/resume/page.tsx`
- **Purpose**: Professional resume page (`/resume` route)
- **Sections**:
  1. Header: Dark gradient background
  2. Experience: Work history with timeline (left border accent)
  3. Skills: Organized by category (Frontend, Backend, DevOps)
- **Data**: Uses placeholder data (in production: fetch from Sanity)
- **Connections**:
  - Uses `Heading`, `Paragraph`, `Badge` components
  - Uses Lucide icons (Calendar, MapPin, Award)
  - [Will integrate]: `EXPERIENCE_QUERY` and `SKILLS_QUERY`

### `src/app/studio/layout.tsx`
- **Purpose**: Layout for Sanity Studio route
- **Purpose**: Removes Header/Footer for Studio interface
- **Connections**: Wraps `/studio/[[...index]]` pages

### `src/app/studio/[[...index]]/page.tsx`
- **Purpose**: Dynamic Sanity Studio interface (`/studio/*` routes)
- **Functionality**:
  - Mounts NextStudio component which renders Sanity Studio
  - Passes Sanity config with project ID, dataset, basePath
- **Route Pattern**: `[[...index]]` - catch-all dynamic route
- **Connections**:
  - Imports `defineConfig` from sanity
  - Imports `NextStudio` from next-sanity/studio
  - Renders full Studio at `/studio` and `/studio/*` paths

---

## 🧩 Shared Components

### `src/components/shared/Header.tsx`
- **Purpose**: Responsive navigation header
- **Features**:
  - Logo with gradient background
  - Desktop nav (hidden on mobile)
  - Mobile hamburger menu
  - Links to portfolio, resume, studio
- **State**: Uses `useState` for menu toggle
- **Connections**:
  - Imported by `src/app/layout.tsx`
  - Uses Link from next/link
  - Uses Menu/X icons from lucide-react

### `src/components/shared/Footer.tsx`
- **Purpose**: Site-wide footer
- **Sections**:
  - About paragraph
  - Quick links (Portfolio, Resume, CMS)
  - Social media links (GitHub, LinkedIn, Twitter, Email)
- **Content**: Current year, copyright notice
- **Connections**:
  - Imported by `src/app/layout.tsx`
  - Uses icons from lucide-react (Users, Heart, Share2, Mail)
  - Links to external social profiles

### `src/components/shared/Typography.tsx`
- **Purpose**: Reusable text and label components
- **Exports**:
  - `Heading`: h1-h6 with consistent styling
  - `Paragraph`: p with variant sizes (sm, base, lg)
  - `Badge`: Inline label with variant colors (default, primary, success, warning, error)
- **Props**: Accept HTML attributes + custom props
- **Connections**: 
  - Imported by all page components
  - Used consistently across portfolio, resume, home
  - Example: `<Heading as="h1">Title</Heading>`

### `src/components/portfolio/` (Directory)
- **Purpose**: Portfolio-specific components
- **Future Components**:
  - ProjectCard, ProjectGrid, ProjectFilter, etc.
- **Connections**: Used by `/portfolio` route

### `src/components/resume/` (Directory)
- **Purpose**: Resume-specific components
- **Future Components**:
  - ExperienceTimeline, SkillsGrid, etc.
- **Connections**: Used by `/resume` route

---

## 📊 File Dependency Graph

```
Entry Points:
├── package.json (npm scripts)
├── tsconfig.json (TypeScript)
├── next.config.js (Next.js config)
└── .env.local (Environment variables)

Styling Pipeline:
├── tailwind.config.js
├── postcss.config.js
└── src/styles/globals.css
    └── src/lib/design-tokens.ts

App Structure (Next.js App Router):
└── src/app/layout.tsx (Root Layout)
    ├── src/components/shared/Header.tsx
    ├── main (children)
    │   ├── src/app/page.tsx (Home /)
    │   ├── src/app/portfolio/page.tsx (/portfolio)
    │   ├── src/app/resume/page.tsx (/resume)
    │   └── src/app/studio/[[...index]]/page.tsx (/studio/*)
    └── src/components/shared/Footer.tsx

Component Hierarchy:
├── src/components/shared/Header.tsx
├── src/components/shared/Footer.tsx
├── src/components/shared/Typography.tsx
│   ├── Heading (used in all pages)
│   ├── Paragraph (used in all pages)
│   └── Badge (used in portfolio/resume)
├── src/components/portfolio/ (Portfolio-only)
└── src/components/resume/ (Resume-only)

Data Layer:
├── src/lib/sanity.client.ts
│   ├── Connects to: NEXT_PUBLIC_SANITY_PROJECT_ID
│   ├── Connects to: NEXT_PUBLIC_SANITY_DATASET
│   └── Exports: client, sanityFetch()
├── src/lib/queries.ts
│   ├── PROJECTS_QUERY
│   ├── FEATURED_PROJECTS_QUERY
│   ├── EXPERIENCE_QUERY
│   └── SKILLS_QUERY
└── Used by:
    ├── src/app/portfolio/page.tsx
    └── src/app/resume/page.tsx

CMS Configuration:
├── sanity/sanity.config.ts
│   └── Imports: sanity/schemas/index.ts
└── sanity/schemas/
    ├── index.ts (exports all schemas)
    ├── project.ts
    ├── experience.ts
    └── skill.ts

Docker:
├── Dockerfile (builds container)
└── docker-compose.yml (orchestrates services)
    └── Uses: .env.local
```

---

## 🔗 How Data Flows Through the App

### Portfolio Page Data Flow Example:

```
User visits /portfolio
    ↓
src/app/portfolio/page.tsx renders
    ↓
Component uses FEATURED_PROJECTS_QUERY (src/lib/queries.ts)
    ↓
sanityFetch() from src/lib/sanity.client.ts executes query
    ↓
Query connects via Sanity client to:
    - NEXT_PUBLIC_SANITY_PROJECT_ID
    - NEXT_PUBLIC_SANITY_DATASET
    ↓
Sanity returns project documents matching:
    sanity/schemas/project.ts structure
    ↓
Page maps over projects, renders using:
    - Heading, Paragraph, Badge (src/components/shared/Typography.tsx)
    - Design tokens (src/lib/design-tokens.ts)
    - Global styles (src/styles/globals.css)
    ↓
Browser renders styled components with user data
```

---

## 🚀 Build & Deployment Flow

### Development (`npm run dev`):
```
package.json (dev script)
    ↓
Next.js dev server starts
    ↓
Reads: tsconfig.json, next.config.js, tailwind.config.js
    ↓
Watches: src/ and sanity/ for changes
    ↓
Serves: localhost:3000
```

### Production Build (`npm run build`):
```
package.json (build script)
    ↓
Next.js build process:
    1. TypeScript check (tsconfig.json)
    2. Bundle app (all pages, components, styles)
    3. Tailwind CSS purge (tailwind.config.js)
    4. PostCSS processing (postcss.config.js)
    5. Image optimization (next.config.js)
    ↓
Output: .next/ directory
    ↓
You can then: npm start or docker build
```

### Docker Build:
```
docker build reads: Dockerfile
    ↓
Ignores files from: .dockerignore
    ↓
Stage 1 (Builder):
    - Installs: node_modules
    - Runs: npm run build
    - Creates: .next/ artifact
    ↓
Stage 2 (Runner):
    - Copies: .next/, node_modules (production only), public/
    - Exposes: port 3000
    - Runs: npm start
    ↓
Container ready!
```

---

## 📝 File Organization by Concern

### **Styling (Theme & Design)**
- tailwind.config.js, postcss.config.js
- src/styles/globals.css
- src/lib/design-tokens.ts

### **Layout & Navigation**
- src/app/layout.tsx
- src/components/shared/Header.tsx
- src/components/shared/Footer.tsx

### **Pages & Routes**
- src/app/page.tsx (/)
- src/app/portfolio/page.tsx (/portfolio)
- src/app/resume/page.tsx (/resume)
- src/app/studio/[[...index]]/page.tsx (/studio)

### **Data & CMS**
- src/lib/sanity.client.ts
- src/lib/queries.ts
- sanity/sanity.config.ts
- sanity/schemas/*.ts

### **UI Components**
- src/components/shared/Typography.tsx
- src/components/shared/Header.tsx
- src/components/shared/Footer.tsx

### **Configuration & DevOps**
- package.json, tsconfig.json, next.config.js
- .eslintrc.json, Dockerfile, docker-compose.yml
- .env.local.example, .gitignore, .dockerignore

---

## ✅ Common Tasks & Related Files

### **Add a New Page**
1. Create: `src/app/[route]/page.tsx`
2. Use: Typography components from `src/components/shared/Typography.tsx`
3. Style: Use Tailwind classes + colors from `src/lib/design-tokens.ts`
4. Connect layout: It auto-wraps with `src/app/layout.tsx`

### **Add CMS Content Type**
1. Create: `sanity/schemas/[type].ts`
2. Export: In `sanity/schemas/index.ts`
3. Query: Add to `src/lib/queries.ts`
4. Fetch: Use `sanityFetch()` in pages from `src/lib/sanity.client.ts`

### **Customize Styling**
1. Colors: Edit `src/lib/design-tokens.ts`
2. Tailwind: Edit `tailwind.config.js`
3. Global CSS: Edit `src/styles/globals.css`
4. Component CSS: Use Tailwind classes in `.tsx` files

### **Deploy to Production**
1. Build: `npm run build` (uses next.config.js)
2. Test locally: `npm start`
3. Docker: `docker-compose up -d`
4. Vercel: Push to GitHub, auto-deploys

---

## 🔑 Environment Variables Explained

All required in `.env.local`:

```bash
# Sanity CMS Project Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
  ↓ Used in: src/lib/sanity.client.ts, sanity/sanity.config.ts

NEXT_PUBLIC_SANITY_DATASET=production
  ↓ Used in: src/lib/sanity.client.ts, sanity/sanity.config.ts

NEXT_PUBLIC_SANITY_API_VERSION=2024-04-01
  ↓ Used in: src/lib/sanity.client.ts

SANITY_API_TOKEN=your_optional_write_token
  ↓ Used in: Server-side operations (optional)
```

Note: `NEXT_PUBLIC_*` prefix makes variables available in browser (client-side)

---

This reference guide should help you understand how every file connects and fits into the architecture!
