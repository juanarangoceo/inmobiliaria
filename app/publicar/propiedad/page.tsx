import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SubmitForm } from "@/components/listings/submit-form"

export const metadata = {
  title: "Publica tu propiedad",
  description:
    "Sube tu propiedad gratis. Nuestro equipo la revisa y la publica en Vision Estate Colombia.",
  robots: { index: false, follow: true },
}

export default async function PublicarPropiedadPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/ingresar?next=/publicar/propiedad")

  return (
    <main className="relative min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 pt-28 pb-24 md:pt-36">
        <Link
          href="/cuenta"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          <span className="font-mono uppercase tracking-[0.14em]">Mi cuenta</span>
        </Link>

        <div className="mt-8 mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--luxe)]">
            Portal gratuito
          </p>
          <h1 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            Publica tu propiedad
          </h1>
          <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
            Completa los datos y sube tus fotos. Revisamos cada inmueble antes de
            publicarlo para mantener la calidad del portal. Solo venta.
          </p>
        </div>

        <SubmitForm />
      </div>
      <SiteFooter />
    </main>
  )
}
