"use client"

import { useActionState } from "react"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { joinWaitlist, type WaitlistState } from "@/lib/leads/actions"

const initial: WaitlistState = {}

export function WaitlistForm({
  source,
  propertyRef,
  cta = "Solicitar acceso",
  placeholder = "tu@correo.com",
  compact = false,
}: {
  source: string
  propertyRef?: string
  cta?: string
  placeholder?: string
  compact?: boolean
}) {
  const [state, action, pending] = useActionState(joinWaitlist, initial)

  if (state.ok) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-[color:var(--luxe)]/30 bg-[color:var(--luxe)]/5 px-5 py-3 text-sm">
        <CheckCircle2
          className="size-4 flex-shrink-0 text-[color:var(--luxe-ink)]"
          strokeWidth={1.75}
        />
        <span>Listo. Te avisaremos en cuanto haya novedades.</span>
      </div>
    )
  }

  return (
    <form action={action} className="w-full">
      <input type="hidden" name="source" value={source} />
      {propertyRef && (
        <input type="hidden" name="propertyRef" value={propertyRef} />
      )}
      <div
        className={
          compact
            ? "flex w-full flex-col gap-2 sm:flex-row"
            : "flex w-full flex-col gap-3"
        }
      >
        <input
          type="email"
          name="email"
          required
          placeholder={placeholder}
          className="h-12 flex-1 rounded-full border border-foreground/15 bg-background px-5 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Enviando…" : cta}
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </button>
      </div>

      <label className="mt-3 flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-3.5 flex-shrink-0"
        />
        <span>
          Autorizo el tratamiento de mis datos según la{" "}
          <Link
            href="/privacidad"
            target="_blank"
            className="text-foreground underline underline-offset-4 hover:text-[color:var(--luxe-ink)]"
          >
            Política de Datos
          </Link>
          .
        </span>
      </label>

      {state.error && (
        <p className="mt-2 text-xs text-destructive">{state.error}</p>
      )}
    </form>
  )
}
