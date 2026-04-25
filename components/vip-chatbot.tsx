"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUp, Sparkles, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  role: "assistant" | "user"
  content: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Bienvenido a la Colección Privada. Soy Aster, su concierge IA. Puedo sugerirle inmuebles fuera de mercado, coordinar visitas privadas o iniciar una videollamada al instante con un agente humano.",
  },
]

const SUGGESTIONS = [
  "Quiero ver off-market en Valle de Bravo",
  "Compárame Hacienda Laurel vs Casa Bosque",
  "Coordinar visita privada",
]

export function VipChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing, open])

  function send(text: string) {
    const content = text.trim()
    if (!content) return
    setMessages((prev) => [...prev, { role: "user", content }])
    setInput("")
    setTyping(true)
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Entendido. Estoy preparando la selección privada acorde a ese criterio. En un instante un asesor humano validará la curaduría antes de enviársela.",
        },
      ])
      setTyping(false)
    }, 1100)
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:inset-auto md:bottom-6 md:right-6">
      <div
        className={cn(
          "pointer-events-auto mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "w-full max-w-sm px-4 pb-20 md:w-[400px] md:px-0 md:pb-0"
            : "w-auto px-4 pb-24 md:px-0 md:pb-0",
        )}
      >
        {open ? (
          <div className="relative flex h-[min(560px,72vh)] flex-col overflow-hidden rounded-2xl border border-[color:var(--luxe)]/25 bg-background/95 shadow-2xl shadow-black/30 backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-foreground/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex size-8 items-center justify-center rounded-full bg-[color:var(--luxe)]/15 ring-1 ring-[color:var(--luxe)]/30">
                  <Sparkles
                    className="size-3.5 text-[color:var(--luxe)]"
                    strokeWidth={1.8}
                  />
                  <span
                    className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-[color:var(--luxe)] ring-2 ring-background"
                    aria-hidden
                  />
                </div>
                <div>
                  <p className="font-display text-[15px] leading-none tracking-tight">
                    Aster
                  </p>
                  <p className="font-mono mt-1 text-[9px] tracking-[0.2em] text-[color:var(--luxe)] uppercase">
                    Concierge VIP · en línea
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar concierge"
                className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <p
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                      m.role === "user"
                        ? "bg-foreground text-background"
                        : "bg-foreground/5 text-foreground",
                    )}
                  >
                    {m.content}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl bg-foreground/5 px-4 py-3">
                    <span
                      className="size-1.5 animate-pulse rounded-full bg-[color:var(--luxe)]"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="size-1.5 animate-pulse rounded-full bg-[color:var(--luxe)]"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="size-1.5 animate-pulse rounded-full bg-[color:var(--luxe)]"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 border-t border-foreground/10 px-5 py-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-foreground/15 px-3 py-1.5 text-[11px] tracking-wide text-muted-foreground transition-colors hover:border-[color:var(--luxe)]/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-foreground/10 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe al concierge…"
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Enviar"
                className="flex size-9 items-center justify-center rounded-full bg-[color:var(--luxe)] text-[color:var(--luxe-foreground)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp className="size-4" strokeWidth={2} />
              </button>
            </form>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group mx-auto flex h-12 items-center gap-3 rounded-full border border-[color:var(--luxe)]/30 bg-background/90 pl-2.5 pr-5 shadow-xl shadow-black/20 backdrop-blur-lg transition-all hover:border-[color:var(--luxe)]/60 md:mx-0"
          >
            <span className="relative flex size-8 items-center justify-center rounded-full bg-[color:var(--luxe)]/15 ring-1 ring-[color:var(--luxe)]/30">
              <Sparkles
                className="size-3.5 text-[color:var(--luxe)]"
                strokeWidth={1.8}
              />
              <span
                className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-[color:var(--luxe)] ring-2 ring-background"
                aria-hidden
              />
            </span>
            <span className="flex flex-col items-start">
              <span className="font-display text-[13px] leading-none">
                Concierge VIP
              </span>
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
