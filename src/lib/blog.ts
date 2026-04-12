import { sanityFetch } from '@/lib/sanity.client'
import { POST_BY_SLUG_AND_CATEGORY_QUERY, POSTS_BY_CATEGORY_QUERY } from '@/lib/queries'

export const BLOG_CATEGORIES = ['personal', 'books', 'tech'] as const
export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export function isBlogCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value)
}

export async function getPostsByCategory(category: BlogCategory) {
  try {
    return await sanityFetch<unknown[]>({
      query: POSTS_BY_CATEGORY_QUERY,
      params: { category },
    })
  } catch (e) {
    console.error('Sanity posts fetch failed:', e)
    return []
  }
}

export async function getPostBySlug(category: BlogCategory, slug: string) {
  try {
    return await sanityFetch<Record<string, unknown> | null>({
      query: POST_BY_SLUG_AND_CATEGORY_QUERY,
      params: { category, slug },
    })
  } catch (e) {
    console.error('Sanity post fetch failed:', e)
    return null
  }
}

export function categoryLabel(category: BlogCategory): string {
  switch (category) {
    case 'personal':
      return 'Off-screen log'
    case 'books':
      return 'Bookshelf'
    case 'tech':
      return 'Terminal'
    default:
      return category
  }
}

export function categoryDescription(category: BlogCategory): string {
  switch (category) {
    case 'personal':
      return 'Travel, sport, and life updates—visual and casual.'
    case 'books':
      return 'Reviews and rants—spoilers optional.'
    case 'tech':
      return 'Architecture notes, tutorials, and experiments.'
    default:
      return ''
  }
}
