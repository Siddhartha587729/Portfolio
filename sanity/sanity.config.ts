/**
 * Sanity Studio Configuration
 * Configure access to Sanity CMS with project ID and dataset
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

const fallbackProjectId = 'o8773x9o'
const fallbackDataset = 'production'

type EnvMap = Record<string, string | undefined>
const viteEnv = ((import.meta as unknown as { env?: EnvMap }).env || {}) as EnvMap

function normalizeEnvValue(value: string | undefined): string {
  if (!value) return ''

  // Handles accidental quoting in .env values: PROJECT_ID="abc123"
  return value.trim().replace(/^['\"]|['\"]$/g, '')
}

function pickValidProjectId(values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    const normalized = normalizeEnvValue(value)

    if (/^[a-z0-9-]+$/.test(normalized)) {
      return normalized
    }
  }

  return undefined
}

const projectId = pickValidProjectId([
  viteEnv.SANITY_STUDIO_PROJECT_ID,
  viteEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
  process.env.SANITY_STUDIO_PROJECT_ID,
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  fallbackProjectId,
])

if (!projectId) {
  throw new Error(
    'Invalid Sanity projectId. Set SANITY_STUDIO_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) to a valid value containing only a-z, 0-9, and dashes.',
  )
}

const dataset =
  normalizeEnvValue(viteEnv.SANITY_STUDIO_DATASET) ||
  normalizeEnvValue(viteEnv.NEXT_PUBLIC_SANITY_DATASET) ||
  normalizeEnvValue(process.env.SANITY_STUDIO_DATASET) ||
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) ||
  fallbackDataset

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
