# Vision Estate Colombia — Bitácora del proyecto

> Documento vivo. Se actualiza al cerrar cada fase o cambio relevante para que cualquiera
> (o una nueva sesión de Claude) sepa **dónde vamos y qué sigue**. Última actualización: 2026-06-09 (F1–F7 cerradas y EN PRODUCCIÓN; navegación con accesos añadida; repo en sync; queda solo F8 global opcional).

---

## 1. Qué estamos construyendo

Portal inmobiliario **Vision Estate Colombia** (`visionestatecolombia.com`).
Base Colombia, posicionamiento **mundial** (extranjeros pueden ver propiedades). **Solo venta — sin arriendos.**

Superficies del producto:
- **Portal público** — listings curados de venta (Colombia primero, cara global, bilingüe ES/EN, precios COP + USD).
- **Portal gratuito** — usuarios registrados suben su propia propiedad. Se registran con **Supabase (confirmación por correo)**, suben desde la misma web; **Juan aprueba** antes de publicar.
- **Servicios** — oferta para ayudar a vender la propiedad (solo venta).
- **Zona VIP** — página de propiedades VIP con chatbot; al publicar una VIP se genera una **URL propia del cliente** (landing white-label, sin marca nuestra) con **chatbot que conoce todo el inmueble**.

## 2. Stack e infraestructura

| Pieza | Detalle | Ref / estado |
|---|---|---|
| Framework | Next.js 16 (App Router) + React 19 + Tailwind v4 | repo `/home/juan/inmobiliaria` |
| Repo | GitHub `juanarangoceo/inmobiliaria` (origin SSH) | branch `main` |
| Hosting | Vercel proyecto `inmobiliaria`, team `seller360grados-projects` | prod `inmobiliaria-ruby.vercel.app` → dominio `visionestatecolombia.com` |
| CMS | **Sanity** `vision_estate` | projectId `w09hu120`, dataset `production` |
| Backend/Auth | **Supabase** `Vision_Estate` | ref `dixliwrqeodivmsyhrap`, region us-west-2 |
| IA | **Gemini 3.5 Flash** vía AI SDK `@ai-sdk/google` | key `GEMINI_API_KEY` |

⚠️ **Gotcha Supabase:** Vision_Estate vive en una cuenta/org distinta (`gwrdzmsgcxlobkbtrcdh`) a la del MCP por defecto. Se opera con un MCP local `supabase-vision-local` (PAT en `~/.claude.json`, fuera de git) o vía Management API con el PAT.

### Variables de entorno (definir en `.env.local` y en Vercel)
```
NEXT_PUBLIC_BASE_URL=https://visionestatecolombia.com
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=w09hu120
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_WRITE_TOKEN=        # server-only, para crear drafts desde el form
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dixliwrqeodivmsyhrap.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # server-only
# IA
GEMINI_API_KEY=
```

## 3. Arquitectura / flujo de datos

**Sanity = fuente única de contenido de propiedades.**

```
Usuario (auth Supabase, email confirm)
   │  llena form /publicar
   ▼
Server Action (token Sanity server-side)
   │  crea DRAFT  status=pending
   ▼
Sanity  ──►  Juan aprueba/publica en Studio (/studio)  ──►  status=approved/published
   │
   ▼
Web lee SOLO publicados (next-sanity, ISR)
```

- **Supabase** guarda auth + `profiles` + `submissions` (vincula `user_id ↔ sanityDocId`, estado visible para el usuario). RLS activado.
- **VIP**: schema `vipLanding` con `slug` único → ruta `/v/[slug]` white-label + chatbot Gemini alimentado con los datos del doc.

## 4. Registro de decisiones

| # | Decisión | Estado |
|---|---|---|
| D1 | Marca: **Vision Estate Colombia** (reemplaza "Habitar"/México del scaffold v0) | ✅ |
| D2 | Mercado base Colombia (COP) + global (USD, bilingüe ES/EN) | ✅ |
| D3 | Solo venta, sin arriendos | ✅ |
| D4 | Sanity = fuente única de contenido; Supabase = auth + vínculo | ✅ (recomendado, sin objeción) |
| D5 | IA: **Gemini 3.5 Flash** vía `@ai-sdk/google` | ✅ |
| D6 | Aprobación de inmuebles manual por Juan en Sanity Studio | ✅ |

## 5. Fases de construcción (tracker)

- [x] **F1 — Cimientos:** deps instaladas; clientes `lib/sanity/{client,image}.ts` y `lib/supabase/{client,server,middleware}.ts`; `middleware.ts` raíz; `.env.local` + `.env.example` reescritos; env vars en Vercel (production+development ✅; **preview pendiente** por bug del CLI que exige branch).
- [x] **F2 — Sanity:** `sanity/schemaTypes/{propiedad,vipLanding}.ts`, `sanity/structure.ts` (cola "Por aprobar"), `sanity.config.ts`, Studio embebido en `app/studio/[[...tool]]/page.tsx`, CORS añadido (localhost, dominio, vercel). **Pendiente:** desplegar el manifiesto de schema con `npx sanity login && npx sanity schema deploy` (opcional; el Studio embebido ya usa el schema local). TypeScript pasa (`tsc --noEmit` OK).
- [x] **F3 — Supabase:** auth config (confirmación de correo obligatoria, site_url + allow_list); tablas `profiles` + `submissions` con RLS (4 policies) + trigger `on_auth_user_created` (VERIFICADO con usuario de prueba). Código: `lib/auth/actions.ts` (signUp/signIn/signOut), `app/auth/confirm/route.ts`, `app/ingresar/page.tsx` + `components/auth/auth-form.tsx`, `app/cuenta/page.tsx` (mis propiedades). `GEMINI_API_KEY` y `SANITY_API_WRITE_TOKEN` ya en `.env.local` + Vercel; Gemini probado (`gemini-3.5-flash` responde).
- [x] **F4 — Conectar web:** `lib/sanity/queries.ts` (mapea docs Sanity → tipo `Property`, ISR 60s); home/vip/detalle/sitemap leen del CMS; `scripts/seed-sanity.mjs` sembró y **publicó 6 propiedades colombianas** (2+ VIP) con imágenes en Sanity CDN; rebrand global Habitar→Vision Estate; `formatPrice` en COP es-CO; `priceOnRequest`; `next.config` permite `cdn.sanity.io`. `next build` OK (6 fichas SSG). **Pendiente (movido a F8):** USD para extranjeros + i18n ES/EN completo. **Nota:** Next 16 deprecó `middleware.ts` → renombrar a `proxy.ts` (sigue funcionando).
- [x] **F5 — Publicar (usuario):** `lib/listings/actions.ts` (`submitProperty`: sube imágenes a Sanity, crea doc `status=pending`, registra en Supabase `submissions`); `app/publicar/propiedad/page.tsx` (auth-gated) + `components/listings/submit-form.tsx` (form completo con fotos). `/cuenta` enlaza al form. La propiedad enviada aparece en la cola "Por aprobar" del Studio.
- [x] **F6 — VIP white-label + chatbot:** `lib/ai/google.ts` (Gemini `gemini-3.5-flash` vía `@ai-sdk/google`); `app/api/chat/route.ts` (streaming, system prompt con contexto del inmueble, bilingüe); `components/chat/chat-window.tsx` (useChat v6, color de acento); `VipChatbot` reescrito al chat real; **landing white-label `app/v/[slug]/page.tsx`** (sin chrome, marca del cliente, chatbot que conoce la propiedad). Schema/queries de `vipLanding` añadidos. **Probado en vivo:** Gemini respondió con datos exactos de la propiedad. Landing de ejemplo: `/v/villa-manzanillo`.
- [x] **F7 — Verificar + desplegar:** `next build` OK; chatbot probado en vivo; **desplegado a producción** en Vercel y aliased a `https://visionestatecolombia.com` (todas las rutas 200, chat en prod responde con datos reales). Nota: se eliminó `pnpm-lock.yaml` (estaba desactualizado y rompía el build de Vercel); el repo usa **npm** (`package-lock.json`). Para redeploy: `vercel deploy --prod --yes`.
- [x] **F7.1 — Accesos en la navegación:** `components/site-header.tsx` ahora es auth-aware (Supabase browser client): muestra **"Ingresar"** (→ `/ingresar`) o **"Mi cuenta"** (→ `/cuenta`) según sesión, + botón **"Publicar"** (→ `/publicar/propiedad`). `components/mobile-tab-bar.tsx` añade pestaña **"Publicar"** (4 ítems; etiqueta solo en la activa). Aparece en todo el sitio, incluida la zona VIP (mismo header). Verificado en prod.
- [ ] **F8 — Global:** i18n ES/EN (hreflang) + visor de precio en USD para extranjeros (usa `titleEn`/`taglineEn`/`descriptionEn` ya en el schema y `toUsdApprox` en `lib/properties.ts`).

## 5b. Estado actual (deploy + git)

- **En producción:** `https://visionestatecolombia.com` (Vercel proyecto `inmobiliaria`, team `seller360grados-projects`). Deploy por CLI: `vercel deploy --prod --yes`.
- **Git:** repo `juanarangoceo/inmobiliaria`, rama `main` en sync con lo desplegado. Último commit relevante: accesos de navegación (`536aac3`). El proyecto usa **npm** (se borró `pnpm-lock.yaml`).
- **Pendientes menores:** env var de **preview** en Vercel (bug CLI), renombrar `middleware.ts`→`proxy.ts` (deprecación Next 16), y F8 (i18n/USD).

### Auth · confirmación de correo (importante)
- **Bug corregido (commit `9ec841c`):** `/auth/confirm` solo manejaba `token_hash`; el correo por defecto de Supabase redirige con `?code=` (PKCE). Ahora la ruta hace `exchangeCodeForSession` y conserva `token_hash`. Funciona en **el mismo navegador** donde se hizo el registro.
- **Limitación del free tier:** el proveedor de correo por defecto está **rate-limited (~3-4/hora)** → registros reales pueden ver "email rate limit exceeded". Además la plantilla **NO es editable** sin SMTP propio, por lo que no se puede usar el flujo `token_hash` (cross-device) todavía.
- **Recomendado para producción:** configurar **SMTP propio (Resend free)** en Supabase → habilita más volumen de correos y permite cambiar la plantilla al flujo `token_hash` (la ruta ya lo soporta) para que la confirmación funcione **entre dispositivos**.

## 6. Convenciones

- Idioma de UI: ES por defecto, EN como segundo idioma (i18n). Código/commits en ES claro.
- Precios: se almacenan en COP; se muestran COP + conversión USD para extranjeros.
- No exponer tokens server-only al cliente (`SANITY_API_WRITE_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`).
- Commits/push solo cuando Juan lo pida.

## 7. Sugerencias (estética · estrategia · landing · narrativa · funcionalidad)

> Propuestas para discutir; no implementadas hasta aprobación.

**Estética / marca**
- Paleta "luxe" sobria: fondo hueso/negro + un acento metálico (oro viejo o verde esmeralda — esmeralda guiña a Colombia). Tipografía display serif (ya hay Playfair) + sans geométrica para datos.
- Fotografía a sangre, mucho aire, microinteracciones discretas. Sello "Verificado IA" para listings revisados.

**Estrategia**
- Diferenciador: **curaduría + IA + alcance global**. SEO bilingüe + `hreflang` ES/EN para captar compradores extranjeros (US, Canadá, Europa).
- Embudo VIP como producto premium (landing white-label es el gancho para captar propietarios de alto valor).
- Captura de leads precalificados vía el chatbot (guarda intención + contacto en Supabase).

**Landing**
- Hero con buscador inteligente (ciudad/zona, rango precio en COP/USD, tipo). CTA dual: "Ver propiedades" / "Publicar la mía".
- Bandas: destacadas → cómo funciona (3 pasos) → servicios de venta → zona VIP teaser → prueba social.

**Narrativa**
- Voz editorial, no clasificada: cada inmueble cuenta una historia (ya existe el tono en el scaffold). Para extranjeros: contexto de ciudad/zona, seguridad jurídica de compra en Colombia, proceso para no residentes.

**Funcionalidad (roadmap más allá de F1–F7)**
- Conversión de moneda en vivo, favoritos/guardados (por usuario Supabase), comparador.
- Agendar visita / videollamada desde la ficha. Tour 360° (campo `has360`).
- Panel admin de aprobación con cola `pending`. Notificación por correo al aprobar (Gmail/Resend).
- Chatbot que captura lead y puede "pasar a humano".

## 8. Cómo retomar
1. Lee este archivo + memorias `infra-vision-estate` y `vision-estate-architecture`.
2. Mira el tracker (§5): la primera casilla sin marcar es lo siguiente.
3. Si los tools `mcp__supabase-vision-local__*` no aparecen, reinicia la sesión de Claude Code (el MCP local se carga al iniciar).
