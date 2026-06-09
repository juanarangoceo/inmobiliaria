import Link from "next/link"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/lib/auth/actions"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Mi cuenta · Vision Estate Colombia",
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
    .select("id, title, city, status, created_at")
    .order("created_at", { ascending: false })

  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--luxe)]">
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
          submissions.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-foreground/10 px-5 py-4"
            >
              <div>
                <p className="font-medium">{s.title ?? "Propiedad sin título"}</p>
                <p className="text-sm text-muted-foreground">{s.city ?? "—"}</p>
              </div>
              <span className="font-mono rounded-full border border-foreground/15 px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                {STATUS_LABEL[s.status] ?? s.status}
              </span>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
