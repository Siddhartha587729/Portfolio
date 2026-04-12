import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

type GalleryImage = {
  _key: string
  asset?: { _ref?: string }
  caption?: string
}

type Props = {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: Props) {
  if (!images?.length) return null

  return (
    <div className="columns-1 gap-4 sm:columns-2">
      {images.map((img) => {
        if (!img.asset) return null
        const src = urlFor(img).width(900).url()
        return (
          <figure key={img._key} className="mb-4 break-inside-avoid">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Image
                src={src}
                alt={img.caption || ''}
                width={900}
                height={1200}
                className="h-auto w-full object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            {img.caption ? (
              <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{img.caption}</figcaption>
            ) : null}
          </figure>
        )
      })}
    </div>
  )
}
