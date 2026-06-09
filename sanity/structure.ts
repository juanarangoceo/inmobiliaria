import type { StructureResolver } from "sanity/structure"
import { HomeIcon, StarIcon, ClockIcon, CheckmarkCircleIcon } from "@sanity/icons"

/** Estructura del Studio con cola de aprobación para el administrador. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Vision Estate Colombia")
    .items([
      S.listItem()
        .title("Por aprobar")
        .icon(ClockIcon)
        .child(
          S.documentList()
            .title("Pendientes de aprobación")
            .filter('_type == "propiedad" && status == "pending"'),
        ),
      S.listItem()
        .title("Publicadas")
        .icon(CheckmarkCircleIcon)
        .child(
          S.documentList()
            .title("Propiedades publicadas")
            .filter('_type == "propiedad" && status == "published"'),
        ),
      S.divider(),
      S.listItem()
        .title("Todas las propiedades")
        .icon(HomeIcon)
        .child(S.documentTypeList("propiedad").title("Propiedades")),
      S.listItem()
        .title("Landings VIP")
        .icon(StarIcon)
        .child(S.documentTypeList("vipLanding").title("Landings VIP")),
    ])
