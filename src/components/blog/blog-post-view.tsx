import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { urlFor } from '@/lib/sanity.image'
import { PortableTextBody } from '@/components/blog/portable-text-body'
import { GalleryGrid } from '@/components/blog/gallery-grid'
import { StarRating } from '@/components/blog/star-rating'
import type { BlogCategory } from '@/lib/blog'
import { categoryLabel } from '@/lib/blog'

type GalleryImage = { _key: string; asset?: { _ref?: string }; caption?: string }

type Props = {
  post: {
    title?: string
    excerpt?: string
    publishedAt?: string
    coverImage?: { asset?: unknown }
    rating?: number
    author?: string
    repositoryUrl?: string
    body?: unknown
    gallery?: GalleryImage[]
  }
  category: BlogCategory
}

export function BlogPostView({ post, category }: Props) {
  const variant = category === 'tech' ? 'tech' : category === 'books' ? 'books' : 'personal'
  const cover = post.coverImage?.asset
    ? urlFor(post.coverImage as Parameters<typeof urlFor>[0]).width(1400).url()
    : null

  const shell =
    category === 'tech'
      ? 'bg-slate-950 text-slate-100'
      : category === 'books'
        ? 'bg-amber-50/80 text-amber-950 dark:bg-amber-950/20 dark:text-amber-50'
        : 'bg-sky-50/80 text-slate-900 dark:bg-sky-950/30 dark:text-slate-100'

  return (
    <article className={`min-h-[60vh] ${shell}`}>
      <div className="container-max py-10 sm:py-14">
        <Link
          href={`/blog/${category}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {categoryLabel(category)}
        </Link>

        <header className="mx-auto mt-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {categoryLabel(category)}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          {post.publishedAt ? (
            <time
              dateTime={post.publishedAt}
              className="mt-3 block text-sm text-slate-500 dark:text-slate-400"
            >
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          ) : null}

          {category === 'books' && typeof post.rating === 'number' ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StarRating value={post.rating} />
              {post.author ? (
                <span className="text-sm text-slate-600 dark:text-slate-300">by {post.author}</span>
              ) : null}
            </div>
          ) : null}

          {category === 'tech' && post.repositoryUrl ? (
            <a
              href={post.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-sm text-blue-300 hover:bg-white/10"
            >
              Repository
            </a>
          ) : null}

          {post.excerpt ? (
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{post.excerpt}</p>
          ) : null}
        </header>

        {cover ? (
          <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 shadow-lg dark:border-white/10">
            <div className="relative aspect-[16/9] w-full">
              <Image src={cover} alt="" fill className="object-cover" priority sizes="(min-width: 1024px) 896px, 100vw" />
            </div>
          </div>
        ) : null}

        {category === 'personal' && post.gallery && post.gallery.length > 0 ? (
          <div className="mx-auto mt-12 max-w-4xl">
            <GalleryGrid images={post.gallery} />
          </div>
        ) : null}

        <div
          className={`mx-auto mt-12 max-w-3xl ${
            category === 'tech' ? 'rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-10' : ''
          }`}
        >
          {post.body ? <PortableTextBody value={post.body} variant={variant} /> : null}
        </div>
      </div>
    </article>
  )
}
