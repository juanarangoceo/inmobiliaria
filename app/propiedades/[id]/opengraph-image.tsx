import { ImageResponse } from "next/og"
import { getPropertyBySlug } from "@/lib/sanity/queries"
import { formatPrice } from "@/lib/properties"

export const alt = "Vision Estate Colombia"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const p = await getPropertyBySlug(id)

  const title = p?.title ?? "Vision Estate Colombia"
  const code = p?.code ?? ""
  const location = p ? `${p.location} · ${p.city}` : "Colombia"
  const price = p
    ? p.priceOnRequest
      ? "Precio a consultar"
      : formatPrice(p.price, p.currency)
    : ""
  // Variante de mayor resolución para el lienzo OG.
  const bg = p?.image ? `${p.image}?w=1200&h=630&fit=crop&auto=format` : null

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0A0A0A",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {bg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bg}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.15) 100%)",
          }}
        />

        {/* Sello superior */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 56,
            right: 56,
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.85)",
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>Vision Estate · Colección</span>
          <span style={{ color: "#D9B779" }}>{code}</span>
        </div>

        {/* Contenido inferior */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "0 56px 56px",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
              marginBottom: 12,
            }}
          >
            {location}
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {title}
          </div>
          {price ? (
            <div
              style={{
                marginTop: 20,
                fontFamily: "monospace",
                fontSize: 34,
                color: "#D9B779",
              }}
            >
              {price}
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  )
}
