'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  Home,
  FileText,
  Briefcase,
  GraduationCap,
  Layers,
  LayoutGrid,
  Mail,
  Moon,
  Sun,
} from 'lucide-react'
import type { SocialLinks } from '@/data/content'
import { IconGithub, IconLinkedin } from '@/components/resume/brand-icons'

const sectionLinks = [
  { href: '#hero', icon: Home, label: 'Home' },
  { href: '#about', icon: FileText, label: 'About' },
  { href: '#experience', icon: Briefcase, label: 'Work' },
  { href: '#education', icon: GraduationCap, label: 'Education' },
  { href: '#skills', icon: Layers, label: 'Skills' },
  { href: '#projects', icon: LayoutGrid, label: 'Projects' },
  { href: '#contact', icon: Mail, label: 'Contact' },
] as const

/** Keep bar usable on small screens */
const navScroll =
  'max-w-[min(100vw-1rem,56rem)] overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

type Props = {
  social: SocialLinks
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function ResumeBottomNav({ social }: Props) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'

  return (
    <nav
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-black/10 bg-white/70 px-2 py-2 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-black/70 dark:shadow-black/40 sm:px-3 ${navScroll}`}
      aria-label="Resume sections and theme"
    >
      <div className="flex w-max min-w-0 flex-nowrap items-center gap-0.5 sm:gap-1">
      {sectionLinks.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className="rounded-full p-2.5 text-[#4B5563] transition-colors hover:bg-black/5 hover:text-black dark:text-[#A1A1AA] dark:hover:bg-white/10 dark:hover:text-white"
          aria-label={label}
          title={label}
        >
          <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
        </Link>
      ))}

      <span
        className="mx-1 hidden h-6 w-px shrink-0 bg-black/10 sm:inline dark:bg-white/10"
        aria-hidden
      />

      <a
        href={social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-2.5 text-[#4B5563] transition-colors hover:bg-black/5 hover:text-black dark:text-[#A1A1AA] dark:hover:bg-white/10 dark:hover:text-white"
        aria-label="GitHub"
      >
        <IconGithub className="h-5 w-5 shrink-0" />
      </a>
      <a
        href={social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-2.5 text-[#4B5563] transition-colors hover:bg-black/5 hover:text-black dark:text-[#A1A1AA] dark:hover:bg-white/10 dark:hover:text-white"
        aria-label="LinkedIn"
      >
        <IconLinkedin className="h-5 w-5 shrink-0" />
      </a>
      <a
        href={social.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full p-2.5 text-[#4B5563] transition-colors hover:bg-black/5 hover:text-black dark:text-[#A1A1AA] dark:hover:bg-white/10 dark:hover:text-white"
        aria-label="X"
      >
        <XIcon className="h-5 w-5 shrink-0" />
      </a>

      <span className="mx-1 h-6 w-px shrink-0 bg-black/10 dark:bg-white/10" aria-hidden />

      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="rounded-full p-2.5 text-[#4B5563] transition-colors hover:bg-black/5 hover:text-black dark:text-[#A1A1AA] dark:hover:bg-white/10 dark:hover:text-white"
        aria-label={mounted && isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title="Toggle theme"
      >
        {!mounted ? (
          <Sun className="h-5 w-5 shrink-0 opacity-50" strokeWidth={1.75} />
        ) : isDark ? (
          <Sun className="h-5 w-5 shrink-0" strokeWidth={1.75} />
        ) : (
          <Moon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
        )}
      </button>
      </div>
    </nav>
  )
}
