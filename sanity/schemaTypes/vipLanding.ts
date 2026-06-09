import { defineType, defineField } from "sanity"
import { StarIcon } from "@sanity/icons"

/**
 * Landing white-label VIP. Al publicarse genera una URL propia del cliente
 * (/v/[slug]) sin marca Vision Estate, con chatbot que conoce el inmueble.
 */
export const vipLanding = defineType({
  name: "vipLanding",
  title: "Landing VIP (white-label)",
  type: "document",
  icon: StarIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "marca", title: "Marca del cliente" },
    { name: "chatbot", title: "Chatbot" },
    { name: "contacto", title: "Contacto" },
  ],
  fields: [
    defineField({
      name: "published",
      title: "Publicada",
      type: "boolean",
      group: "general",
      initialValue: false,
      description: "Al activar, la URL del cliente queda en vivo.",
    }),
    defineField({
      name: "property",
      title: "Propiedad",
      type: "reference",
      group: "general",
      to: [{ type: "propiedad" }],
      options: { filter: "isVip == true" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug del cliente (URL)",
      type: "slug",
      group: "general",
      description: "URL pública: /v/<slug>. Compártela con el cliente.",
      options: { maxLength: 96 },
      validation: (r) => r.required(),
    }),

    // ── Marca white-label ─────────────────────────────────────────────────
    defineField({
      name: "clientName",
      title: "Nombre / marca del cliente",
      type: "string",
      group: "marca",
      description: "Aparece como dueño de la landing (sin mencionarnos).",
    }),
    defineField({
      name: "clientLogo",
      title: "Logo del cliente",
      type: "image",
      group: "marca",
    }),
    defineField({
      name: "brandColor",
      title: "Color de acento",
      type: "string",
      group: "marca",
      description: "Hex, ej: #0F5132. Personaliza la landing.",
    }),
    defineField({
      name: "heroHeadline",
      title: "Titular del hero",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "heroSubcopy",
      title: "Subtítulo del hero",
      type: "text",
      group: "general",
      rows: 2,
    }),

    // ── Chatbot ───────────────────────────────────────────────────────────
    defineField({
      name: "chatbotName",
      title: "Nombre del asistente",
      type: "string",
      group: "chatbot",
      initialValue: "Asistente",
    }),
    defineField({
      name: "chatbotContext",
      title: "Conocimiento extra para el chatbot",
      type: "text",
      group: "chatbot",
      rows: 6,
      description:
        "Datos que el bot debe conocer además de la ficha: historia, vecindario, condiciones, financiación, etc.",
    }),

    // ── Contacto del cliente ──────────────────────────────────────────────
    defineField({ name: "contactName", title: "Nombre de contacto", type: "string", group: "contacto" }),
    defineField({ name: "contactPhone", title: "Teléfono", type: "string", group: "contacto" }),
    defineField({ name: "contactWhatsapp", title: "WhatsApp", type: "string", group: "contacto" }),
    defineField({ name: "contactEmail", title: "Email", type: "string", group: "contacto" }),
  ],
  preview: {
    select: { title: "clientName", slug: "slug.current", published: "published", media: "clientLogo" },
    prepare({ title, slug, published, media }) {
      return {
        title: title || "Landing VIP",
        subtitle: `${published ? "🟢 en vivo" : "⚪ borrador"} · /v/${slug ?? ""}`,
        media,
      }
    },
  },
})
