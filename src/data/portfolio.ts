/**
 * Portfolio marketing copy & featured work. Edit here to update /portfolio.
 * Resume contact/social can stay in content.ts; this mirrors key links for the portfolio footer.
 */

export type PortfolioVisual = 'phone' | 'laptop' | 'browser'

export type FeaturedProject = {
  title: string
  /** Short problem / context for the client */
  problem: string
  /** Your responsibility */
  role: string
  tech: string[]
  /** Optional live or repo link */
  href?: string
  visual: PortfolioVisual
  /** Tailwind gradient for mockup chrome / card accent */
  accentClass: string
}

export type ServiceItem = {
  title: string
  description: string
  icon: 'mobile' | 'web' | 'infra' | 'design'
}

export type ProcessStep = {
  title: string
  description: string
}

export const portfolioContent = {
  hero: {
    headline: "Hi, I'm Siddhartha. I engineer digital experiences from the ground up.",
    subheadline:
      'Specializing in native mobile apps, robust full-stack web platforms, and everything in between.',
    primaryCta: { label: "Let's Build Something", targetId: 'contact' },
    secondaryCta: { label: 'View My Work', targetId: 'work' },
  },

  services: {
    sectionTitle: 'What I Can Do For You',
    sectionSubtitle:
      'Skills translated into outcomes your clients and stakeholders care about.',
    items: [
      {
        title: 'Mobile Development',
        description:
          'Crafting seamless, high-performance Android applications with attention to UX and maintainability.',
        icon: 'mobile',
      },
      {
        title: 'Full-Stack Web',
        description:
          'Building fast, responsive web apps and robust backend architectures that scale with your product.',
        icon: 'web',
      },
      {
        title: 'Infrastructure & DevOps',
        description:
          'Keeping sites scalable, observable, and deployable—CI/CD, containers, and cloud-ready setups.',
        icon: 'infra',
      },
      {
        title: 'UI / UX Design',
        description:
          'Bridging polished interfaces with solid engineering so design intent survives implementation.',
        icon: 'design',
      },
    ] satisfies ServiceItem[],
  },

  featured: {
    sectionTitle: 'Featured Work',
    sectionSubtitle: 'A focused set of builds that show range—mobile, web, and systems thinking.',
    projects: [
      {
        title: 'Custom admin & CMS panel',
        problem:
          'Needed a dynamic way to manage structured content and editorial workflows without brittle hard-coding.',
        role: 'Sole developer — schema design, API layer, and dashboard UI.',
        tech: ['Next.js', 'Sanity', 'TypeScript', 'Tailwind CSS'],
        href: 'https://github.com',
        visual: 'laptop',
        accentClass:
          'from-violet-500/25 via-fuchsia-500/15 to-slate-900/50 dark:from-violet-500/20 dark:to-slate-950/70',
      },
      {
        title: 'Cultural event promo site',
        problem:
          'Required a fast, visually rich landing experience for a local festival with tight launch deadlines.',
        role: 'Frontend lead — layout, motion, and performance budgets.',
        tech: ['React', 'Vite', 'Responsive CSS'],
        href: 'https://example.com',
        visual: 'browser',
        accentClass:
          'from-amber-500/25 via-orange-500/15 to-slate-900/50 dark:from-amber-500/15 dark:to-slate-950/70',
      },
      {
        title: 'Android productivity app',
        problem:
          'Users needed offline-first workflows and a predictable navigation model across device sizes.',
        role: 'Android engineer — architecture, UI, and release pipeline.',
        tech: ['Kotlin', 'Jetpack', 'Material'],
        href: 'https://github.com',
        visual: 'phone',
        accentClass:
          'from-emerald-500/25 via-teal-500/15 to-slate-900/50 dark:from-emerald-500/15 dark:to-slate-950/70',
      },
    ] satisfies FeaturedProject[],
  },

  process: {
    sectionTitle: 'How I Work',
    sectionSubtitle: 'A clear rhythm so you always know what happens next.',
    steps: [
      {
        title: 'Discovery',
        description:
          "Understanding your goals, constraints, and audience—so we're solving the right problem.",
      },
      {
        title: 'Architecture & design',
        description:
          'Choosing the data model, stack, and wireframes that balance speed, cost, and future flexibility.',
      },
      {
        title: 'Development',
        description:
          'Shipping in iterative slices with transparent updates—clean code, tests where they matter.',
      },
      {
        title: 'Handoff & support',
        description:
          'Smooth deployment, documentation, and walkthroughs so your team owns the result with confidence.',
      },
    ] satisfies ProcessStep[],
  },

  about: {
    sectionTitle: 'About Me',
    paragraphs: [
      "I'm driven by continuous learning—shipping products that feel as good to maintain as they do to use.",
      "Away from the keyboard, you'll often find me on the badminton court, in the gym, or deep in a sprawling sci-fi or thriller novel.",
    ],
  },

  contact: {
    sectionTitle: 'Start a conversation',
    sectionSubtitle: "Tell me about your idea—I'll reply with next steps.",
    /** Used with mailto in the form */
    email: 'hello@example.com',
    resumePath: '/resume',
    resumeLabel: 'View résumé page',
  },

  /** Shared across portfolio footer CTA; keep in sync with resume socials if you like */
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
} as const
