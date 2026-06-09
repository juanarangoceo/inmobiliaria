import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"
import { projectId, dataset } from "./client"

const builder = imageUrlBuilder({ projectId, dataset })

/** Construye URLs de imágenes de Sanity. Ej: urlForImage(img).width(1200).url() */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
