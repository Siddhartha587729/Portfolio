'use client'

import { useState } from 'react'
import { Eye } from 'lucide-react'

type Props = {
  label?: string
  text: string
}

export function SpoilerBlock({ label = 'Spoiler', text }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-6 rounded-xl border border-amber-200/80 bg-amber-50/80 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-amber-900 dark:text-amber-100"
      >
        <span>{label}</span>
        <Eye className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
      </button>
      <div
        className={`mt-3 text-sm leading-relaxed text-slate-800 transition-all dark:text-slate-200 ${
          open ? '' : 'blur-md select-none'
        }`}
      >
        {text}
      </div>
      {!open && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Tap to reveal</p>
      )}
    </div>
  )
}
