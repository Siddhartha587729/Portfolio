import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, isBlogCategory, type BlogCategory, categoryLabel } from '@/lib/blog'
import { BlogPostView } from '@/components/blog/blog-post-view'

type PageProps = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params
  if (!isBlogCategory(category)) return {}
  const post = await getPostBySlug(category, slug)
  const title = typeof post?.title === 'string' ? post.title : slug
  return {
    title: `${title} — ${categoryLabel(category as BlogCategory)}`,
    description: typeof post?.excerpt === 'string' ? post.excerpt : undefined,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { category: raw, slug } = await params
  if (!isBlogCategory(raw)) notFound()

  const post = await getPostBySlug(raw, slug)
  if (!post || !post.title) notFound()

  return <BlogPostView post={post} category={raw} />
}
