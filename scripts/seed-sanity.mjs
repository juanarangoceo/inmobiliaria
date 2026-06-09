import { createClient } from "@sanity/client"
import { createReadStream, readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { randomUUID } from "node:crypto"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

// Cargar token desde .env.local
const env = readFileSync(resolve(root, ".env.local"), "utf8")
const token = env.match(/SANITY_API_WRITE_TOKEN=(.+)/)?.[1]?.trim()
if (!token) throw new Error("Falta SANITY_API_WRITE_TOKEN en .env.local")

const client = createClient({
  projectId: "w09hu120",
  dataset: "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
})

const img = (p) => resolve(root, "public/properties", p)

// Subir imagen una sola vez y cachear por ruta
const assetCache = new Map()
async function asset(file) {
  if (assetCache.has(file)) return assetCache.get(file)
  const res = await client.assets.upload("image", createReadStream(img(file)), {
    filename: file,
  })
  const ref = { _type: "image", asset: { _type: "reference", _ref: res._id } }
  assetCache.set(file, ref)
  return ref
}

const block = (text) => ({
  _type: "block",
  _key: randomUUID().slice(0, 8),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: randomUUID().slice(0, 8), text, marks: [] }],
})

const gallery = async (files) =>
  Promise.all(
    files.map(async (f) => ({ ...(await asset(f)), _key: randomUUID().slice(0, 8) })),
  )

const DETAIL = ["detail-kitchen.jpg", "detail-terrace.jpg", "detail-bath.jpg"]

const PROPS = [
  {
    _id: "prop-medellin-poblado",
    title: "Penthouse El Poblado",
    code: "VE-0001",
    propertyType: "Penthouse",
    city: "Medellín",
    region: "Antioquia",
    location: "El Poblado",
    geo: { lat: 6.2086, lng: -75.5673 },
    price: 4_200_000_000,
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    parking: 3,
    year: 2022,
    featured: true,
    isVip: true,
    vipTier: "signature",
    has360: true,
    img: "penthouse-cinematic.jpg",
    tagline:
      "Un penthouse esculpido en mármol, con vistas sin obstáculos al valle de Aburrá y terraza privada al poniente.",
    titleEn: "El Poblado Penthouse",
    taglineEn:
      "A marble-sculpted penthouse with unobstructed valley views and a private west-facing terrace.",
    description: [
      "En el corazón de El Poblado, este penthouse de autor privilegia la luz natural y las transiciones silenciosas entre interior y exterior.",
      "Materiales nobles y discretos: pisos de mármol, carpintería en nogal y herrajes en bronce. Doble altura en la sala principal con skylight.",
      "Acceso privado por ascensor, amenidades del edificio y portería 24/7. Se entrega listo para habitar.",
    ],
    features: ["Doble altura en sala", "Cocina con isla de mármol", "Terraza 58 m² con jacuzzi", "Ascensor privado", "Domótica integral"],
    amenities: ["Portería 24/7", "Spa y sauna", "Gimnasio", "Salón social", "Jardín interior"],
  },
  {
    _id: "prop-cartagena-villa",
    title: "Villa Manzanillo",
    code: "VE-0002",
    propertyType: "Villa",
    city: "Cartagena",
    region: "Bolívar",
    location: "Manzanillo del Mar",
    geo: { lat: 10.4515, lng: -75.5006 },
    price: 8_500_000_000,
    bedrooms: 5,
    bathrooms: 4,
    area: 610,
    parking: 4,
    year: 2021,
    featured: true,
    isVip: true,
    vipTier: "private-collection",
    has360: true,
    img: "modernist-villa.jpg",
    tagline:
      "Una villa frente al Caribe, concebida como un refugio horizontal entre cielo y mar.",
    titleEn: "Manzanillo Villa",
    taglineEn: "A Caribbean-front villa conceived as a horizontal retreat between sky and sea.",
    description: [
      "Villa de 610 m² sobre la costa de Manzanillo. Geometría horizontal: una losa ligera que flota sobre el paisaje.",
      "Cinco habitaciones en suite, todas con vista al mar, y una piscina infinita de 22 metros integrada al horizonte.",
      "Se entrega amoblada con piezas seleccionadas, incluyendo obra original de artistas locales.",
    ],
    features: ["Piscina infinita 22 m", "5 suites con vista al mar", "Cocina exterior", "Cava climatizada", "Energía solar"],
    amenities: ["Acceso privado a playa", "Servicio de casa 1 año", "Muelle compartido", "Seguridad 24/7"],
  },
  {
    _id: "prop-bogota-chapinero",
    title: "Loft Chapinero Alto",
    code: "VE-0003",
    propertyType: "Loft",
    city: "Bogotá",
    region: "Cundinamarca",
    location: "Chapinero Alto",
    geo: { lat: 4.6486, lng: -74.0578 },
    price: 850_000_000,
    bedrooms: 1,
    bathrooms: 1,
    area: 92,
    parking: 1,
    year: 2019,
    img: "urban-loft.jpg",
    tagline:
      "Un loft industrial en una fábrica reconvertida, con muros originales de ladrillo y ventanales de acero negro.",
    titleEn: "Chapinero Alto Loft",
    taglineEn: "An industrial loft in a converted factory, with original brick walls and black steel windows.",
    description: [
      "En el corazón de Chapinero, este loft ocupa el ala norte de una antigua fábrica. Intervención mínima y respetuosa.",
      "Planta abierta con 4,20 m de altura y una banda continua de ventanales. Incluye mezzanine con habitación principal.",
      "Amoblado con piezas de diseño colombiano contemporáneo.",
    ],
    features: ["Muros de ladrillo original", "Doble altura 4,20 m", "Mezzanine", "Concreto pulido", "Cocina integral"],
    amenities: ["Internet fibra 1 Gbps", "Terraza común", "Bodega privada", "Acceso biométrico"],
  },
  {
    _id: "prop-rionegro-llanogrande",
    title: "Casa Campestre Llanogrande",
    code: "VE-0004",
    propertyType: "Casa campestre",
    city: "Rionegro",
    region: "Antioquia",
    location: "Llanogrande",
    geo: { lat: 6.1583, lng: -75.4233 },
    price: 2_100_000_000,
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    parking: 2,
    year: 2024,
    featured: true,
    img: "coastal-townhouse.jpg",
    tagline:
      "Una casa campestre contemporánea entre prados y bosque nativo, a diez minutos del aeropuerto.",
    titleEn: "Llanogrande Country House",
    taglineEn: "A contemporary country house among meadows and native forest, ten minutes from the airport.",
    description: [
      "Casa de campo que interpreta la tradición antioqueña con lenguaje contemporáneo: muros blancos, madera y patios interiores.",
      "Cuatro habitaciones en dos niveles, tres baños y un patio central que organiza la circulación.",
      "Proyecto entregado llave en mano, con acabados de autor. Disponible para mudanza inmediata.",
    ],
    features: ["Patio central", "Chimenea de leña", "Cubierta verde", "Pisos en madera", "Amplios ventanales"],
    amenities: ["Portería 24/7", "Senderos privados", "Zona BBQ", "A 10 min del aeropuerto"],
  },
  {
    _id: "prop-valle-hacienda",
    title: "Hacienda El Laurel",
    code: "VE-0005",
    propertyType: "Finca",
    city: "Buga",
    region: "Valle del Cauca",
    location: "Valle del Cauca",
    geo: { lat: 3.9009, lng: -76.2978 },
    priceOnRequest: true,
    bedrooms: 7,
    bathrooms: 6,
    area: 1240,
    parking: 8,
    year: 1910,
    isVip: true,
    vipTier: "off-market",
    has360: true,
    img: "hacienda-laurel.jpg",
    tagline:
      "Hacienda histórica de 14 hectáreas restaurada con criterio de museo, rodeada por un bosque privado.",
    titleEn: "El Laurel Estate",
    taglineEn: "A 14-hectare historic estate restored with museum-grade criteria, surrounded by private forest.",
    description: [
      "El Laurel es una hacienda restaurada con un criterio de museo. Las crujías originales dialogan con intervenciones contemporáneas.",
      "El predio cubre 14 hectáreas de bosque privado, un lago natural y caballerizas en funcionamiento.",
      "Se ofrece amoblada con una colección de arte. Transacción fuera de mercado, bajo confidencialidad.",
    ],
    features: ["Restauración de autor", "14 ha de bosque", "Lago natural", "Caballerizas", "Cava de 3.500 etiquetas"],
    amenities: ["Equipo de casa completo", "Seguridad perimetral", "Invernadero", "Capilla histórica"],
  },
  {
    _id: "prop-quindio-bosque",
    title: "Casa Bosque Salento",
    code: "VE-0006",
    propertyType: "Casa",
    city: "Salento",
    region: "Quindío",
    location: "Eje Cafetero",
    geo: { lat: 4.6378, lng: -75.5706 },
    price: 3_400_000_000,
    bedrooms: 4,
    bathrooms: 4,
    area: 520,
    parking: 3,
    year: 2023,
    featured: true,
    isVip: true,
    vipTier: "signature",
    has360: true,
    img: "casa-bosque.jpg",
    tagline:
      "Una residencia embebida en el bosque de niebla del Quindío, una pausa entre el hombre y la montaña.",
    titleEn: "Salento Forest House",
    taglineEn: "A residence embedded in the Quindío cloud forest — a pause between people and mountain.",
    description: [
      "Casa de autor sobre 2 hectáreas de bosque de niebla. Un volumen horizontal de concreto suspendido entre los árboles.",
      "Una sola planta con cuatro habitaciones orientadas al bosque, biblioteca de triple altura y cocina abierta a la terraza.",
      "Certificación sostenible. Se entrega con huerto, captación de agua lluvia y energía fotovoltaica.",
    ],
    features: ["Diseño de autor", "Captación pluvial", "Biblioteca triple altura", "Terraza sobre el dosel", "Fotovoltaica"],
    amenities: ["Reserva privada", "Sendero propio", "Quebrada natural", "Guardabosques"],
  },
]

async function run() {
  const docs = []
  for (const p of PROPS) {
    const mainImage = await asset(p.img)
    const gal = await gallery([p.img, ...DETAIL])
    docs.push({
      _id: p._id,
      _type: "propiedad",
      status: "published",
      publishedAt: new Date().toISOString(),
      country: "Colombia",
      currency: "COP",
      slug: { _type: "slug", current: p._id.replace("prop-", "") },
      title: p.title,
      titleEn: p.titleEn,
      code: p.code,
      propertyType: p.propertyType,
      tagline: p.tagline,
      taglineEn: p.taglineEn,
      price: p.price,
      priceOnRequest: !!p.priceOnRequest,
      city: p.city,
      region: p.region,
      location: p.location,
      geo: { _type: "geopoint", lat: p.geo.lat, lng: p.geo.lng },
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      parking: p.parking,
      year: p.year,
      featured: !!p.featured,
      isVip: !!p.isVip,
      vipTier: p.vipTier,
      has360: !!p.has360,
      description: p.description.map(block),
      descriptionEn: [],
      features: p.features,
      amenities: p.amenities,
      mainImage,
      gallery: gal,
      agent: {
        name: "Equipo Vision Estate",
        role: "Asesoría premium",
        phone: "+57 300 000 0000",
        email: "hola@visionestatecolombia.com",
      },
    })
  }

  const tx = docs.reduce((t, d) => t.createOrReplace(d), client.transaction())
  const res = await tx.commit()
  console.log(`✓ ${res.results.length} propiedades publicadas en Sanity.`)
}

run().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
