import Link from 'next/link'
import { BLOG_CATEGORIES, categoryDescription, categoryLabel } from '@/lib/blog'

export const metadata = {
  title: 'Blog',
  description: 'Personal notes, book reviews, and technical writing.',
}

export default function BlogHubPage() {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white py-16 dark:border-white/10 dark:from-slate-950 dark:to-black sm:py-24">
      <div className="container-max">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Three lanes—life, literature, and engineering. Pick a lane to browse posts from Sanity Studio.
        </p>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {BLOG_CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link
                href={`/blog/${cat}`}
                className="block h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-500/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/30"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  /{cat}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{categoryLabel(cat)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {categoryDescription(cat)}
                </p>
                <span className="mt-6 inline-flex text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
