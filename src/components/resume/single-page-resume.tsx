import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Download, Globe } from 'lucide-react'
import { resumeContent, type EducationItem, type ExperienceItem } from '@/data/content'
import { InlineBold } from '@/components/resume/inline-bold'
import { ResumeBottomNav } from '@/components/resume/resume-bottom-nav'
import { ResumeContactForm } from '@/components/resume/resume-contact-form'
import { IconGithub } from '@/components/resume/brand-icons'

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const muted = 'text-[#4B5563] dark:text-[#A1A1AA]'

export function SinglePageResume() {
  const c = resumeContent

  return (
    <div className="relative bg-white pb-36 text-black dark:bg-black dark:text-white">
      {/* Left accent */}
      <div
        className="pointer-events-none fixed bottom-24 left-3 top-24 hidden w-px bg-linear-to-b from-violet-400 via-blue-400 to-transparent opacity-60 md:block dark:opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed left-2.5 top-24 z-10 hidden h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] md:block"
        aria-hidden
      />

      <div className="container-max relative max-w-3xl">
        {/* Hero */}
        <section id="hero" className="scroll-mt-28 pt-12 sm:pt-16 md:pt-20">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl">
                Hi, I&apos;m {c.name}
              </h1>
              <p className={`mt-4 max-w-xl text-lg font-medium leading-relaxed ${muted}`}>
                {c.tagline}
              </p>
            </div>
            <div className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0 sm:h-32 sm:w-32">
              {c.avatarUrl ? (
                <Image
                  src={c.avatarUrl}
                  alt=""
                  fill
                  className="rounded-full border border-black/10 object-cover dark:border-white/10"
                  sizes="128px"
                  priority
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center rounded-full border border-black/10 bg-linear-to-br from-slate-100 to-slate-200 text-2xl font-bold text-slate-700 dark:border-white/10 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200"
                  aria-hidden
                >
                  {initialsFromName(c.name)}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-28 mt-20 sm:mt-24">
          <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">About</h2>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-base leading-relaxed text-black dark:text-white">
              <InlineBold text={c.about} />
            </p>
            {c.resumeDownloadUrl ? (
              <a
                href={c.resumeDownloadUrl}
                download
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black/5 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/10 sm:self-end"
              >
                Download Resume
                <Download className="h-4 w-4" strokeWidth={2} />
              </a>
            ) : null}
          </div>
        </section>

        {/* Work */}
        <section id="experience" className="scroll-mt-28 mt-16 sm:mt-20">
          <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
            Work Experience
          </h2>
          <ul className="mt-8 space-y-10">
            {c.experience.map((job: ExperienceItem) => (
              <li key={`${job.company}-${job.period}`} className="flex gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10 bg-slate-100 dark:border-white/10 dark:bg-slate-900">
                  {job.logoUrl ? (
                    <Image
                      src={job.logoUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-300">
                      {job.company.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-1 font-semibold text-black dark:text-white">
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 hover:underline"
                          >
                            {job.company}
                            <ChevronRight className="h-4 w-4 opacity-70" />
                          </a>
                        ) : (
                          <span>{job.company}</span>
                        )}
                      </div>
                      <p className={`text-sm ${muted}`}>{job.role}</p>
                    </div>
                    <p className={`shrink-0 text-sm sm:text-right ${muted}`}>{job.period}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section id="education" className="scroll-mt-28 mt-16 sm:mt-20">
          <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">Education</h2>
          <ul className="mt-8 space-y-10">
            {c.education.map((edu: EducationItem) => (
              <li key={`${edu.institution}-${edu.period}`} className="flex gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-black/10 bg-slate-100 dark:border-white/10 dark:bg-slate-900">
                  {edu.logoUrl ? (
                    <Image src={edu.logoUrl} alt="" fill className="object-cover" sizes="48px" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-300">
                      {edu.institution.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <div>
                      <p className="font-semibold text-black dark:text-white">{edu.institution}</p>
                      <p className={`text-sm ${muted}`}>{edu.detail}</p>
                    </div>
                    <p className={`shrink-0 text-sm sm:text-right ${muted}`}>{edu.period}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-28 mt-16 sm:mt-20">
          <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">Skills</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {c.skills.map((s) => (
              <span
                key={s.name}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black px-3 py-1.5 text-sm font-medium text-white dark:border-white/10 dark:bg-white dark:text-black"
              >
                {s.icon ? <span className="text-xs opacity-90">{s.icon}</span> : null}
                {s.name}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-28 mt-20 sm:mt-28">
          <h2 className="text-center text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
            Projects
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-center text-base ${muted}`}>
            {c.projectsIntro}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {c.projects.map((p) => (
              <article
                key={p.title}
                className="group flex flex-col overflow-hidden rounded-xl border border-black/10 bg-white transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-black dark:hover:shadow-black/40"
              >
                <div
                  className={`relative h-44 bg-linear-to-br ${p.gradientClass} border-b border-black/10 dark:border-white/10`}
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-black dark:text-white">{p.title}</h3>
                  <p className={`mt-1 text-sm ${muted}`}>{p.timeline}</p>
                  <p className={`mt-3 flex-1 text-sm leading-relaxed ${muted}`}>{p.description}</p>
                  <p className="mt-4 text-xs font-medium tracking-wide text-[#4B5563] dark:text-[#A1A1AA]">
                    {p.tags.join(' · ')}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-end gap-2">
                    {p.websiteUrl ? (
                      <Link
                        href={p.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Website
                      </Link>
                    ) : null}
                    {p.sourceUrl ? (
                      <Link
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
                      >
                        <IconGithub className="h-3.5 w-3.5" />
                        Source
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-28 mt-20 pb-8 sm:mt-28">
          <h2 className="text-center text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
            {c.contact.headline}
          </h2>
          <div className="mt-12">
            <ResumeContactForm
              contactEmail={c.contact.email}
              emailPlaceholder={c.contact.emailPlaceholder}
              helper={c.contact.helper}
              dmNote={c.contact.dmNote}
            />
          </div>
        </section>
      </div>

      <ResumeBottomNav social={c.social} />
    </div>
  )
}
