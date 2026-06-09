"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ArrowUp, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  propertyId?: string
  landingSlug?: string
  assistantName?: string
  assistantTagline?: string
  greeting?: string
  suggestions?: string[]
  accent?: string
  className?: string
}

function textOf(message: { parts: Array<{ type: string; text?: string }> }) {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("")
}

export function ChatWindow({
  propertyId,
  landingSlug,
  assistantName = "Asistente",
  assistantTagline = "En línea",
  greeting = "Hola, soy tu asistente. Pregúntame lo que quieras sobre esta propiedad.",
  suggestions = [],
  accent = "var(--luxe)",
  className,
}: Props) {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { propertyId, landingSlug },
    }),
  })
  const scrollRef = useRef<HTMLDivElement>(null)
  const busy = status === "submitted" || status === "streaming"

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, status])

  function send(text: string) {
    const content = text.trim()
    if (!content || busy) return
    sendMessage({ text: content })
    setInput("")
  }

  const accentStyle = { color: accent } as React.CSSProperties

  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-foreground/10 px-5 py-4">
        <span
          className="flex size-8 items-center justify-center rounded-full ring-1"
          style={{ backgroundColor: `${accent}1a`, borderColor: accent } as React.CSSProperties}
        >
          <Sparkles className="size-3.5" strokeWidth={1.8} style={accentStyle} />
        </span>
        <div>
          <p className="font-display text-[15px] leading-none tracking-tight">
            {assistantName}
          </p>
          <p
            className="font-mono mt-1 text-[9px] uppercase tracking-[0.2em]"
            style={accentStyle}
          >
            {assistantTagline}
          </p>
        </div>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="flex justify-start">
            <p className="max-w-[85%] rounded-2xl bg-foreground/5 px-4 py-2.5 text-[13px] leading-relaxed text-foreground">
              {greeting}
            </p>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <p
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                m.role === "user"
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground",
              )}
            >
              {textOf(m)}
            </p>
          </div>
        ))}
        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl bg-foreground/5 px-4 py-3">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="size-1.5 animate-pulse rounded-full"
                  style={{ backgroundColor: accent, animationDelay: `${d}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sugerencias */}
      {messages.length === 0 && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-foreground/10 px-5 py-3">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full border border-foreground/15 px-3 py-1.5 text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
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
          placeholder="Escribe tu pregunta…"
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!input.trim() || busy}
          aria-label="Enviar"
          className="flex size-9 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ backgroundColor: accent }}
        >
          <ArrowUp className="size-4" strokeWidth={2} />
        </button>
      </form>
    </div>
  )
}
