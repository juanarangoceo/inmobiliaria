import { type EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/** Verifica el correo de confirmación y redirige. Soporta token_hash y code (PKCE). */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = (searchParams.get("type") as EmailOtpType | null) ?? "signup"
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/cuenta"

  const supabase = await createClient()

  // Flujo token_hash (template personalizado, robusto entre dispositivos)
  if (token_hash) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) return NextResponse.redirect(new URL(next, request.url))
  }

  // Flujo PKCE (link por defecto de Supabase deja un ?code=)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL(next, request.url))
  }

  return NextResponse.redirect(
    new URL(
      "/ingresar?error=El%20enlace%20de%20confirmaci%C3%B3n%20no%20es%20v%C3%A1lido%20o%20ya%20expir%C3%B3",
      request.url,
    ),
  )
}
