import { type SchemaTypeDefinition } from "sanity"
import { propiedad } from "./propiedad"
import { vipLanding } from "./vipLanding"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [propiedad, vipLanding],
}
