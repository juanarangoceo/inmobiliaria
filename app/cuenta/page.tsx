import Link from "next/link"
import { redirect } from "next/navigation"
import { Plus, ArrowUpRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/lib/auth/actions"
import { Button } from "@/components/ui/button"
import { CopyLinkButton } from "@/components/copy-link-button"
import { getVipLandingMapForPropertyIds } from "@/lib/sanity/queries"

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://visionestatecolombia.com"

export const metadata = {
  title: "Mi cuenta",
  robots: { index: false, follow: false },
}

const STATUS_LABEL: Record<string, string> = {
  pending: "En revisión",
  approved: "Aprobada",
  published: "Publicada",
  rejected: "Rechazada",
}

export default async function CuentaPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/ingresar")

  const { data: submissions } = await supabase
    .from("submissions")
    .select("id, title, city, status, sanity_doc_id, created_at")
    .order("created_at", { ascending: false })

  // Landings VIP publicadas para las propiedades del usuario.
  const docIds = (submissions ?? [])
    .map((s) => s.sanity_doc_id)
    .filter((id): id is string => Boolean(id))
  const landingMap = await getVipLandingMapForPropertyIds(docIds)

  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--luxe-ink)]">
            Mi cuenta
          </p>
          <h1 className="font-display mt-2 text-3xl tracking-tight">
            Hola{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button variant="outline" size="sm" type="submit">
            Cerrar sesión
          </Button>
        </form>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <h2 className="font-display text-xl tracking-tight">Mis propiedades</h2>
        <Button asChild size="sm">
          <Link href="/publicar/propiedad">
            <Plus className="size-4" /> Publicar propiedad
          </Link>
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {!submissions || submissions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-foreground/15 px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              Aún no has publicado ninguna propiedad.
            </p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/publicar/propiedad">Publicar la primera</Link>
            </Button>
          </div>
        ) : (
          submissions.map((s) => {
            const landingSlug = s.sanity_doc_id
              ? landingMap[s.sanity_doc_id]
              : undefined
            const landingUrl = landingSlug ? `${SITE_URL}/v/${landingSlug}` : null
            return (
              <div
                key={s.id}
                className="rounded-xl border border-foreground/10 px-5 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">
                      {s.title ?? "Propiedad sin título"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {s.city ?? "—"}
                    </p>
                  </div>
                  <span className="font-mono rounded-full border border-foreground/15 px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                    {STATUS_LABEL[s.status] ?? s.status}
                  </span>
                </div>

                {landingUrl && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-foreground/10 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--luxe-ink)]">
                      Landing VIP
                    </span>
                    <a
                      href={landingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-xs font-medium transition-colors hover:border-foreground/40"
                    >
                      Ver mi landing
                      <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                    </a>
                    <CopyLinkButton url={landingUrl} />
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}
