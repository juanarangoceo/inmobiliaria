"use client"

import { useEffect } from "react"
import { ArrowUpRight, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="relative flex min-h-screen flex-col justify-center bg-background px-6">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
            Error inesperado
          </span>
          <h1 className="font-display mt-4 text-balance text-[64px] leading-[0.96] tracking-tight md:text-[108px]">
            Algo salió{" "}
            <span className="italic text-muted-foreground">mal</span>
          </h1>
          <p className="mt-8 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            Se produjo un error inesperado. Puede reintentar la operación o
            volver al catálogo.
          </p>
          {error.digest && (
            <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-muted-foreground/60">
              ref: {error.digest}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <RefreshCw className="size-4" strokeWidth={1.5} />
              Reintentar
            </button>
            {/* Using <a> instead of Link to bypass broken router state */}
            <a
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:border-foreground/60"
            >
              Volver al inicio
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.025]"
      />
    </main>
  )
}
