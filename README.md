# Master Portfolio Hub

A comprehensive Next.js 14+ portfolio platform with integrated Sanity CMS, built for performance, scalability, and easy deployment.

## Features

- **🎨 Modern Stack**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **📝 Headless CMS**: Sanity Studio for content management
- **🏗️ Modular Routing**: Separate portfolio and resume sections sharing CMS data
- **🎯 Shared Components**: Consistent design tokens and reusable UI components
- **🐳 Docker Ready**: Multi-stage Docker builds and docker-compose orchestration
- **🚀 Production Ready**: Optimized for Vercel and standalone Node.js deployment
- **🎨 Icons**: Lucide React for beautiful, customizable icons
- **📱 Responsive Design**: Mobile-first, fully responsive UI

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── portfolio/          # Portfolio route
│   │   ├── resume/             # Resume route
│   │   └── studio/             # Sanity Studio route
│   ├── components/
│   │   ├── shared/             # Shared components (Header, Footer, Typography)
│   │   ├── portfolio/          # Portfolio-specific components
│   │   └── resume/             # Resume-specific components
│   ├── lib/
│   │   ├── design-tokens.ts    # Design tokens (colors, typography, spacing)
│   │   ├── queries.ts          # Sanity GROQ queries
│   │   └── sanity.client.ts    # Sanity client configuration
│   └── styles/
│       └── globals.css         # Global Tailwind CSS styles
├── sanity/
│   ├── sanity.config.ts        # Sanity Studio configuration
│   └── schemas/
│       ├── project.ts          # Project schema
│       ├── experience.ts        # Experience schema
│       ├── skill.ts            # Skills schema
│       └── index.ts            # Schema types export
├── public/                     # Static assets
├── Dockerfile                  # Multi-stage Docker build
├── docker-compose.yml          # Docker Compose orchestration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ (or 20 for best compatibility)
- npm, yarn, or pnpm package manager
- Docker & Docker Compose (optional, for containerization)

### Installation

1. **Clone and navigate**:
   ```bash
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Sanity project credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-04-01
   SANITY_API_TOKEN=your_api_token
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run TypeScript type checking
- `npm run studio` - Start Sanity Studio locally

## Sanity CMS Setup

### Initialize Sanity Project

1. **Create Sanity project** (if not already created):
   ```bash
   npm run sanity -- init
   ```

2. **Deploy Sanity schema**:
   ```bash
   npm run sanity -- deploy
   ```

### Available Schemas

- **Project**: Portfolio projects with description, technologies, dates, and links
- **Experience**: Work experience with company, position, dates, and skills
- **Skill**: Technical skills with categories, proficiency levels, and related projects

All three schemas are configured to be shared across both Portfolio and Resume routes, allowing different renderings of the same data.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in project settings
4. Deploy with one click

```bash
vercel deploy
```

### Docker Deployment

1. **Build image**:
   ```bash
   docker build -t portfolio:latest .
   ```

2. **Using docker-compose**:
   ```bash
   docker-compose up -d
   ```

3. **Access application**:
   - Portfolio: [http://localhost:3000](http://localhost:3000)
   - Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### Self-Hosted (Node.js)

1. Build application:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

3. Configure reverse proxy (nginx, Apache, etc.)
4. Use PM2 or systemd for process management

## Customization

### Design Tokens

Customize colors, typography, and spacing in `src/lib/design-tokens.ts`:

```typescript
export const colors = {
  primary: '#0F172A',
  secondary: '#1E293B',
  accent: '#3B82F6',
  // ...
}
```

### Shared Components

Create reusable components in `src/components/shared/` and use them in both portfolio and resume sections for consistency.

### Tailwind CSS

Extend Tailwind configuration in `tailwind.config.js` to customize theme colors, fonts, and utilities.

## Performance Optimization

- **Image Optimization**: Automatic image optimization via Next.js Image component
- **Code Splitting**: Automatic route-based code splitting
- **CSS Optimization**: Tailwind CSS purge minimizes CSS bundle
- **Sanity CDN**: Leverages Sanity's global CDN for fast data delivery
- **Caching**: Configured for optimal caching headers in production

## Best Practices

1. **Use shared components** across routes to maintain consistency
2. **Leverage design tokens** instead of hardcoding values
3. **Fetch data at build time** using Next.js static generation when possible
4. **Optimize images** and use proper formats (WebP, AVIF)
5. **Test responsive design** across multiple devices
6. **Use TypeScript** for type safety throughout the application

## API Routes (Optional)

Create API routes in `src/app/api/` for backend functionality:

```typescript
// src/app/api/projects/route.ts
export async function GET() {
  // Fetch projects from Sanity
}
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | ✓ |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | ✓ |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version | ✓ |
| `SANITY_API_TOKEN` | Sanity write token | For publishing |

## Troubleshooting

### Sanity Connection Issues

1. Verify project ID and dataset in `.env.local`
2. Check API token permissions in Sanity dashboard
3. Ensure network connectivity to Sanity's API

### Build Errors

1. Clear `.next` directory: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check TypeScript files for type errors: `npm run type-check`

### Docker Issues

1. Ensure Docker daemon is running
2. Check available disk space
3. Review Docker logs: `docker-compose logs`

## Technologies

- **Frontend**: React 19, Next.js 14, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **CMS**: Sanity
- **Deployment**: Vercel, Docker, Node.js
- **Development**: ESLint, TypeScript, Tailwind CSS

## Ideas

- Hello i am siddhartha, and this is my website: Loader with off black line accross on completely white background with black text loading like simmers. The time will be used to cache all the data from database. Also once cached this loader will not show on furtherm reload.

## License

MIT - Feel free to use this project as a template for your portfolio.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Support

For questions or issues, check the following:
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)

---

**Built with ❤️ using Next.js, React, and Sanity**
