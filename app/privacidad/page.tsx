import { LegalShell, LegalSection } from "@/components/legal-shell"

export const metadata = {
  title: "Política de Tratamiento de Datos",
  description:
    "Política de tratamiento de datos personales de Vision Estate Colombia conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacidad" },
}

export default function PrivacidadPage() {
  return (
    <LegalShell
      eyebrow="Habeas Data · Ley 1581 de 2012"
      title="Política de Tratamiento de Datos Personales"
      updated="13 de junio de 2026"
    >
      <p>
        Vision Estate Colombia (en adelante, &ldquo;Vision Estate&rdquo;,
        &ldquo;nosotros&rdquo;) es responsable del tratamiento de los datos
        personales que recibe a través de{" "}
        <strong>visionestatecolombia.com</strong>. Esta política se expide en
        cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás
        normas concordantes sobre protección de datos personales en Colombia.
      </p>

      <LegalSection heading="1. Responsable del tratamiento">
        <p>
          <strong>Vision Estate Colombia.</strong> Canal de atención y ejercicio
          de derechos:{" "}
          <a
            href="mailto:hola@visionestatecolombia.com"
            className="text-foreground underline underline-offset-4 hover:text-[color:var(--luxe-ink)]"
          >
            hola@visionestatecolombia.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="2. Datos que recolectamos">
        <p>
          Recolectamos los datos que usted nos proporciona voluntariamente al:
          registrarse para publicar una propiedad, solicitar acceso anticipado a
          la colección, contactar nuestra asesoría o interactuar con el asistente
          virtual. Estos pueden incluir: nombre, correo electrónico, teléfono,
          ciudad e información del inmueble.
        </p>
      </LegalSection>

      <LegalSection heading="3. Finalidad del tratamiento">
        <p>Tratamos sus datos para:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-[color:var(--luxe-ink)]">
          <li>Gestionar su registro, publicaciones y solicitudes.</li>
          <li>
            Contactarle sobre propiedades, su publicación y el estado de su
            cuenta.
          </li>
          <li>
            Conectarle con compradores interesados y con nuestra agencia aliada
            para acompañar la operación de venta.
          </li>
          <li>Enviar comunicaciones sobre la colección, cuando lo autorice.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Transferencia a Colombia Inmobiliaria">
        <p>
          Vision Estate opera como portal editorial y motor de leads. Cuando
          usted lo autoriza expresamente, compartimos los datos de contacto y la
          información del inmueble con nuestra agencia aliada{" "}
          <strong>Colombia Inmobiliaria</strong>, que puede contactarle —incluso
          por correo electrónico desde su propia marca— para acompañar el
          proceso de compra o venta. Esta autorización es voluntaria y puede
          revocarse en cualquier momento.
        </p>
      </LegalSection>

      <LegalSection heading="5. Derechos del titular">
        <p>
          Como titular de los datos usted tiene derecho a conocer, actualizar,
          rectificar y suprimir sus datos, así como a revocar la autorización
          otorgada y a solicitar prueba de la misma. Para ejercerlos, escríbanos
          a{" "}
          <a
            href="mailto:hola@visionestatecolombia.com"
            className="text-foreground underline underline-offset-4 hover:text-[color:var(--luxe-ink)]"
          >
            hola@visionestatecolombia.com
          </a>
          . Atenderemos su solicitud en los plazos previstos por la ley.
        </p>
      </LegalSection>

      <LegalSection heading="6. Seguridad y conservación">
        <p>
          Adoptamos medidas técnicas y administrativas razonables para proteger
          sus datos. Los conservamos mientras exista una relación con usted o sea
          necesario para las finalidades descritas, y luego procedemos a su
          supresión segura.
        </p>
      </LegalSection>

      <LegalSection heading="7. Vigencia">
        <p>
          Esta política rige desde su publicación y puede actualizarse. Los
          cambios relevantes se informarán a través del sitio.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
