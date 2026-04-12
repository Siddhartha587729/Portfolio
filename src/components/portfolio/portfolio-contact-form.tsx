'use client'

import { FormEvent } from 'react'

type Props = {
  contactEmail: string
}

export function PortfolioContactForm({ contactEmail }: Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const from = String(fd.get('email') ?? '').trim()
    const details = String(fd.get('details') ?? '').trim()
    const subject = encodeURIComponent(`Project inquiry from ${name || 'portfolio'}`)
    const body = encodeURIComponent(
      [details, '', name ? `Name: ${name}` : '', from ? `Email: ${from}` : ''].filter(Boolean).join('\n'),
    )
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-5">
      <div>
        <label htmlFor="pf-name" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Name
        </label>
        <input
          id="pf-name"
          name="name"
          type="text"
          autoComplete="name"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
        />
      </div>
      <div>
        <label htmlFor="pf-email" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Email
        </label>
        <input
          id="pf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-black dark:text-white dark:focus:border-white/30 dark:focus:ring-white/10"
        />
      </div>
      <div>
        <label htmlFor="pf-details" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Project details
        </label>
        <textarea
          id="pf-details"
          name="details"
          rows={5}
          required
          placeholder="What are we building, timeline, and any links?"
          className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none ring-0 transition-shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white/30 dark:focus:ring-white/10"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-slate-200"
      >
        Send message
      </button>
    </form>
  )
}
