export type PropertyStatus = "ai-verified" | "premium" | "new" | "exclusive"
export type VipTier = "signature" | "private-collection" | "off-market"

export type Property = {
  id: string
  code: string
  title: string
  location: string
  city: string
  price: number
  currency: "USD" | "EUR" | "MXN"
  type: "Penthouse" | "Villa" | "Loft" | "Townhouse" | "Apartment" | "Hacienda" | "Residence"
  operation: "rent" | "sale"
  bedrooms: number
  bathrooms: number
  area: number // m²
  image: string
  status: PropertyStatus
  badge?: string
  // VIP-only attributes
  isVip?: boolean
  vipTier?: VipTier
  has360?: boolean
  offMarket?: boolean
  priceOnRequest?: boolean
  // Extended editorial fields
  year: number
  parking: number
  tagline: string
  description: string[]
  features: string[]
  amenities: string[]
  gallery: string[]
  coordinates: string
  agent: {
    name: string
    role: string
    initials: string
  }
}

export const PROPERTIES: Property[] = [
  {
    id: "p-001",
    code: "HB-0421",
    title: "Penthouse Alameda",
    location: "Polanco V",
    city: "Ciudad de México",
    price: 8_950_000,
    currency: "MXN",
    type: "Penthouse",
    operation: "sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    image: "/properties/penthouse-cinematic.jpg",
    status: "premium",
    badge: "VIP",
    isVip: true,
    vipTier: "signature",
    has360: true,
    year: 2022,
    parking: 3,
    tagline:
      "Un penthouse esculpido en travertino, con vistas sin obstáculos al skyline y terraza privada al poniente.",
    description: [
      "Alameda es un triplex de autor diseñado por el estudio Laboratorio 23. Su planta abierta privilegia la luz natural y las transiciones silenciosas entre interior y exterior.",
      "Los materiales son nobles y discretos: pisos de travertino veteado, carpintería de nogal americano y herrajes en bronce bruñido. La doble altura en la sala principal dialoga con un skylight que filtra la luz del mediodía.",
      "Incluye acceso privado por elevador, amenidades residenciales de Polanco V y concierge 24/7. Se entrega listo para habitar con cocina equipada y climatización integral.",
    ],
    features: [
      "Triple altura en sala",
      "Cocina Boffi con isla de travertino",
      "Terraza 58 m² con jacuzzi",
      "Elevador privado",
      "Walk-in closet principal",
      "Sistema domótico integral",
    ],
    amenities: [
      "Concierge 24/7",
      "Spa y sauna",
      "Gimnasio privado",
      "Sala de cata",
      "Jardín interior",
    ],
    gallery: [
      "/properties/penthouse-cinematic.jpg",
      "/properties/detail-kitchen.jpg",
      "/properties/detail-terrace.jpg",
      "/properties/detail-bath.jpg",
    ],
    coordinates: "19.4326° N · 99.1952° W",
    agent: {
      name: "Valentina Cordero",
      role: "Asesora senior · Polanco",
      initials: "VC",
    },
  },
  {
    id: "p-002",
    code: "HB-0387",
    title: "Villa Horizonte",
    location: "Costa Careyes",
    city: "Jalisco",
    price: 12_400_000,
    currency: "MXN",
    type: "Villa",
    operation: "sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 610,
    image: "/properties/modernist-villa.jpg",
    status: "exclusive",
    badge: "Exclusiva",
    isVip: true,
    vipTier: "private-collection",
    has360: true,
    year: 2021,
    parking: 4,
    tagline:
      "Una villa cantiléver frente al Pacífico, concebida como un refugio horizontal entre cielo y océano.",
    description: [
      "Horizonte es una casa de autor de 610 m² construida sobre un acantilado en Careyes. La geometría es deliberadamente horizontal: una losa ligera que parece flotar sobre el paisaje.",
      "Cinco recámaras en suite, todas con vista al mar, y una alberca infinita de 22 metros que se integra con la línea del horizonte. El proyecto paisajístico privilegia la flora endémica y el ciclo del agua.",
      "Se entrega amueblada con piezas seleccionadas por el estudio de interiorismo Casa Azul, incluyendo obra original firmada por artistas locales.",
    ],
    features: [
      "Alberca infinita 22 m",
      "5 recámaras en suite con vista al mar",
      "Pabellón de yoga",
      "Cocina exterior completa",
      "Bodega de vinos climatizada",
      "Heliostato y energía solar",
    ],
    amenities: [
      "Acceso privado a playa",
      "Servicio de casa incluido 1 año",
      "Muelle compartido",
      "Club ecuestre",
      "Seguridad perimetral 24/7",
    ],
    gallery: [
      "/properties/modernist-villa.jpg",
      "/properties/detail-terrace.jpg",
      "/properties/detail-kitchen.jpg",
      "/properties/detail-bath.jpg",
    ],
    coordinates: "19.4326° N · 105.0300° W",
    agent: {
      name: "Esteban Ruiz",
      role: "Asesor senior · Costa",
      initials: "ER",
    },
  },
  {
    id: "p-003",
    code: "HB-0512",
    title: "Loft Industrial Roma",
    location: "Roma Norte",
    city: "Ciudad de México",
    price: 38_500,
    currency: "MXN",
    type: "Loft",
    operation: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 92,
    image: "/properties/urban-loft.jpg",
    status: "ai-verified",
    badge: "Verificado IA",
    year: 2019,
    parking: 1,
    tagline:
      "Un loft industrial en una fábrica reconvertida, con muros originales de ladrillo y ventanales de acero negro.",
    description: [
      "En el corazón de Roma Norte, este loft ocupa el ala norte de una antigua fábrica textil de 1928. La intervención fue mínima y respetuosa: se conservaron los muros de ladrillo visto y la estructura de acero original.",
      "La planta es completamente abierta, con 4.20 m de altura y una banda continua de ventanales que orientan el espacio al parque. Incluye mezzanine con recámara principal y baño completo.",
      "Amueblado con piezas de diseño mexicano contemporáneo. Renta amueblada con servicios incluidos (luz, agua, internet fibra 1 Gbps).",
    ],
    features: [
      "Muros originales de ladrillo",
      "Doble altura 4.20 m",
      "Mezzanine con recámara principal",
      "Piso de concreto pulido",
      "Cocina integral equipada",
      "Amueblado por Fábrica Social",
    ],
    amenities: [
      "Internet fibra 1 Gbps incluido",
      "Roof garden común",
      "Bodega privada",
      "Control de acceso biométrico",
    ],
    gallery: [
      "/properties/urban-loft.jpg",
      "/properties/detail-kitchen.jpg",
      "/properties/detail-bath.jpg",
      "/properties/detail-terrace.jpg",
    ],
    coordinates: "19.4194° N · 99.1616° W",
    agent: {
      name: "Mariana Pech",
      role: "Asesora · Roma · Condesa",
      initials: "MP",
    },
  },
  {
    id: "p-004",
    code: "HB-0498",
    title: "Casa Olivar",
    location: "San Miguel",
    city: "Guanajuato",
    price: 6_200_000,
    currency: "MXN",
    type: "Townhouse",
    operation: "sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    image: "/properties/coastal-townhouse.jpg",
    status: "new",
    badge: "Nuevo",
    year: 2024,
    parking: 2,
    tagline:
      "Una casa de pueblo contemporánea entre olivos centenarios, a diez minutos del centro histórico.",
    description: [
      "Casa Olivar interpreta la tradición sanmiguelense con un lenguaje contemporáneo: muros encalados, tejas de barro artesanales y patios interiores que regulan la temperatura.",
      "Cuatro recámaras distribuidas en dos niveles, tres baños completos y un patio central con olivo centenario que organiza la circulación. La cocina se abre al patio mediante puertas corredizas de hierro forjado.",
      "Proyecto entregado llave en mano, con acabados de autor y climatización geotérmica. Disponible para mudanza inmediata.",
    ],
    features: [
      "Patio central con olivo",
      "Climatización geotérmica",
      "Chimenea de leña",
      "Azotea con vista a la Parroquia",
      "Herrajes artesanales",
      "Pisos de cantera rosa",
    ],
    amenities: [
      "Caseta de vigilancia 24/7",
      "Alberca común",
      "Senderos de caminata",
      "A 10 min del Centro Histórico",
    ],
    gallery: [
      "/properties/coastal-townhouse.jpg",
      "/properties/detail-kitchen.jpg",
      "/properties/detail-terrace.jpg",
      "/properties/detail-bath.jpg",
    ],
    coordinates: "20.9153° N · 100.7440° W",
    agent: {
      name: "Diego Alcántara",
      role: "Asesor · El Bajío",
      initials: "DA",
    },
  },
  {
    id: "p-005",
    code: "HB-0602",
    title: "Hacienda Laurel",
    location: "Valle de Bravo",
    city: "Estado de México",
    price: 28_500_000,
    currency: "MXN",
    type: "Hacienda",
    operation: "sale",
    bedrooms: 7,
    bathrooms: 6,
    area: 1240,
    image: "/properties/hacienda-laurel.jpg",
    status: "exclusive",
    badge: "Off-market",
    isVip: true,
    vipTier: "off-market",
    has360: true,
    offMarket: true,
    priceOnRequest: true,
    year: 1892,
    parking: 8,
    tagline:
      "Hacienda colonial de 14 hectáreas restaurada por un estudio europeo, rodeada por un bosque privado de laureles.",
    description: [
      "Laurel es una hacienda del siglo XIX restaurada con un criterio de museo. Las crujías originales se mantuvieron intactas, dialogando con intervenciones contemporáneas firmadas por el arquitecto John Pawson.",
      "El predio cubre 14 hectáreas de bosque privado, un lago natural y caballerizas en funcionamiento. Siete recámaras en la casa principal y dos cabañas satélite para huéspedes.",
      "Se ofrece amueblada con una colección seleccionada de arte mexicano y europeo del siglo XX. Transacción fuera de mercado, bajo acuerdo de confidencialidad.",
    ],
    features: [
      "Restauración John Pawson",
      "14 ha de bosque privado",
      "Lago natural con embarcadero",
      "Caballerizas en funcionamiento",
      "Helipuerto certificado",
      "Cava de 3,500 etiquetas",
    ],
    amenities: [
      "Equipo de casa completo (8)",
      "Seguridad con perros certificados",
      "Invernadero de autoconsumo",
      "Capilla del siglo XVIII",
    ],
    gallery: [
      "/properties/hacienda-laurel.jpg",
      "/properties/detail-terrace.jpg",
      "/properties/detail-kitchen.jpg",
      "/properties/detail-bath.jpg",
    ],
    coordinates: "19.1953° N · 100.1306° W",
    agent: {
      name: "Sofía de la Peña",
      role: "Directora · Colección Privada",
      initials: "SP",
    },
  },
  {
    id: "p-006",
    code: "HB-0571",
    title: "Casa Bosque",
    location: "Reserva Nescafé",
    city: "Chiapas",
    price: 14_800_000,
    currency: "MXN",
    type: "Residence",
    operation: "sale",
    bedrooms: 4,
    bathrooms: 4,
    area: 520,
    image: "/properties/casa-bosque.jpg",
    status: "premium",
    badge: "Signature",
    isVip: true,
    vipTier: "signature",
    has360: true,
    year: 2023,
    parking: 3,
    tagline:
      "Una residencia brutalista embebida en el bosque nublado, concebida como una pausa entre el hombre y el bosque.",
    description: [
      "Casa Bosque es un proyecto de Productora Arquitectos sobre 2 hectáreas de bosque nublado. Un único volumen horizontal de concreto encofrado en madera que se suspende entre los árboles sin tocarlos.",
      "El programa se organiza en una sola planta, con cuatro recámaras orientadas al bosque, biblioteca de triple altura y cocina abierta a una terraza sobre el dosel arbóreo. Fachadas de cristal de piso a techo con rompevientos de madera carbonizada.",
      "Certificación LEED Platino. Se entrega con huerto establecido, sistema de captación pluvial y energía 100% fotovoltaica con respaldo.",
    ],
    features: [
      "Diseño Productora Arquitectos",
      "LEED Platino",
      "Captación pluvial 40,000 L",
      "Biblioteca triple altura",
      "Terraza sobre el dosel",
      "Fotovoltaica con respaldo",
    ],
    amenities: [
      "Reserva ecológica privada",
      "Sendero interpretativo propio",
      "Quebrada natural",
      "Servicio de guardabosques",
    ],
    gallery: [
      "/properties/casa-bosque.jpg",
      "/properties/detail-bath.jpg",
      "/properties/detail-kitchen.jpg",
      "/properties/detail-terrace.jpg",
    ],
    coordinates: "16.7370° N · 92.6375° W",
    agent: {
      name: "Andrés Villalobos",
      role: "Asesor · Sur-Sureste",
      initials: "AV",
    },
  },
]

export function formatPrice(value: number, currency: Property["currency"]) {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  })
  return formatter.format(value)
}

export function getPropertyById(id: string) {
  return PROPERTIES.find((p) => p.id === id)
}

export const VIP_PROPERTIES = PROPERTIES.filter((p) => p.isVip)
