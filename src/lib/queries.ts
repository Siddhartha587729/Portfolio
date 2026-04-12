/**
 * Sanity Query Utilities
 * Pre-built queries for fetching different types of content
 */

export const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  image,
  technologies,
  externalUrl,
  startDate,
  endDate,
  featured,
  publishedAt,
}`

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  image,
  technologies,
  externalUrl,
  startDate,
  endDate,
  featured,
  publishedAt,
}`

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  content,
  image,
  technologies,
  externalUrl,
  startDate,
  endDate,
  featured,
  publishedAt,
}`

export const EXPERIENCE_QUERY = `*[_type == "experience"] | order(startDate desc) {
  _id,
  company,
  position,
  description,
  highlights,
  technologies,
  startDate,
  endDate,
  isCurrent,
  location,
  companyUrl,
  order,
}`

export const SKILLS_QUERY = `*[_type == "skill"] | order(order asc) {
  _id,
  name,
  category,
  proficiency,
  years,
  description,
  relatedProjects,
  order,
}`

export const SKILLS_BY_CATEGORY_QUERY = `*[_type == "skill" && category == $category] | order(order asc) {
  _id,
  name,
  category,
  proficiency,
  years,
  description,
  order,
}`

export const POSTS_BY_CATEGORY_QUERY = `*[_type == "post" && category == $category] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  category,
  rating,
  author,
  repositoryUrl,
}`

export const POST_BY_SLUG_AND_CATEGORY_QUERY = `*[_type == "post" && slug.current == $slug && category == $category][0] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  category,
  rating,
  author,
  repositoryUrl,
  body,
  gallery,
}`
