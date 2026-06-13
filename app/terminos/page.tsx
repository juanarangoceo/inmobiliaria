import { LegalShell, LegalSection } from "@/components/legal-shell"

export const metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del portal Vision Estate Colombia.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/terminos" },
}

export default function TerminosPage() {
  return (
    <LegalShell
      eyebrow="Condiciones de uso"
      title="Términos y Condiciones"
      updated="13 de junio de 2026"
    >
      <p>
        El uso de <strong>visionestatecolombia.com</strong> implica la
        aceptación de estos términos. Si no está de acuerdo con ellos, le
        pedimos abstenerse de utilizar el portal.
      </p>

      <LegalSection heading="1. Naturaleza del portal">
        <p>
          Vision Estate Colombia es un portal editorial de propiedades en{" "}
          <strong>venta</strong> en Colombia. No ofrecemos arriendos. La
          publicación de inmuebles está sujeta a curaduría y aprobación manual
          por parte de nuestro equipo.
        </p>
      </LegalSection>

      <LegalSection heading="2. Cuentas de usuario">
        <p>
          Para publicar una propiedad debe registrarse y confirmar su correo
          electrónico. Usted es responsable de la veracidad de la información que
          suministra y del uso de sus credenciales.
        </p>
      </LegalSection>

      <LegalSection heading="3. Contenido publicado">
        <p>
          Al enviar una propiedad usted declara ser el propietario o estar
          autorizado para ofrecerla en venta, y nos concede licencia para
          presentarla editorialmente en el portal. Nos reservamos el derecho de
          no publicar o de retirar contenido que no cumpla nuestros criterios de
          curaduría o la ley.
        </p>
      </LegalSection>

      <LegalSection heading="4. Intermediación y operación de venta">
        <p>
          Vision Estate facilita el contacto entre las partes y, con su
          autorización, deriva los leads a la agencia aliada Colombia
          Inmobiliaria. Vision Estate no es parte de la compraventa; las
          condiciones de cada operación se acuerdan directamente entre comprador
          y vendedor con el acompañamiento que corresponda.
        </p>
      </LegalSection>

      <LegalSection heading="5. Tier VIP">
        <p>
          El tier VIP incluye una landing privada y un asistente virtual. Durante
          la colección inaugural se ofrece sin costo; su precio de referencia es
          de $180.000 COP por publicación. Las condiciones vigentes se indican en
          la página de publicación.
        </p>
      </LegalSection>

      <LegalSection heading="6. Asistente virtual (IA)">
        <p>
          El asistente conversacional genera respuestas con inteligencia
          artificial a partir de la información del inmueble. Puede contener
          imprecisiones; no constituye asesoría legal ni financiera y debe
          verificarse con nuestro equipo antes de tomar decisiones.
        </p>
      </LegalSection>

      <LegalSection heading="7. Propiedad intelectual">
        <p>
          La marca, el diseño y los contenidos editoriales del portal pertenecen
          a Vision Estate o a sus titulares. No pueden reproducirse sin
          autorización.
        </p>
      </LegalSection>

      <LegalSection heading="8. Ley aplicable">
        <p>
          Estos términos se rigen por la legislación colombiana. Cualquier
          controversia se resolverá ante los jueces competentes de Colombia.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
