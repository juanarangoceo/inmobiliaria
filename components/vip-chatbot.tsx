"use client"

import { useState } from "react"
import { Sparkles, X, Phone } from "lucide-react"
import { ChatWindow } from "@/components/chat/chat-window"

const SUGGESTIONS = [
  "¿Qué propiedades VIP tienen disponibles?",
  "Compárame las opciones en Medellín",
  "Quiero agendar una visita privada",
]

export function VipChatbot() {
  const [open, setOpen] = useState(false)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:inset-auto md:bottom-6 md:right-6">
      <div className="pointer-events-auto mx-auto px-4 pb-24 md:px-0 md:pb-0">
        {open ? (
          <div className="relative flex h-[min(560px,72vh)] w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-[color:var(--luxe)]/25 bg-background/95 shadow-2xl shadow-black/30 backdrop-blur-xl md:w-[400px]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar concierge"
              className="absolute top-3.5 right-4 z-10 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <X className="size-4" strokeWidth={1.5} />
            </button>
            <ChatWindow
              assistantName="Concierge VIP"
              assistantTagline="Vision Estate · en línea"
              greeting="Bienvenido a la Colección Privada. Soy su concierge. Puedo orientarle sobre las propiedades, coordinar visitas privadas o ponerle en contacto con un asesor."
              suggestions={SUGGESTIONS}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group mx-auto flex h-12 items-center gap-3 rounded-full border border-[color:var(--luxe)]/30 bg-background/90 pl-2.5 pr-5 shadow-xl shadow-black/20 backdrop-blur-lg transition-all hover:border-[color:var(--luxe)]/60 md:mx-0"
          >
            <span className="relative flex size-8 items-center justify-center rounded-full bg-[color:var(--luxe)]/15 ring-1 ring-[color:var(--luxe)]/30">
              <Sparkles className="size-3.5 text-[color:var(--luxe)]" strokeWidth={1.8} />
              <span
                className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-[color:var(--luxe)] ring-2 ring-background"
                aria-hidden
              />
            </span>
            <span className="flex flex-col items-start">
              <span className="font-display text-[13px] leading-none">Concierge VIP</span>
              <span className="font-mono mt-1 text-[9px] tracking-[0.2em] text-[color:var(--luxe)] uppercase">
                Pregunte lo que sea
              </span>
            </span>
            <span className="h-6 w-px bg-foreground/10" aria-hidden />
            <Phone
              className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
              strokeWidth={1.5}
            />
          </button>
        )}
      </div>
    </div>
  )
}
