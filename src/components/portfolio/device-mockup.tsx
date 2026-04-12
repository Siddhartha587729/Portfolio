import type { PortfolioVisual } from '@/data/portfolio'

type Props = {
  variant: PortfolioVisual
  accentClass: string
  title: string
}

export function DeviceMockup({ variant, accentClass, title }: Props) {
  if (variant === 'phone') {
    return (
      <div className="relative mx-auto flex h-[280px] w-[140px] shrink-0 items-center justify-center sm:h-[320px] sm:w-[160px]">
        <div className="absolute inset-0 rounded-[2rem] border border-slate-300 bg-slate-950 shadow-xl dark:border-white/10" />
        <div
          className={`absolute inset-[10px] rounded-[1.5rem] bg-gradient-to-br ${accentClass}`}
          aria-hidden
        />
        <div className="relative z-10 px-4 text-center">
          <p className="text-[10px] font-medium text-white/90 drop-shadow">{title}</p>
        </div>
        <div className="absolute bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/20" aria-hidden />
      </div>
    )
  }

  if (variant === 'laptop') {
    return (
      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-t-lg border border-slate-300 bg-slate-800 shadow-xl dark:border-white/10">
          <div className="flex h-6 items-center gap-1.5 border-b border-white/10 px-3">
            <span className="h-2 w-2 rounded-full bg-red-400/90" />
            <span className="h-2 w-2 rounded-full bg-amber-400/90" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
          </div>
          <div className={`relative aspect-[16/10] w-full bg-gradient-to-br ${accentClass}`}>
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="text-sm font-medium text-white drop-shadow">{title}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto h-2 w-[108%] -translate-x-[4%] rounded-b-lg bg-slate-300 shadow dark:bg-slate-600" />
        <div className="mx-auto mt-1 h-3 w-24 rounded-b-md bg-slate-400/80 dark:bg-slate-500" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900">
        <div className="flex h-9 items-center gap-2 border-b border-slate-200 px-3 dark:border-white/10">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
          </div>
          <div className="mx-auto flex-1 truncate rounded-md bg-slate-100 px-3 py-1 text-center text-xs text-slate-500 dark:bg-white/5 dark:text-slate-400">
            {title.toLowerCase().replace(/\s+/g, '-')}.app
          </div>
        </div>
        <div className={`relative aspect-[16/9] w-full bg-gradient-to-br ${accentClass}`}>
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="text-sm font-medium text-white drop-shadow">{title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
