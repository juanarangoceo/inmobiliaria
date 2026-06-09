"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

async function getOrigin() {
  const h = await headers()
  return (
    h.get("origin") ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000"
  )
}

export type AuthState = { error?: string; message?: string }

/** Registro con confirmación por correo. */
export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const fullName = String(formData.get("full_name") ?? "").trim()

  if (!email || !password) return { error: "Correo y contraseña son obligatorios." }
  if (password.length < 8) return { error: "La contraseña debe tener al menos 8 caracteres." }

  const supabase = await createClient()
  const origin = await getOrigin()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/confirm?next=/cuenta`,
    },
  })
  if (error) return { error: error.message }
  return {
    message:
      "Te enviamos un correo de confirmación. Ábrelo y confirma tu cuenta para continuar.",
  }
}

/** Inicio de sesión. */
export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      return { error: "Aún no confirmas tu correo. Revisa tu bandeja de entrada." }
    }
    return { error: "Correo o contraseña incorrectos." }
  }
  redirect("/cuenta")
}

/** Cerrar sesión. */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}
