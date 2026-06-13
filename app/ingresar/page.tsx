import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata = {
  title: "Ingresar",
  description:
    "Accede o crea tu cuenta para publicar y gestionar tus propiedades en Vision Estate Colombia.",
  robots: { index: false, follow: false },
}

export default async function IngresarPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) redirect("/cuenta")

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <Link
        href="/"
        className="font-mono mb-12 text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
      >
        ← Volver al inicio
      </Link>
      <Suspense>
        <AuthForm />
      </Suspense>
    </main>
  )
}
