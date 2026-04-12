import { Star } from 'lucide-react'

type Props = {
  value: number
  max?: number
}

export function StarRating({ value, max = 5 }: Props) {
  const safe = Math.min(max, Math.max(0, Math.round(value)))
  return (
    <div className="flex items-center gap-0.5" aria-label={`${safe} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < safe ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}
