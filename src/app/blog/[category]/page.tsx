import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  categoryDescription,
  categoryLabel,
  getPostsByCategory,
  isBlogCategory,
  type BlogCategory,
} from '@/lib/blog'
import { PostCard, type PostListItem } from '@/components/blog/post-card'

type PageProps = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  if (!isBlogCategory(category)) return {}
  return {
    title: `${categoryLabel(category as BlogCategory)} — Blog`,
    description: categoryDescription(category as BlogCategory),
  }
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category: raw } = await params
  if (!isBlogCategory(raw)) notFound()

  const category = raw
  const posts = (await getPostsByCategory(category)) as PostListItem[]

  return (
    <div
      className={
        category === 'tech'
          ? 'min-h-[50vh] bg-slate-950 py-16 text-slate-100 sm:py-20'
          : category === 'books'
            ? 'min-h-[50vh] bg-amber-50/90 py-16 dark:bg-amber-950/25 sm:py-20'
            : 'min-h-[50vh] bg-gradient-to-b from-sky-50 to-white py-16 dark:from-sky-950/40 dark:to-black sm:py-20'
      }
    >
      <div className="container-max">
        <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400">
          ← All blogs
        </Link>
        <header className="mt-6 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">/{category}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {categoryLabel(category)}
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{categoryDescription(category)}</p>
        </header>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600 dark:border-white/20 dark:text-slate-400">
            <p>No posts yet in this category.</p>
            <p className="mt-2 text-sm">Create a post in Sanity Studio and assign the &quot;{category}&quot; category.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} category={category} basePath={`/blog/${category}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
