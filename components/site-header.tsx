"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (y > 120 && y > lastY) setHidden(true)
      else setHidden(false)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Inmuebles" },
    { href: "/servicios", label: "Servicios" },
    { href: "/vip", label: "VIP", luxe: true },
  ]

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        hidden ? "-translate-y-full md:translate-y-0" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 transition-colors duration-300 md:h-20",
          scrolled
            ? "glass border-b border-[color:var(--surface-glass-border)]"
            : "bg-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-6 rounded-sm bg-foreground" aria-hidden />
          <span className="font-display text-lg tracking-tight md:text-xl">
            Vision Estate
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-[13px] tracking-wide transition-colors",
                  active
                    ? link.luxe
                      ? "text-[color:var(--luxe)]"
                      : "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {link.luxe && (
                    <span
                      className="size-1 rounded-full bg-[color:var(--luxe)]"
                      aria-hidden
                    />
                  )}
                  {link.label}
                </span>
                {active && (
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full",
                      link.luxe
                        ? "bg-[color:var(--luxe)]/10 ring-1 ring-[color:var(--luxe)]/30"
                        : "bg-foreground/5 ring-1 ring-foreground/10",
                    )}
                    aria-hidden
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Perfil"
          >
            <User className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
