'use client'

import { FormEvent } from 'react'
import { InlineBold } from '@/components/resume/inline-bold'

type Props = {
  contactEmail: string
  emailPlaceholder: string
  helper: string
  dmNote: string
}

export function ResumeContactForm({
  contactEmail,
  emailPlaceholder,
  helper,
  dmNote,
}: Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const from = String(fd.get('email') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()
    const subject = encodeURIComponent('Hello from your portfolio')
    const body = encodeURIComponent(
      [message, '', from ? `Reply-to / From field: ${from}` : ''].filter(Boolean).join('\n'),
    )
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="resume-contact-email"
            className="mb-2 block text-sm font-semibold text-black dark:text-white"
          >
            Email
          </label>
          <input
            id="resume-contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={emailPlaceholder}
            className="w-full rounded-lg border border-black/10 bg-transparent px-4 py-3 text-black placeholder:text-[#4B5563] outline-none ring-0 transition-shadow focus:border-black/20 focus:ring-2 focus:ring-black/10 dark:border-white/10 dark:text-white dark:placeholder:text-[#A1A1AA] dark:focus:border-white/20 dark:focus:ring-white/10"
          />
        </div>
        <div>
          <label
            htmlFor="resume-contact-message"
            className="mb-2 block text-sm font-semibold text-black dark:text-white"
          >
            Message
          </label>
          <textarea
            id="resume-contact-message"
            name="message"
            rows={5}
            className="w-full resize-y rounded-lg border border-black/10 bg-transparent px-4 py-3 text-black outline-none ring-0 transition-shadow focus:border-black/20 focus:ring-2 focus:ring-black/10 dark:border-white/10 dark:text-white dark:focus:border-white/20 dark:focus:ring-white/10"
          />
          <p className="mt-2 text-sm text-[#4B5563] dark:text-[#A1A1AA]">{helper}</p>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="rounded-lg bg-black px-10 py-3 font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black"
          >
            Submit
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-[#4B5563] dark:text-[#A1A1AA]">
        <InlineBold text={dmNote} />
      </p>
    </div>
  )
}
