import Link from 'next/link'
import { ArrowDown, Code2, Smartphone, Globe, Server, Palette, ExternalLink, FileText } from 'lucide-react'
import { portfolioContent } from '@/data/portfolio'
import { DeviceMockup } from '@/components/portfolio/device-mockup'
import { PortfolioContactForm } from '@/components/portfolio/portfolio-contact-form'

const serviceIcons = {
  mobile: Smartphone,
  web: Globe,
  infra: Server,
  design: Palette,
} as const

export function PortfolioPageView() {
  const { hero, services, featured, process, about, contact, social } = portfolioContent

  return (
    <div className="bg-white dark:bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),_transparent_55%)]" />
        <div className="container-max relative py-20 sm:py-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-300/90">Portfolio</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{hero.subheadline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={`#${hero.primaryCta.targetId}`} className="btn-primary shadow-lg shadow-blue-500/20">
              {hero.primaryCta.label}
            </a>
            <a
              href={`#${hero.secondaryCta.targetId}`}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              {hero.secondaryCta.label}
              <ArrowDown className="ml-2 h-4 w-4 opacity-80" />
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 border-b border-slate-200 py-16 sm:py-24 dark:border-white/10">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {services.sectionTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{services.sectionSubtitle}</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((item) => {
              const Icon = serviceIcons[item.icon]
              return (
                <div
                  key={item.title}
                  className="card dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section id="work" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24 dark:bg-white/[0.02]">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {featured.sectionTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{featured.sectionSubtitle}</p>
          </div>

          <div className="mt-14 flex flex-col gap-16">
            {featured.projects.map((project, index) => (
              <article
                key={project.title}
                className="card flex flex-col gap-10 border-slate-200/80 p-0 overflow-hidden dark:border-white/10 dark:bg-white/[0.03] lg:flex-row lg:items-stretch"
              >
                <div
                  className={`flex flex-1 items-center justify-center p-8 lg:w-1/2 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <DeviceMockup variant={project.visual} accentClass={project.accentClass} title={project.title} />
                </div>
                <div className="flex flex-1 flex-col justify-center border-t border-slate-200 p-8 dark:border-white/10 lg:border-t-0 lg:border-l lg:py-12">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                  <dl className="mt-6 space-y-4 text-sm sm:text-base">
                    <div>
                      <dt className="font-semibold text-slate-500 dark:text-slate-500">Problem</dt>
                      <dd className="mt-1 text-slate-700 dark:text-slate-300">{project.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500 dark:text-slate-500">Role</dt>
                      <dd className="mt-1 text-slate-700 dark:text-slate-300">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500 dark:text-slate-500">Tech</dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-300"
                          >
                            {t}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 border-b border-slate-200 py-16 sm:py-24 dark:border-white/10">
        <div className="container-max">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {process.sectionTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{process.sectionSubtitle}</p>
          </div>
          <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, i) => (
              <li key={step.title} className="relative rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-black">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24 dark:bg-white/[0.02]">
        <div className="container-max">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {about.sectionTitle}
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 border-t border-slate-200 py-16 sm:py-24 dark:border-white/10">
        <div className="container-max">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {contact.sectionTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{contact.sectionSubtitle}</p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr,1.1fr] lg:items-start">
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-slate-600 dark:text-slate-400">
                Prefer email? Reach me at{' '}
                <a href={`mailto:${contact.email}`} className="font-semibold text-blue-600 dark:text-blue-400">
                  {contact.email}
                </a>
                .
              </p>
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-blue-500/50 hover:text-blue-600 dark:border-white/15 dark:text-slate-200 dark:hover:text-white"
                >
                  <Code2 className="h-4 w-4" aria-hidden /> GitHub
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-blue-500/50 hover:text-blue-600 dark:border-white/15 dark:text-slate-200 dark:hover:text-white"
                >
                  <Globe className="h-4 w-4" aria-hidden /> LinkedIn
                </a>
                <Link
                  href={contact.resumePath}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-blue-500/50 hover:text-blue-600 dark:border-white/15 dark:text-slate-200 dark:hover:text-white"
                >
                  <FileText className="h-4 w-4" /> {contact.resumeLabel}
                </Link>
              </div>
            </div>
            <PortfolioContactForm contactEmail={contact.email} />
          </div>
        </div>
      </section>
    </div>
  )
}
