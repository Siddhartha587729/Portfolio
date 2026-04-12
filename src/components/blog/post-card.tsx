import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { StarRating } from '@/components/blog/star-rating'

export type PostListItem = {
  _id: string
  title: string
  slug?: { current?: string }
  excerpt?: string
  publishedAt?: string
  coverImage?: { asset?: unknown }
  rating?: number
  author?: string
  repositoryUrl?: string
}

type Props = {
  post: PostListItem
  category: 'personal' | 'books' | 'tech'
  basePath: string
}

export function PostCard({ post, category, basePath }: Props) {
  const slug = post.slug?.current
  if (!slug) return null

  const href = `${basePath}/${slug}`
  const cover = post.coverImage?.asset ? urlFor(post.coverImage).width(800).height(500).url() : null

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]">
      <Link href={href} className="block">
        {cover ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-white/5">
            <Image
              src={cover}
              alt=""
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </div>
        ) : (
          <div
            className={`aspect-[16/10] w-full ${
              category === 'tech'
                ? 'bg-gradient-to-br from-slate-900 to-slate-800'
                : category === 'books'
                  ? 'bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-950/40 dark:to-slate-900'
                  : 'bg-gradient-to-br from-sky-100 to-indigo-50 dark:from-sky-950/40 dark:to-slate-900'
            }`}
          />
        )}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
            {post.publishedAt ? (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            ) : null}
            {category === 'books' && typeof post.rating === 'number' ? (
              <StarRating value={post.rating} />
            ) : null}
            {category === 'books' && post.author ? <span>by {post.author}</span> : null}
            {category === 'tech' && post.repositoryUrl ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700 dark:bg-white/10 dark:text-slate-300">
                repo
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  )
}
