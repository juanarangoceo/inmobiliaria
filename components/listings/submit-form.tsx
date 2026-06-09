"use client"

import { useActionState } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitProperty, type SubmitState } from "@/lib/listings/actions"

const TYPES = [
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

const initial: SubmitState = {}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-[color:var(--luxe)]"> *</span>}
      </Label>
      <Input id={name} name={name} type={type} required={required} placeholder={placeholder} />
    </div>
  )
}

export function SubmitForm() {
  const [state, action, pending] = useActionState(submitProperty, initial)

  if (state.ok) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-[color:var(--luxe)]/25 bg-card px-8 py-12 text-center">
        <CheckCircle2 className="mx-auto size-10 text-[color:var(--luxe)]" strokeWidth={1.5} />
        <h2 className="font-display mt-5 text-2xl tracking-tight">¡Recibimos tu propiedad!</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Quedó en revisión. Nuestro equipo la aprobará antes de publicarla. Puedes
          seguir su estado desde tu cuenta.
        </p>
        <Button asChild className="mt-6">
          <Link href="/cuenta">Ir a mi cuenta</Link>
        </Button>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-10">
      {/* Datos principales */}
      <section className="space-y-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          01 · Sobre el inmueble
        </h2>
        <Field label="Título" name="title" required placeholder="Ej: Apartamento con vista en El Poblado" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="propertyType">
              Tipo de inmueble <span className="text-[color:var(--luxe)]">*</span>
            </Label>
            <select
              id="propertyType"
              name="propertyType"
              required
              defaultValue=""
              className="border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="" disabled>
                Selecciona…
              </option>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <Field label="Año de construcción" name="year" type="number" placeholder="2020" />
        </div>
        <Field label="Frase de portada" name="tagline" placeholder="Una línea que venda la propiedad" />
      </section>

      {/* Ubicación */}
      <section className="space-y-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          02 · Ubicación
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Ciudad" name="city" required placeholder="Medellín" />
          <Field label="Departamento" name="region" placeholder="Antioquia" />
          <Field label="Zona / Barrio" name="location" placeholder="El Poblado" />
        </div>
      </section>

      {/* Detalle */}
      <section className="space-y-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          03 · Detalle y precio
        </h2>
        <div className="grid gap-5 sm:grid-cols-4">
          <Field label="Habitaciones" name="bedrooms" type="number" />
          <Field label="Baños" name="bathrooms" type="number" />
          <Field label="Área (m²)" name="area" type="number" />
          <Field label="Parqueaderos" name="parking" type="number" />
        </div>
        <div className="grid items-end gap-5 sm:grid-cols-2">
          <Field label="Precio (COP)" name="price" type="number" placeholder="850000000" />
          <label className="flex items-center gap-2 pb-2 text-sm">
            <input type="checkbox" name="priceOnRequest" className="size-4" />
            Precio a consultar
          </label>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Describe la propiedad. Separa los párrafos con un salto de línea."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="features">Características</Label>
          <Textarea
            id="features"
            name="features"
            rows={2}
            placeholder="Separadas por comas: Balcón, Cocina integral, Vista panorámica…"
          />
        </div>
      </section>

      {/* Fotos */}
      <section className="space-y-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          04 · Fotos
        </h2>
        <div className="space-y-1.5">
          <Label htmlFor="mainImage">
            Foto principal <span className="text-[color:var(--luxe)]">*</span>
          </Label>
          <Input id="mainImage" name="mainImage" type="file" accept="image/*" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gallery">Galería (varias fotos)</Label>
          <Input id="gallery" name="gallery" type="file" accept="image/*" multiple />
        </div>
      </section>

      {/* Contacto */}
      <section className="space-y-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          05 · Contacto
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nombre de contacto" name="contactName" />
          <Field label="Teléfono / WhatsApp" name="contactPhone" placeholder="+57 300 000 0000" />
        </div>
      </section>

      {state.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4 border-t border-foreground/10 pt-8">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Enviando…" : "Enviar a revisión"}
        </Button>
        <p className="text-xs text-muted-foreground">
          La publicación es gratuita y queda sujeta a aprobación.
        </p>
      </div>
    </form>
  )
}
