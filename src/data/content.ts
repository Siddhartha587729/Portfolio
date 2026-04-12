/**
 * Single-page resume content. Replace with Sanity queries later.
 */

export type SocialLinks = {
  github: string
  linkedin: string
  twitter: string
}

export type ExperienceItem = {
  company: string
  role: string
  /** e.g. "December 2024 - Present" */
  period: string
  /** Optional company site for the chevron link */
  url?: string
  /** Remote logo URL (add host to next.config images if needed) */
  logoUrl?: string
}

export type EducationItem = {
  institution: string
  detail: string
  period: string
  logoUrl?: string
}

export type SkillItem = {
  name: string
  /** Optional emoji or single character for the badge */
  icon?: string
}

export type ProjectItem = {
  title: string
  timeline: string
  description: string
  tags: string[]
  websiteUrl?: string
  sourceUrl?: string
  /** Tailwind gradient classes for the card header area */
  gradientClass: string
}

export const resumeContent = {
  name: 'Your Name',
  tagline: 'A developer building cool solutions with open source technologies.',
  /** Optional — shown as circular avatar; omit to use initials */
  avatarUrl: undefined as string | undefined,
  /** Plain text; wrap phrases in **double asterisks** for bold */
  about:
    'I am a **Platform Engineer** passionate about **Artificial Intelligence** and **System Architecture**. I enjoy shipping reliable systems and learning in public.',
  resumeDownloadUrl: '/resume.pdf',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
  } satisfies SocialLinks,
  experience: [
    {
      company: 'Example Corp',
      role: 'Senior Engineer',
      period: 'December 2024 - Present',
      url: 'https://example.com',
    },
    {
      company: 'Another Co',
      role: 'Software Engineer',
      period: 'June 2022 - November 2024',
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      institution: 'Your University',
      detail: 'B.Tech in Computer Science — CGPA 9.0',
      period: '2022 - 2026',
    },
    {
      institution: 'Your School',
      detail: 'High School',
      period: '2018 - 2022',
    },
  ] satisfies EducationItem[],
  skills: [
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'React', icon: '⚛' },
    { name: 'Tailwind CSS', icon: '~' },
    { name: 'Node.js', icon: '⬢' },
  ] satisfies SkillItem[],
  /** Shown under the Projects heading */
  projectsIntro:
    'I like to build projects. I have built a lot of projects, here are just some of my favorites.',
  projects: [
    {
      title: 'Sample Project One',
      timeline: 'Nov 2024 - Present',
      description:
        'A concise description of what you built, the problem it solves, and the impact.',
      tags: ['Next.js', 'TypeScript', 'Vercel'],
      websiteUrl: 'https://example.com',
      sourceUrl: 'https://github.com',
      gradientClass:
        'from-emerald-500/30 via-emerald-600/20 to-teal-900/40 dark:from-emerald-500/20 dark:to-teal-950/60',
    },
    {
      title: 'Sample Project Two',
      timeline: 'Aug 2024 - Oct 2024',
      description:
        'Another project summary highlighting your role and the tech you reached for.',
      tags: ['React', 'Python', 'PostgreSQL'],
      websiteUrl: 'https://example.com',
      sourceUrl: 'https://github.com',
      gradientClass:
        'from-slate-600/40 via-slate-700/30 to-slate-900/50 dark:from-slate-700/30 dark:to-black/80',
    },
  ] satisfies ProjectItem[],
  contact: {
    headline: 'Get in Touch',
    /** Used for mailto from the form */
    email: 'hello@example.com',
    helper: 'Ask me anything you would like. I always respond :D',
    dmNote:
      'Or just want to have a casual chat? you can just shoot me a dm on **Twitter** or **LinkedIn**.',
    emailPlaceholder: 'example-email@gmail.com',
  },
}
