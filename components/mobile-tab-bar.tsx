"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Sparkles, PlusSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileTabBar() {
  const pathname = usePathname()
  const tabs = [
    { href: "/", label: "Inmuebles", icon: Home, match: pathname === "/" },
    {
      href: "/servicios",
      label: "Servicios",
      icon: Briefcase,
      match: pathname.startsWith("/servicios"),
    },
    {
      href: "/publicar/propiedad",
      label: "Publicar",
      icon: PlusSquare,
      match: pathname.startsWith("/publicar"),
    },
    {
      href: "/vip",
      label: "VIP",
      icon: Sparkles,
      luxe: true,
      match: pathname.startsWith("/vip"),
    },
  ]

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
    >
      <div className="mx-auto max-w-sm px-4 pb-4">
        <ul className="glass flex items-center justify-between rounded-full border border-[color:var(--surface-glass-border)] px-2 py-2 shadow-2xl shadow-black/10">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <li key={tab.label} className="flex-1">
                <Link
                  href={tab.href}
                  aria-current={tab.match ? "page" : undefined}
                  className={cn(
                    "relative mx-auto flex h-10 items-center justify-center gap-1.5 rounded-full px-3 text-[11px] font-medium tracking-wide uppercase transition-colors",
                    tab.match
                      ? tab.luxe
                        ? "bg-[color:var(--luxe)]/12 text-[color:var(--luxe)] ring-1 ring-[color:var(--luxe)]/30"
                        : "bg-foreground/8 text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.5} />
                  {tab.match && <span>{tab.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
