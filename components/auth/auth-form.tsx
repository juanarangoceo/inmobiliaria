"use client"

import { useActionState, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, signUp, type AuthState } from "@/lib/auth/actions"

const initial: AuthState = {}

export function AuthForm() {
  const params = useSearchParams()
  const [mode, setMode] = useState<"login" | "signup">("login")
  const action = mode === "login" ? signIn : signUp
  const [state, formAction, pending] = useActionState(action, initial)
  const urlError = params.get("error")

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--luxe-ink)]">
          Vision Estate Colombia
        </p>
        <h1 className="font-display mt-3 text-2xl tracking-tight">
          {mode === "login" ? "Inicia sesión" : "Crea tu cuenta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Accede para publicar y gestionar tus propiedades."
            : "Publica tu propiedad y sigue su estado en un solo lugar."}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-1.5">
            <Label htmlFor="full_name">Nombre completo</Label>
            <Input id="full_name" name="full_name" autoComplete="name" />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="email">Correo</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
        </div>

        {(state.error || urlError) && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error ?? urlError}
          </p>
        )}
        {state.message && (
          <p className="rounded-md bg-[color:var(--luxe)]/10 px-3 py-2 text-sm text-foreground">
            {state.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending
            ? "Un momento…"
            : mode === "login"
              ? "Entrar"
              : "Crear cuenta"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="font-medium text-foreground underline underline-offset-4 hover:text-[color:var(--luxe-ink)]"
        >
          {mode === "login" ? "Regístrate" : "Inicia sesión"}
        </button>
      </p>
    </div>
  )
}
