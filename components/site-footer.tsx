import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const groups = [
  {
    title: "Colección",
    links: [
      { label: "Inmuebles", href: "/" },
      { label: "VIP · Colección Privada", href: "/vip" },
      { label: "Publicar en VIP", href: "/publicar" },
    ],
  },
  {
    title: "Asesoría",
    links: [
      { label: "Servicios inmobiliarios", href: "/servicios" },
      { label: "Representación de compra", href: "/servicios#representacion" },
      { label: "Valuación patrimonial", href: "/servicios#valuacion" },
      { label: "Agendar consultoría", href: "/servicios#contacto" },
    ],
  },
  {
    title: "Vision Estate",
    links: [
      { label: "Nosotros", href: "#" },
      { label: "Prensa", href: "#" },
      { label: "Contacto", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-foreground/10 md:mt-32">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-5 rounded-sm bg-foreground" aria-hidden />
              <span className="font-display text-xl tracking-tight">
                Vision Estate
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Un portal editorial para propiedades de alto valor. Cada
              inmueble se cura, se documenta y se presenta con el mismo rigor
              con el que fue construido.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/servicios#contacto"
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-xs font-medium tracking-wide text-foreground transition-colors hover:border-foreground/60"
              >
                Agendar consultoría
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
              <Link
                href="/publicar"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium tracking-wide text-background transition-opacity hover:opacity-90"
              >
                Publicar en VIP
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {group.title}
              </p>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-foreground/10 pt-6 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            © {new Date().getFullYear()} Vision Estate · Inmuebles de alto valor
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Privacidad
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Términos
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
