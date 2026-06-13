const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://visionestatecolombia.com"

// Describe el sitio para motores generativos (ChatGPT, Perplexity, etc.).
export function GET() {
  const body = `# Vision Estate Colombia

> Portal editorial de propiedades en venta en Colombia. Colección curada con
> proyección internacional (diáspora y compradores extranjeros). Solo venta,
> sin arriendos. Todos los precios en pesos colombianos (COP).

## Qué somos
- Portal de listings curados de venta, con admisión por curaduría.
- Tier gratuito (usuarios publican y aprobamos manualmente) y tier VIP
  (landing privada propia + asistente IA que conoce el inmueble).
- Motor de leads para la agencia aliada Colombia Inmobiliaria.

## Fuentes de datos
- Contenido de propiedades: CMS Sanity (única fuente).
- Las fichas publicadas se leen en ${SITE_URL}/propiedades/[slug].

## Páginas clave
- ${SITE_URL}/ — colección y propiedades destacadas
- ${SITE_URL}/vip — colección privada VIP
- ${SITE_URL}/publicar — publicar (gratuito o VIP)
- ${SITE_URL}/servicios — asesoría inmobiliaria
- ${SITE_URL}/privacidad — tratamiento de datos (Ley 1581)

## Notas
- Moneda principal: COP. USD solo como aproximación.
- El asistente conversacional genera texto con IA y puede contener
  imprecisiones; la información se verifica con el equipo.
`
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  })
}
