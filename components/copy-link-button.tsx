"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CopyLinkButton({
  url,
  label = "Copiar enlace",
}: {
  url: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: seleccionar vía prompt si clipboard no está disponible.
      window.prompt("Copia el enlace:", url)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-xs font-medium transition-colors hover:border-foreground/40"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-[color:var(--luxe-ink)]" strokeWidth={2} />
          ¡Copiado!
        </>
      ) : (
        <>
          <Copy className="size-3.5" strokeWidth={1.5} />
          {label}
        </>
      )}
    </button>
  )
}
