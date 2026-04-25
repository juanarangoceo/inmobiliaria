"use client"

import { MapPin, Home, DollarSign, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function HeroSearch() {
  return (
    <div className="glass w-full rounded-2xl p-2 shadow-2xl shadow-black/10 md:rounded-3xl md:p-2.5">
      <div className="grid grid-cols-1 divide-y divide-foreground/10 md:grid-cols-[1.2fr_1fr_1fr_auto] md:divide-x md:divide-y-0">
        {/* Location */}
        <label className="group flex items-center gap-3 rounded-xl px-4 py-3 md:py-4">
          <MapPin
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Ubicación
            </span>
            <input
              type="text"
              placeholder="Polanco, Roma, Condesa…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>
        </label>

        {/* Property type */}
        <div className="flex items-center gap-3 px-4 py-3 md:py-4">
          <Home
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Tipo
            </span>
            <Select>
              <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-sm shadow-none focus:ring-0 focus-visible:ring-0">
                <SelectValue placeholder="Cualquier inmueble" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Cualquier inmueble</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
                <SelectItem value="apartment">Departamento</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 px-4 py-3 md:py-4">
          <DollarSign
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Presupuesto
            </span>
            <Select>
              <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-sm shadow-none focus:ring-0 focus-visible:ring-0">
                <SelectValue placeholder="Sin límite" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Sin límite</SelectItem>
                <SelectItem value="0-50k">Hasta $50,000 / mes</SelectItem>
                <SelectItem value="50-100k">$50k — $100k</SelectItem>
                <SelectItem value="1-5m">$1M — $5M</SelectItem>
                <SelectItem value="5-15m">$5M — $15M</SelectItem>
                <SelectItem value="15m+">$15M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center p-2 md:p-2">
          <Button
            type="submit"
            className="h-12 w-full gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 md:h-full md:w-auto md:px-6"
          >
            <Search className="size-4" />
            <span className="tracking-wide">Buscar</span>
          </Button>
        </div>
      </div>

      {/* AI prompt line */}
      <div className="flex items-center justify-between border-t border-foreground/5 px-4 pt-3 pb-1 md:px-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="size-3" strokeWidth={1.5} />
          <span className="hidden sm:inline">
            Prueba:
          </span>
          <button
            type="button"
            className="font-mono text-[11px] text-foreground/70 hover:text-foreground"
          >
            &quot;Loft de 1 habitación en Roma bajo 40k&quot;
          </button>
        </div>
        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:block">
          AI · Beta
        </span>
      </div>
    </div>
  )
}
