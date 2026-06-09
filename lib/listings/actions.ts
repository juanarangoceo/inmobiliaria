"use server"

import { randomUUID } from "node:crypto"
import { createClient } from "@/lib/supabase/server"
import { sanityWriteClient } from "@/lib/sanity/client"

export type SubmitState = { error?: string; ok?: boolean }

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 70)
}

const block = (text: string) => ({
  _type: "block",
  _key: randomUUID().slice(0, 8),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: randomUUID().slice(0, 8), text, marks: [] }],
})

async function uploadImage(file: File) {
  const buf = Buffer.from(await file.arrayBuffer())
  const asset = await sanityWriteClient.assets.upload("image", buf, {
    filename: file.name || "foto.jpg",
  })
  return {
    _type: "image",
    _key: randomUUID().slice(0, 8),
    asset: { _type: "reference", _ref: asset._id },
  }
}

const num = (v: FormDataEntryValue | null) => {
  const n = Number(String(v ?? "").replace(/[^\d.]/g, ""))
  return Number.isFinite(n) ? n : 0
}

/** Crea la propiedad como borrador pendiente de aprobación en Sanity. */
export async function submitProperty(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Debes iniciar sesión para publicar." }

  const title = String(formData.get("title") ?? "").trim()
  const city = String(formData.get("city") ?? "").trim()
  const propertyType = String(formData.get("propertyType") ?? "").trim()
  if (!title || !city || !propertyType)
    return { error: "Título, ciudad y tipo de inmueble son obligatorios." }

  // Imágenes
  const mainEntry = formData.get("mainImage")
  const mainFile =
    mainEntry instanceof File && mainEntry.size > 0 ? mainEntry : null
  if (!mainFile) return { error: "Sube al menos la foto principal." }

  const galleryFiles = formData
    .getAll("gallery")
    .filter((f): f is File => f instanceof File && f.size > 0)

  let mainImage
  let gallery
  try {
    mainImage = await uploadImage(mainFile)
    gallery = await Promise.all(galleryFiles.slice(0, 12).map(uploadImage))
  } catch {
    return { error: "No pudimos subir las imágenes. Intenta de nuevo." }
  }

  const description = String(formData.get("description") ?? "")
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(block)

  const featuresRaw = String(formData.get("features") ?? "")
    .split(/[,\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const docId = randomUUID()
  const priceOnRequest = formData.get("priceOnRequest") === "on"

  try {
    await sanityWriteClient.createOrReplace({
      _id: docId,
      _type: "propiedad",
      status: "pending",
      country: "Colombia",
      currency: "COP",
      title,
      slug: { _type: "slug", current: `${slugify(title)}-${docId.slice(0, 6)}` },
      propertyType,
      city,
      region: String(formData.get("region") ?? "").trim() || undefined,
      location: String(formData.get("location") ?? "").trim() || undefined,
      tagline: String(formData.get("tagline") ?? "").trim() || undefined,
      price: priceOnRequest ? undefined : num(formData.get("price")),
      priceOnRequest,
      bedrooms: num(formData.get("bedrooms")),
      bathrooms: num(formData.get("bathrooms")),
      area: num(formData.get("area")),
      parking: num(formData.get("parking")),
      year: num(formData.get("year")) || undefined,
      description,
      features: featuresRaw,
      mainImage,
      gallery,
      submittedByEmail: user.email,
      submittedByUserId: user.id,
      agent: {
        name: String(formData.get("contactName") ?? "").trim() || user.email,
        role: "Propietario",
        phone: String(formData.get("contactPhone") ?? "").trim() || undefined,
        email: user.email,
      },
    })
  } catch {
    return { error: "No pudimos guardar la propiedad. Intenta de nuevo." }
  }

  // Registro liviano en Supabase para que el usuario siga su estado
  await supabase.from("submissions").insert({
    user_id: user.id,
    sanity_doc_id: docId,
    title,
    city,
    status: "pending",
  })

  return { ok: true }
}
