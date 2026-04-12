'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { urlFor } from '@/lib/sanity.image'
import { SpoilerBlock } from '@/components/blog/spoiler-block'

type Variant = 'tech' | 'books' | 'personal'

type Props = {
  value: unknown
  variant: Variant
}

function codeTheme(variant: Variant) {
  return variant === 'tech' ? oneDark : vs
}

export function PortableTextBody({ value, variant }: Props) {
  const codeStyle = codeTheme(variant)

  const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-slate-900 first:mt-0 dark:text-white">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-8 mb-3 text-xl font-semibold text-slate-900 dark:text-white">{children}</h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500/60 pl-4 italic text-slate-700 dark:text-slate-300">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="mb-4 text-slate-700 dark:text-slate-300">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-slate-900 dark:text-white">{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => (
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800 dark:bg-white/10 dark:text-slate-100">
          {children}
        </code>
      ),
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null
        const src = urlFor(value).width(1200).url()
        return (
          <figure className="my-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
              <Image src={src} alt={value.alt || ''} fill className="object-cover" sizes="(min-width: 1024px) 720px, 100vw" />
            </div>
            {value.caption ? (
              <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{value.caption}</figcaption>
            ) : null}
          </figure>
        )
      },
      codeBlock: ({ value }: { value?: { language?: string; code?: string } }) => {
        const language = value?.language || 'typescript'
        const code = value?.code || ''
        return (
          <div className="my-6 overflow-hidden rounded-xl border border-slate-200 text-sm shadow-sm dark:border-white/10">
            <SyntaxHighlighter
              language={language}
              style={codeStyle}
              customStyle={{
                margin: 0,
                padding: '1rem',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
              }}
              PreTag="div"
            >
              {code}
            </SyntaxHighlighter>
          </div>
        )
      },
      spoiler: ({ value }: { value?: { label?: string; text?: string } }) => (
        <SpoilerBlock label={value?.label} text={value?.text || ''} />
      ),
    },
  }

  return (
    <div className="prose-portable max-w-none">
      <PortableText value={value as never} components={components} />
    </div>
  )
}
