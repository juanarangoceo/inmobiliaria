"use server"

import { createClient } from "@/lib/supabase/server"

export type WaitlistState = { ok?: boolean; error?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Captura un lead en la waitlist (acceso anticipado / propiedades similares). */
export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  if (!EMAIL_RE.test(email))
    return { error: "Ingresa un correo electrónico válido." }

  if (formData.get("consent") !== "on")
    return { error: "Debes autorizar el tratamiento de datos (Ley 1581)." }

  const supabase = await createClient()
  const { error } = await supabase.from("waitlist").insert({
    email,
    name: String(formData.get("name") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    source: String(formData.get("source") ?? "general").trim() || "general",
    property_ref: String(formData.get("propertyRef") ?? "").trim() || null,
    consent: true,
  })

  if (error) {
    console.error("waitlist insert error:", error.message)
    return { error: "No pudimos registrar tu solicitud. Intenta de nuevo." }
  }

  return { ok: true }
}
