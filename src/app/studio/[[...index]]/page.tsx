'use client'

import { defineConfig } from 'sanity'
import { NextStudio } from 'next-sanity/studio'

const config = defineConfig({
  name: 'portfolio-studio',
  title: 'Portfolio CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  schema: {
    types: [],
  },
})

export default function StudioPage() {
  return <NextStudio config={config} />
}
