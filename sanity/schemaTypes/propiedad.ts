import { defineType, defineField } from "sanity"
import { HomeIcon } from "@sanity/icons"

/** Tipos de inmueble (solo venta). */
const PROPERTY_TYPES = [
  "Apartamento",
  "Casa",
  "Penthouse",
  "Villa",
  "Loft",
  "Casa campestre",
  "Finca",
  "Lote",
  "Oficina",
  "Local comercial",
]

const STATUS = [
  { title: "Pendiente de aprobación", value: "pending" },
  { title: "Aprobada (lista para publicar)", value: "approved" },
  { title: "Publicada", value: "published" },
  { title: "Rechazada", value: "rejected" },
]

export const propiedad = defineType({
  name: "propiedad",
  title: "Propiedad",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "ubicacion", title: "Ubicación" },
    { name: "detalle", title: "Detalle" },
    { name: "media", title: "Fotos / 360°" },
    { name: "vip", title: "VIP" },
    { name: "ingles", title: "English (global)" },
    { name: "admin", title: "Admin / SEO" },
  ],
  fields: [
    // ── Workflow de aprobación ──────────────────────────────────────────────
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      group: "admin",
      options: { list: STATUS, layout: "radio" },
      initialValue: "pending",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Destacada en home",
      type: "boolean",
      group: "admin",
      initialValue: false,
    }),
    defineField({
      name: "featuredFromTikTok",
      title: "Mostrar en \"Visto en @visionestatecolombia\"",
      type: "boolean",
      group: "admin",
      description:
        "Propiedad del último carrusel de TikTok; aparece en la sección puente de la home.",
      initialValue: false,
    }),

    // ── General ─────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "general",
      validation: (r) => r.required().min(4),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "general",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "code",
      title: "Código interno",
      type: "string",
      group: "general",
      description: "Ej: VE-0001",
    }),
    defineField({
      name: "propertyType",
      title: "Tipo de inmueble",
      type: "string",
      group: "general",
      options: { list: PROPERTY_TYPES },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Frase de portada",
      type: "string",
      group: "general",
      description: "Una línea editorial que vende la propiedad.",
    }),

    // ── Precio ──────────────────────────────────────────────────────────────
    defineField({
      name: "price",
      title: "Precio",
      type: "number",
      group: "general",
      description: "Solo venta. Sin separadores.",
    }),
    defineField({
      name: "currency",
      title: "Moneda",
      type: "string",
      group: "general",
      options: { list: ["COP", "USD"], layout: "radio" },
      initialValue: "COP",
    }),
    defineField({
      name: "priceOnRequest",
      title: "Precio a consultar",
      type: "boolean",
      group: "general",
      initialValue: false,
    }),

    // ── Ubicación ───────────────────────────────────────────────────────────
    defineField({
      name: "country",
      title: "País",
      type: "string",
      group: "ubicacion",
      initialValue: "Colombia",
    }),
    defineField({
      name: "region",
      title: "Departamento / Región",
      type: "string",
      group: "ubicacion",
      description: "Ej: Antioquia, Cundinamarca, Bolívar…",
    }),
    defineField({
      name: "city",
      title: "Ciudad",
      type: "string",
      group: "ubicacion",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Zona / Barrio",
      type: "string",
      group: "ubicacion",
      description: "Ej: El Poblado, Chicó, Getsemaní…",
    }),
    defineField({
      name: "geo",
      title: "Coordenadas (mapa)",
      type: "geopoint",
      group: "ubicacion",
    }),

    // ── Detalle ─────────────────────────────────────────────────────────────
    defineField({ name: "bedrooms", title: "Habitaciones", type: "number", group: "detalle" }),
    defineField({ name: "bathrooms", title: "Baños", type: "number", group: "detalle" }),
    defineField({ name: "area", title: "Área (m²)", type: "number", group: "detalle" }),
    defineField({ name: "parking", title: "Parqueaderos", type: "number", group: "detalle" }),
    defineField({ name: "year", title: "Año de construcción", type: "number", group: "detalle" }),
    defineField({
      name: "description",
      title: "Descripción (editorial)",
      type: "array",
      group: "detalle",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "features",
      title: "Características",
      type: "array",
      group: "detalle",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "amenities",
      title: "Amenidades",
      type: "array",
      group: "detalle",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    // ── Media ───────────────────────────────────────────────────────────────
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galería",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "has360",
      title: "Tiene recorrido 360°",
      type: "boolean",
      group: "media",
      initialValue: false,
    }),
    defineField({
      name: "tour360Url",
      title: "URL del recorrido 360°",
      type: "url",
      group: "media",
      hidden: ({ parent }) => !parent?.has360,
    }),

    // ── VIP ─────────────────────────────────────────────────────────────────
    defineField({
      name: "isVip",
      title: "Es propiedad VIP",
      type: "boolean",
      group: "vip",
      initialValue: false,
    }),
    defineField({
      name: "vipTier",
      title: "Nivel VIP",
      type: "string",
      group: "vip",
      options: {
        list: [
          { title: "Signature", value: "signature" },
          { title: "Private Collection", value: "private-collection" },
          { title: "Off-market", value: "off-market" },
        ],
      },
      hidden: ({ parent }) => !parent?.isVip,
    }),

    // ── Asesor ──────────────────────────────────────────────────────────────
    defineField({
      name: "agent",
      title: "Asesor",
      type: "object",
      group: "detalle",
      fields: [
        { name: "name", title: "Nombre", type: "string" },
        { name: "role", title: "Rol", type: "string" },
        { name: "phone", title: "Teléfono / WhatsApp", type: "string" },
        { name: "email", title: "Email", type: "string" },
      ],
    }),

    // ── English (global positioning) ────────────────────────────────────────
    defineField({ name: "titleEn", title: "Title (EN)", type: "string", group: "ingles" }),
    defineField({ name: "taglineEn", title: "Tagline (EN)", type: "string", group: "ingles" }),
    defineField({
      name: "descriptionEn",
      title: "Description (EN)",
      type: "array",
      group: "ingles",
      of: [{ type: "block" }],
    }),

    // ── Origen / SEO ────────────────────────────────────────────────────────
    defineField({
      name: "submittedByEmail",
      title: "Enviada por (usuario)",
      type: "string",
      group: "admin",
      description: "Email del usuario que la subió desde la web (si aplica).",
      readOnly: true,
    }),
    defineField({
      name: "submittedByUserId",
      title: "Supabase user id",
      type: "string",
      group: "admin",
      readOnly: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      group: "admin",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "admin",
      fields: [
        { name: "metaTitle", title: "Meta título", type: "string" },
        { name: "metaDescription", title: "Meta descripción", type: "text", rows: 2 },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      city: "city",
      status: "status",
      media: "mainImage",
      isVip: "isVip",
    },
    prepare({ title, city, status, media, isVip }) {
      const label = STATUS.find((s) => s.value === status)?.title ?? status
      return {
        title: `${isVip ? "★ " : ""}${title}`,
        subtitle: `${city ?? "—"} · ${label}`,
        media,
      }
    },
  },
})
