import { LegalShell, LegalSection } from "@/components/legal-shell"

export const metadata = {
  title: "Política de Cookies",
  description: "Cómo Vision Estate Colombia utiliza cookies y tecnologías similares.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/cookies" },
}

export default function CookiesPage() {
  return (
    <LegalShell
      eyebrow="Tecnologías de seguimiento"
      title="Política de Cookies"
      updated="13 de junio de 2026"
    >
      <p>
        Utilizamos cookies y tecnologías similares para que el portal funcione,
        recordar su sesión y entender de forma agregada cómo se usa el sitio.
      </p>

      <LegalSection heading="1. Cookies estrictamente necesarias">
        <p>
          Permiten la autenticación y el mantenimiento de su sesión (gestionada
          con Supabase). Sin ellas, funciones como iniciar sesión o publicar no
          operan correctamente.
        </p>
      </LegalSection>

      <LegalSection heading="2. Cookies de medición">
        <p>
          Usamos analítica (Vercel Analytics) para medir el tráfico de forma
          agregada y mejorar el portal. No la usamos para identificarle de manera
          individual.
        </p>
      </LegalSection>

      <LegalSection heading="3. Gestión de cookies">
        <p>
          Puede configurar su navegador para bloquear o eliminar cookies. Tenga
          en cuenta que deshabilitar las cookies necesarias puede afectar el
          funcionamiento del portal.
        </p>
      </LegalSection>

      <LegalSection heading="4. Más información">
        <p>
          Para conocer cómo tratamos sus datos personales, consulte nuestra{" "}
          <a
            href="/privacidad"
            className="text-foreground underline underline-offset-4 hover:text-[color:var(--luxe-ink)]"
          >
            Política de Tratamiento de Datos
          </a>
          .
        </p>
      </LegalSection>
    </LegalShell>
  )
}
