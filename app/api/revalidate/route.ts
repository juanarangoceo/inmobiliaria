import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://visionestatecolombia.com"

/**
 * Webhook de Sanity → al publicar/actualizar una propiedad, revalida las rutas
 * afectadas (frescura instantánea, sin esperar ISR de 60s) y notifica a IndexNow
 * (Bing alimenta a ChatGPT).
 *
 * Configurar en Sanity: GROQ webhook a esta ruta con header
 *   Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 * Payload sugerido: { "type": _type, "slug": slug.current }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  const auth = req.headers.get("authorization")
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 })
  }

  let body: { type?: string; slug?: string } = {}
  try {
    body = await req.json()
  } catch {
    // payload vacío: revalidamos lo esencial igualmente
  }

  const paths = new Set<string>(["/", "/vip", "/sitemap.xml"])
  if (body.type === "propiedad" && body.slug) {
    paths.add(`/propiedades/${body.slug}`)
  }
  if (body.type === "vipLanding" && body.slug) {
    paths.add(`/v/${body.slug}`)
  }

  for (const p of paths) revalidatePath(p)

  // IndexNow (opcional: requiere INDEXNOW_KEY y el archivo de verificación).
  const key = process.env.INDEXNOW_KEY
  if (key && body.type === "propiedad" && body.slug) {
    const host = new URL(SITE_URL).host
    const url = `${SITE_URL}/propiedades/${body.slug}`
    try {
      await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          host,
          key,
          keyLocation: `${SITE_URL}/${key}.txt`,
          urlList: [url],
        }),
      })
    } catch (e) {
      console.error("IndexNow ping failed:", e)
    }
  }

  return NextResponse.json({ revalidated: [...paths], now: Date.now() })
}
