import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { google, CHAT_MODEL } from "@/lib/ai/google"
import { getChatContext } from "@/lib/sanity/queries"

export const maxDuration = 30

type Body = {
  messages: UIMessage[]
  propertyId?: string
  landingSlug?: string
}

export async function POST(req: Request) {
  const { messages, propertyId, landingSlug } = (await req.json()) as Body

  const ctx = await getChatContext({ propertyId, landingSlug })

  const system = `Eres ${ctx?.assistantName ?? "el asistente"} de una propiedad en venta de Vision Estate Colombia.
Tu trabajo es ayudar a un posible comprador respondiendo dudas sobre ESTA propiedad y el proceso de compra en Colombia (incluyendo a compradores extranjeros: inversión, proceso para no residentes, moneda).

Reglas:
- Responde SIEMPRE en el mismo idioma en que te escribe el usuario (español o inglés).
- Básate únicamente en los datos de la propiedad que aparecen abajo. Si no tienes un dato, dilo con honestidad y ofrece poner en contacto con un asesor humano.
- No inventes precios, medidas ni características.
- Sé cálido, breve y concreto. Invita a agendar una visita o videollamada cuando sea oportuno.

DATOS DE LA PROPIEDAD:
${ctx?.context ?? "No hay datos disponibles en este momento."}`

  const result = streamText({
    model: google(CHAT_MODEL),
    system,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
