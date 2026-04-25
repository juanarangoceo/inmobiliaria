"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function PropertyGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [active, setActive] = useState(0)

  return (
    <section className="mx-auto max-w-[1400px] px-6">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted md:aspect-[21/9] md:rounded-3xl">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src || "/placeholder.svg"}
            alt={`${alt} · imagen ${i + 1}`}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 1400px, 100vw"
            className={cn(
              "object-cover transition-opacity duration-700",
              active === i ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        {/* Counter */}
        <div className="absolute top-5 right-5 rounded-full bg-black/40 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-2 md:mt-6 md:gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver imagen ${i + 1}`}
            aria-pressed={active === i}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-md transition-all md:rounded-lg",
              active === i
                ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt=""
              fill
              sizes="(min-width: 768px) 240px, 25vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  )
}
