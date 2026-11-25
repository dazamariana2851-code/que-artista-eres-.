# Documento de Especificación Técnica y PRD Maestro (AI-Ready para Gravity / VS Code)

**Proyecto:** Reflejo Creativo (*Archetype // El Trazo Interno*)  
**Tipo de Producto:** Web App Interactiva Phygital (Mobile-First vía Código QR) + Dashboard Analítico Privado (`/admin`)  
**Versión:** 2.0 — Especificación Técnica Integral de Producción (Frontend + Backend + Base de Datos + Telemetría)

---

## 0. Prompt Maestro de Instrucción para la IA Desarrolladora (Gravity)

> **INSTRUCCIÓN DIRECTA PARA EL AGENTE DE IA (GRAVITY):**  
> Actúa como un Arquitecto de Software Full-Stack Senior y Director de Arte UI/UX. Tu objetivo es construir una aplicación web completa, funcional, libre de errores y lista para producción llamada **Reflejo Creativo**.  
> 1. **No omitas ni resumas datos:** Debes incluir los **18 artistas completos** y las **10 preguntas completas** con sus textos literarios exactos, reglas de validación y puntajes detallados en las Secciones 6 y 7 de este documento.  
> 2. **Flujo Completo de 5 Vistas:** Implementa la Portada (1), el Motor del Test de 10 preguntas con botón de paleta de pintor y transición de brochazos a pantalla completa (2), el Formulario Demográfico obligatorio con Habeas Data (3), la Pantalla de Resultado con descarga de tarjeta vertical $9:16$ y botón de compartir (4), y el Dashboard Administrativo Privado en `/admin` (5).  
> 3. **Telemetría Invisible + Datos Semilla:** La aplicación debe capturar datos explícitos (formulario) y datos implícitos/invisibles (tiempos de decisión, uso del botón atrás, dispositivo, etiquetas psicológicas) y pre-cargar automáticamente **20 registros simulados (Mock Data)** en el almacenamiento/base de datos para que todos los gráficos del Dashboard `/admin` se visualicen llenos y funcionales desde la primera ejecución.

---

## 1. Concepto General y Propuesta de Valor

* **Nombre Oficial del Proyecto:** *Reflejo Creativo* (Subtítulo editorial: *Archetype // El Trazo Interno*).
* **Pregunta Rectora (Hook):** *«¿Qué artista eres según tu personalidad?»* / *«¿Qué artista habita en tu forma de ver el mundo?»*
* **Contexto de Uso (Experiencia Phygital):** El usuario accede escaneando un **código QR** desde su smartphone en un entorno universitario, museo, galería o exposición. El diseño debe ser estrictamente **Mobile-First**, con respuesta táctil inmediata, transiciones fluidas a $60\text{fps}$ e inmersión a pantalla completa ($100\text{dvh}$).
* **Tono Visual:** Minimalismo de galería (*"White Cube"* / *"Dark Gallery"*), introspectivo, curatorial y moderno (inspirado en el MoMA, Tate Modern y sitios editoriales premiados en Awwwards).

---

## 2. Sistema de Diseño (Design System & UI Tokens)

### 2.1 Paleta de Color (Variables CSS Obligatorias)
```css
:root {
  /* Fondos y Superficies */
  --color-bg-primary: #FAF8F5;      /* Alabaster / Pure White (#FFFFFF) - Fondo principal limpio */
  --color-bg-secondary: #E2EAEB;    /* Bit of Blue - Tarjetas inactivas, chips y contenedores secundarios */
  --color-surface-warm: #F2E8DF;    /* Beige Gallery - Pantalla de resultados, citas y formulario */
  --color-canvas-dark: #121518;     /* Obsidian Ink - Overlay de portada, modo galería oscura y modales */

  /* Tipografía y Bordes */
  --color-text-primary: #213448;    /* Navy Deep - Tipografía principal, títulos y bordes fuertes */
  --color-text-secondary: #54626F;  /* Black Coral - Subtítulos, descripciones, numeración y metadatos */

  /* Acentos e Interacción */
  --color-accent-teal: #4A7480;     /* Teal Curatorial - Borde de selección activa, barra de progreso y CTA */
  --color-accent-sky: #BDD3E1;      /* Sky Blue - Hover, focus ring, resplandor (glow) y detalles de paleta */

  /* Estados Semánticos (Formulario y Dashboard) */
  --color-status-success: #2E6F40;  /* Verde curatorial - Consentimiento verificado y estados exitosos */
  --color-status-warning: #D9822B;  /* Ocre alerta - Indicadores de indecisión en Dashboard */
  --color-status-error: #9E2A2B;    /* Carmín error - Validación de campos obligatorios */
}
```

### 2.2 Tipografía y Jerarquía (Google Fonts)
Importar desde Google Fonts: `Cormorant Garamond` (pesos `600`, `700`, `700italic`), `Syne` (peso `700`, `800`) e `Inter` (pesos `300`, `400`, `500`, `600`).
* **Display / Títulos de Impacto (`--font-serif`):** `'Cormorant Garamond', Georgia, serif`. Uso: Frase principal en portada, nombre del pintor asignado en la pantalla de resultados y frases de manifiesto.
* **Numeración Monumental (`--font-numeric`):** `'Syne', sans-serif`. Uso: Contador de preguntas (`01` a `10`) y métricas KPI del Dashboard.
* **UI y Cuerpo de Lectura (`--font-sans`):** `'Inter', system-ui, -apple-system, sans-serif`. Uso: Enunciados de preguntas, opciones de respuesta, formulario demográfico, botones y tablas del Dashboard.

#### Escala Tipográfica Responsiva
* **Hero Display (Portada y Nombre del Artista):** `clamp(2.5rem, 6vw, 4.5rem)`, `line-height: 1.05`, `letter-spacing: -0.02em`.
* **Enunciado de Pregunta (H1 del Test):** `clamp(1.35rem, 3.5vw, 2.15rem)`, `font-weight: 600`, `line-height: 1.25`.
* **Texto de Opciones / Tarjetas:** `1rem` ($16\text{px}$ en móvil) a `1.0625rem` ($17\text{px}$ en desktop), `line-height: 1.5`.
* **Cuerpo de Análisis Psicológico:** `1.0625rem` ($17\text{px}$), `line-height: 1.75`.

### 2.3 Retícula y Reglas de Composición
* **Espacio Negativo:** Mantener al menos un $35\%$ de espacio libre en pantalla para preservar la estética de galería de arte.
* **Grid Móvil (Prioritario $375\text{px} - 430\text{px}$):** 4 columnas, `padding` lateral de $20\text{px}$, `gap` de $12\text{px}$. Las preguntas con 4 imágenes deben disponerse en una cuadrícula compacta $2 \times 2$ para que todas las opciones sean visibles en un solo vistazo sin requerir scroll vertical excesivo.
* **Grid Desktop ($1024\text{px}+$):** 12 columnas, `max-width: 1140px` centrado (`margin: 0 auto`), `padding` de $48\text{px}$, `gap` de $24\text{px}$.

---

## 3. Arquitectura de Experiencia y Flujo Completo (State Machine)

```
[Escaneo de Código QR / Ingreso al Link]
                   │
                   ▼
┌──────────────────────────────────────────────────────────┐
│ 1. PORTADA (LANDING PAGE)                                │
│ • Mosaico de obras de los 18 artistas + Velo oscuro      │
│ • Hook: "¿Qué artista eres según tu personalidad?"       │
│ • Inicia telemetría oculta: session_id, qr_timestamp     │
└──────────────────┬───────────────────────────────────────┘
                   │ (Scroll vertical fluido o clic en CTA "Descubrir mi Pintor")
                   ▼
┌──────────────────────────────────────────────────────────┐
│ 2. CONTENEDOR DEL TEST (PREGUNTAS 01 A 10)               │
│ • Barra superior de progreso (10% a 100%)                │
│ • Selección activa con recuadro #4A7480 + glow #BDD3E1   │
│ • Botón "← Anterior" (Inf. Izquierda, visible en P2-P10) │
│ • Botón "Paleta de Color" (Inf. Derecha, avanza con      │
│   transición de Brochazos de Pincel de 950ms)            │
│ • Captura invisible: tiempo por pregunta y clics "Atrás" │
└──────────────────┬───────────────────────────────────────┘
                   │ (Al completar P10 y pulsar el Botón Paleta)
                   ▼
┌──────────────────────────────────────────────────────────┐
│ 3. CUESTIONARIO DEMOGRÁFICO POST-TEST (OBLIGATORIO)      │
│ • Nombre completo o Alias                                │
│ • Programa / Carrera Universitaria (Selector + Buscador) │
│ • Edad (14 - 99) y Género (Femenino, Masculino, NB, N/A) │
│ • Checkbox obligatorio Habeas Data (con Modal Legal)     │
└──────────────────┬───────────────────────────────────────┘
                   │ (Validación exitosa ──► Guarda en Base de Datos ──► Brochazo Final)
                   ├─────────────────────────────────────────────────────────┐
                   ▼                                                         ▼
┌──────────────────────────────────────────────────────────┐  ┌──────────────────────────────────────────────┐
│ 4. PANTALLA DE RESULTADO FINAL Y VIRALIZACIÓN            │  │ 5. DASHBOARD PRIVADO (/admin)                │
│ • Bloque A: Obra de fondo + "[Nombre], tu arquetipo es:" │  │ • Ruta protegida con Login de Administrador  │
│   + Nombre del Pintor + Galería de 3 Obras (Lightbox)    │  │ • KPIs Globales + Filtros por Fecha y Carrera│
│ • Bloque B (Scroll): Análisis Psicológico + Por qué te   │  │ • Gráficos Demográficos (Carrera, Edad, Sexo)│
│   salió + Barras de 2º y 3º artista más cercano          │  │ • Gráficos Psicológicos y Telemetría Oculta  │
│ • Exportación: Descargar Story 9:16 (1080x1920px)        │  │   (Tiempos, Indecisión, Emociones, Sombras)  │
│ • Viralidad: Botón "Compartir con un Amigo"              │  │ • Tabla de Registros + Exportación CSV/Excel │
└──────────────────────────────────────────────────────────┘  └──────────────────────────────────────────────┘
```

---

## 4. Especificación Funcional de Pantallas y Componentes

### 4.1 Pantalla 1: Portada (Landing Page)
* **Fondo Visual:** Composición tipo collage/mosaico en cuadrícula asimétrica con obras de los 18 artistas animándose suavemente (efecto *ken-burns* lento), cubierta por un velo oscuro `rgba(18, 21, 24, 0.60)` para garantizar contraste AAA con el texto blanco.
* **Contenido Central:**
  * Supratítulo con *letter-spacing* amplio (`0.2em`): `REFLEJO CREATIVO // ARCHETYPE`
  * Titular Principal: **«¿Qué artista eres según tu personalidad?»**
  * Subtítulo: *«Un viaje introspectivo a través de 10 decisiones visuales, cromáticas y emocionales para descubrir qué maestro de la pintura habita en tu mirada.»*
  * **CTA Principal:** Botón elegante `Iniciar Test / Descubrir mi Pintor` + indicador inferior animado de *scroll* vertical (`Desliza hacia abajo ↓`).
  * **Acceso Discreto Admin:** En la esquina inferior o cabecera, incluir un enlace sutil con icono de candado (`Panel Curatorial / Admin`) para que el profesor o evaluador pueda ir rápidamente a `/admin`.

### 4.2 Pantalla 2: Contenedor del Test (Preguntas 01 a 10)
* **Cabecera Fija (Header):**
  * Barra de progreso en el borde superior absoluto (`height: 3px`, fondo `#E2EAEB`, relleno dinámico en `--color-accent-teal` `#4A7480` que avanza de $10\%$ a $100\%$).
  * Indicador numérico `01 / 10` e instrucción clara de la regla de la pregunta actual:
    * Preguntas 1, 3, 4, 6, 7, 8, 9, 10: *«Selecciona 1 opción»*
    * Pregunta 2: *«Selecciona exactamente 2 conceptos (`0/2`)»*
    * Pregunta 5: *«Toca exactamente 3 palabras (`0/3`)»*
* **Jerarquía de Pregunta con Imágenes:**
  * El enunciado de la pregunta se posiciona **siempre arriba**.
  * Las opciones visuales o textuales se ubican **abajo**.
* **Estado Visual de Selección (Regla Estricta):**
  * Al tocar o seleccionar una imagen o tarjeta, su contenedor genera un **recuadro diferenciador de color** (`border: 3px solid #4A7480`, `box-shadow: 0 0 0 4px rgba(189, 211, 225, 0.55)`, `transform: scale(1.02)`) y muestra un badge de confirmación (`✓`) en la esquina superior derecha.
  * Las opciones NO seleccionadas cuando ya se alcanzó el cupo de la pregunta reducen su opacidad a `0.65`.
* **Navegación Inferior Fija (Footer):**
  * **Esquina Inferior Izquierda (Preguntas 02 a 10):** Botón `← Anterior`. Oculto en la Pregunta 01. Al pulsarlo:
    1. Incrementa en $+1$ el contador oculto de arrepentimiento/indecisión (`back_button_count`) de esa pregunta para el Dashboard.
    2. Regresa a la pregunta previa manteniendo intacta la selección que el usuario había hecho antes.
  * **Esquina Inferior Derecha (Preguntas 01 a 10):** **Botón en forma de Paleta de Pintor** ($64\times64\text{px}$ en móvil, $72\times72\text{px}$ en desktop).
    * *Diseño SVG:* Silueta orgánica de una paleta de madera con agujero para el pulgar y 4 círculos internos que representan manchas de óleo.
    * *Estado Inactivo (`disabled`):* Contorno gris `#54626F` al $40\%$ de opacidad, manchas de pintura vacías. No permite avanzar.
    * *Estado Activo (`ready`):* En cuanto el usuario cumple la regla de la pregunta (1 opción, 2 en P2, o 3 en P5), las 4 manchas del SVG se colorean (`#213448`, `#4A7480`, `#BDD3E1`, `#D9822B`), el botón adquiere fondo cálido, sombra flotante y un pulso suave.
* **Transición Animada de "Brochazos de Pincel" (Pantalla Completa):**
  * Al hacer clic en el botón de Paleta de Pintor activo, se dispara una animación de superposición a pantalla completa ($100\text{vw} \times 100\text{dvh}$, duración total $950\text{ms}$).
  * **Implementación Técnica:** Tres franjas horizontales/diagonales con bordes orgánicos de cerdas de pincel (SVG con filtro de desplazamiento `feTurbulence` / `feDisplacementMap` o Canvas HTML5) barren la pantalla en direcciones alternadas con un desfase (`stagger`) de $90\text{ms}$ en colores `#213448`, `#4A7480` y `#E2EAEB`. A los $475\text{ms}$ (cuando la pantalla está $100\%$ cubierta de pintura), se cambia la pregunta activa y se hace `window.scrollTo(0, 0)`; en los $475\text{ms}$ restantes, los brochazos se retiran revelando el nuevo lienzo limpio.

### 4.3 Pantalla 3: Formulario Demográfico Post-Test (Requerimiento Obligatorio)
Aparece tras completar la Pregunta 10 y antes de ver el resultado.
* **Diseño:** Tarjeta editorial centrada sobre fondo `--color-surface-warm` (`#F2E8DF`).
* **Encabezado:** *«Tu lienzo está listo. Antes de revelar qué maestro habita en ti, cuéntanos un poco sobre quién sostiene el pincel.»*
* **Campos con Validación en Tiempo Real:**
  1. **Nombre completo o Alias (`full_name`):** Input de texto (`required`, mínimo 2 caracteres). Placeholder: *Ej. Valentina Gómez*.
  2. **Programa al que pertenece / Carrera Universitaria (`academic_program`):** Opción múltiple de selección única (`required`). Debe incluir exclusivamente las siguientes 11 carreras universitarias:
     * `Ingeniería de Software`
     * `Ingeniería en Ciencia de Datos`
     * `Ingeniería Industrial`
     * `Ingeniería Mecatrónica`
     * `Diseño Visual Digital`
     * `Publicidad Digital y Mercadeo`
     * `Marketing`
     * `Negocios Digitales`
     * `Administración de Empresas`
     * `Negocios Internacionales`
     * `Contaduría Pública`
  3. **Edad (`age`):** Input numérico (`required`, `min="14"`, `max="99"`).
  4. **Género (`gender`):** Botones tipo píldora (*segmented control*) de selección única (`required`): `Femenino` | `Masculino` | `No binario` | `Prefiero no decirlo`.
  5. **Consentimiento Legal / Habeas Data (`privacy_consent`):**
     * Checkbox obligatorio desmarcado por defecto.
     * Texto: *«Autorizo de manera previa, expresa e informada el tratamiento de mis datos personales con fines académicos, estadísticos y de análisis cultural dentro del proyecto Reflejo Creativo, conforme a la Ley 1581 de 2012 (Habeas Data) y la política de privacidad vigente.»*
     * Incluir botón/enlace **«Ver política de tratamiento de datos»** que abra un modal limpio explicando que los datos son de uso estrictamente académico y estadístico, sin cesión a terceros.
* **Botón de Envío:** `Revelar mi Artista →`. Permanece deshabilitado hasta que los 4 campos sean válidos y el checkbox esté marcado. Al pulsarlo, guarda el registro completo en la base de datos/estado persistente y dispara el brochazo final hacia la Pantalla 4.

### 4.4 Pantalla 4: Resultado Final y Viralización
Dividida en dos grandes bloques conectados mediante **scroll vertical**:

#### Bloque A: Revelación Visual (Above the Fold)
1. **Fondo Inmersivo:** Imagen de una obra representativa del artista asignado ocupando la cabecera/fondo con un degradado suave (`linear-gradient(to bottom, rgba(18,21,24,0.45), #121518)`).
2. **Saludo Personalizado:** `[full_name], tu arquetipo artístico es:`
3. **Identidad del Pintor:**
   * **Nombre del Artista** en tipografía Serif Display gigante (`Cormorant Garamond`).
   * **Arquetipo y Estilo Artístico** en badge destacado (ej. *El Visionario Intenso — Postimpresionismo / Trazo emocional*).
   * **Porcentaje de Afinidad Principal:** Ej. `94% de compatibilidad con tu perfil`.
4. **Mini-Galería de 3 Obras Más Famosas (Debajo del nombre):**
   * Tres tarjetas interactivas mostrando las 3 obras cumbres del artista (Título + Año + Imagen). Al hacer clic o tocar cualquiera de ellas, se abre un **Lightbox (Modal a pantalla completa)** para admirar la obra en detalle con su ficha técnica.

#### Bloque B: Análisis Psicológico, Afinidades y Viralización (Al hacer Scroll Vertical)
1. **Narrativa Psicológica ("Por qué eres este artista"):**
   * Presenta la descripción psicológica profunda del pintor.
   * **Resumen Dinámico de Elecciones:** Muestra un recuadro personalizado que conecta explícitamente lo que el usuario respondió: *«Tu elección de la emoción ancla **[Respuesta P3]**, combinada con tu resonancia cromática **[Respuesta P4]** y tus activadores creativos (**[3 palabras de P5]**), revelan una mente que comparte la misma sensibilidad plástica que **[Nombre del Artista]**.»*
2. **Afinidad Secundaria (2º y 3º lugar):**
   * Muestra los dos artistas que quedaron en segundo y tercer lugar en el algoritmo con barras de progreso horizontales y su porcentaje de compatibilidad.
3. **Módulo de Exportación y Viralización:**
   * **Botón 1 (Primario) — `Descargar Tarjeta para Stories (9:16)`:**
     * Genera programáticamente mediante la API nativa `<canvas>` de HTML5 (resolución exacta $1080 \times 1920\text{px}$ para evitar problemas de CORS de imágenes externas y garantizar nitidez retina) un póster vertical de diseño museístico que incluye:
       * Encabezado: `REFLEJO CREATIVO // ARCHETYPE`
       * Texto: `EL TRAZO INTERNO DE [NOMBRE EN MAYÚSCULAS]`
       * Marco artístico con el color dominante del pintor, su nombre en tipografía gigante, el título de su arquetipo, las 3 obras famosas listadas, las 3 palabras clave que el usuario eligió en la Pregunta 5 y el pie de firma con un código QR / URL invitando a otros a hacer el test.
     * Descarga automáticamente el archivo como `Reflejo-Creativo-[Artista].png`.
   * **Botón 2 (Secundario) — `Compartir con un Amigo`:**
     * Intenta invocar `navigator.share()` en móviles con el mensaje: *«¡Hice el test de Reflejo Creativo y mi personalidad artística es [Nombre del Artista] ([Arquetipo])! Descubre qué pintor habita en ti aquí: [URL]»*.
     * Si está en Desktop o falla `navigator.share`, copia el texto y enlace al portapapeles, muestra una notificación flotante (*Toast*: `¡Enlace copiado al portapapeles!`) y despliega accesos directos para compartir en **WhatsApp** (`https://wa.me/?text=...`) y **X (Twitter)**.
   * **Botón 3 (Terciario):** `Reiniciar el Test / Probar de nuevo`.

---

## 5. Especificación del Dashboard Administrativo Privado (`/admin`)

Accesible mediante el botón `Panel Curatorial / Admin` o navegando a la vista `/admin`.

### 5.1 Autenticación de Administrador (Credenciales Demo Preconfiguradas)
Para que el equipo de diseño y el profesor puedan evaluar el Dashboard sin bloqueos técnicos, implementar una pantalla de Login elegante que valide las siguientes credenciales por defecto (mostrar una pequeña nota de ayuda debajo del login en modo demostración con las credenciales):
* **Usuario / Correo:** `admin@reflejocreativo.edu` (o `admin`)
* **Contraseña / Pin:** `Arte2026*` (o `123456`)

### 5.2 Controles Globales del Dashboard
* **Filtros Superiores Interactivos:**
  1. **Filtro por Rango de Tiempo:** `Todo el tiempo` | `Últimos 7 días` | `Hoy`.
  2. **Filtro por Programa / Carrera Universitaria:** Permite seleccionar `Todas las carreras` o filtrar todo el Dashboard por una carrera específica (ej. ver únicamente los datos de `Diseño Visual Digital` o `Ingeniería de Software`).
* **Acciones de Datos:**
  * Botón `Exportar Base de Datos (.CSV)`: Descarga un archivo CSV compatible con Excel (con codificación UTF-8 BOM para tildes) que incluye tanto los datos demográficos como la telemetría oculta de cada participante.
  * Botón `Simular Nuevo Participante (+1)`: Botón de utilidad para presentaciones en vivo frente al profesor que genera un nuevo registro aleatorio realista en tiempo real para demostrar cómo se actualizan las gráficas dinámicamente.

### 5.3 Módulos Visuales del Dashboard (Datos Explícitos + Telemetría Oculta)

#### Fila 1: 6 Tarjetas de KPIs Principales
1. **Total de Participantes:** Contador total de tests completados + tasa de finalización del embudo (% de escaneos QR que llegan al final).
2. **Artista Dominante (Top 1):** Nombre del pintor más asignado, su arquetipo y el porcentaje sobre el total.
3. **Carrera Más Activa:** Nombre del programa universitario con mayor volumen de participación.
4. **Edad Promedio y Género Líder:** Media aritmética de edad (ej. $21.4\text{ años}$) y distribución principal.
5. **Tiempo Promedio de Test (Telemetría Oculta):** Duración media que tarda un usuario en responder las 10 preguntas (ej. $1\text{m } 42\text{s}$).
6. **Índice de Indecisión (Telemetría Oculta):** Promedio de veces que los usuarios presionan el botón `← Anterior` y cuál es la pregunta que genera más arrepentimientos.

#### Fila 2: Gráficos Principales de Afinidad Artística y Academia
* **Gráfico 1 — Ranking de los 18 Artistas Detectados:** Gráfico de barras horizontales ordenado de mayor a menor mostrando el conteo exacto y porcentaje de cada pintor.
* **Gráfico 2 — Participación por Programa / Carrera Universitaria y Cruce Artístico:** Gráfico de barras que muestra cuántos estudiantes hay por carrera y cuál es el **artista número 1 dentro de cada carrera** (ej. *Ingeniería de Software $\rightarrow$ Piet Mondrian*, *Diseño Visual Digital $\rightarrow$ Vincent van Gogh*).

#### Fila 3: Demografía de la Audiencia
* **Gráfico 3 — Distribución por Género:** Gráfico de dona (*Donut Chart*) con leyendas y porcentajes para `Femenino`, `Masculino`, `No binario` y `Prefiero no decirlo`.
* **Gráfico 4 — Distribución por Rangos de Edad:** Histograma vertical agrupado en 4 cohortes: `14–18 años`, `19–21 años`, `22–25 años`, `26+ años`.

#### Fila 4: Analítica Psicológica Invisible (Lo que el usuario no sabe que se mide)
* **Gráfico 5 — Termómetro Emocional Colectivo (Pregunta 3):** Distribución porcentual del estado de ánimo de la comunidad universitaria entre `Nostalgia`, `Melancolía`, `Euforia`, `Serenidad` y `Rebeldía`.
* **Gráfico 6 — Mapa de Sombras y Bloqueos Creativos (Pregunta 9):** Gráfica que revela cuál es el mal hábito más frecuente confesado anónimamente en el test (`Autodestrucción`, `Obsesión`, `Adicción / Evasión`, `Dureza / Impaciencia`, `Arrogancia / Rigidez`).
* **Gráfico 7 — Telemetría de Fricción Cognitiva por Pregunta (P1 a P10):** Tabla o gráfico combinado que muestra para cada una de las 10 preguntas: el **Tiempo medio de respuesta en segundos** (`decision_time_ms`) y la cantidad de clics en el botón **`← Anterior`** (`back_clicks`).

#### Fila 5: Tabla de Registros Auditables (Data Table)
* Tabla con buscador en vivo (por nombre, carrera o artista) y paginación:
  * Columnas: `ID Sesión`, `Fecha/Hora`, `Participante`, `Programa Académico`, `Edad/Género`, `Artista Asignado (% Afinidad)`, `Emoción / Sombra (P3/P9)`, `Tiempo Total`, `Cambios de Respuesta (Atrás)` y badge verde `Habeas Data OK`.

---

## 6. Estructura Maestra de las 10 Preguntas (Textos Completos, Imágenes y Mapeo)

> **REGLA PARA LA IA:** Utiliza exactamente estos textos literarios completos en la interfaz (no uses textos resumidos). Guarda el progreso del usuario en `sessionStorage` en cada paso.

### Pregunta 01: El Espacio Habitado
* **Enunciado:** *«Elige el escenario donde te gustaría perderte por una hora.»*
* **Tipo de Selección:** Única (`maxSelections: 1`). **Valor:** $+2.0\text{ pts}$ por artista vinculado.
* **Opciones:**
  * **Opción A:** *«Una habitación minimalista vacía con una sola estructura cúbica metálica flotando en el centro.»*
    * *Visual / Atmosfera:* Brutalismo arquitectónico, luz cenital fría sobre concreto y acero reflectante.
    * *Tags:* `["#visceral", "#misterio", "#silencio"]`
    * *Artistas (+2.0 pts):* `["Francis Bacon", "Mark Rothko", "Yayoi Kusama"]`
  * **Opción B:** *«Un estudio de arquitectura o diseño lleno de planos ordenados y muestras de color primario.»*
    * *Visual / Atmosfera:* Mesa luminosa con retículas ortogonales, compases y bloques en rojo, azul y amarillo.
    * *Tags:* `["#estructurado", "#geometria", "#precision"]`
    * *Artistas (+2.0 pts):* `["Piet Mondrian", "David Hockney", "Giotto di Bondone"]`
  * **Opción C:** *«Un gabinete medieval de curiosidades lleno de manuscritos, lupas y frascos de pigmento.»*
    * *Visual / Atmosfera:* Claroscuro cálido, estanterías de roble antiguo, astrolabios y pigmentos minerales.
    * *Tags:* `["#minucioso", "#onirico", "#simbolico"]`
    * *Artistas (+2.0 pts):* `["Jan van Eyck", "El Bosco", "Bartolomé Bermejo", "Simone Martini"]`
  * **Opción D:** *«Una calle nocturna de una gran metrópoli cubierta de graffiti y carteles superpuestos.»*
    * *Visual / Atmosfera:* Asfalto húmedo con reflejos de neón, muros intervenidos con aerosol y *street art*.
    * *Tags:* `["#subversivo", "#urgencia", "#caos"]`
    * *Artistas (+2.0 pts):* `["Jean-Michel Basquiat", "Banksy", "Njideka Akunyili Crosby"]`

### Pregunta 02: Conceptos de Vida
* **Enunciado:** *«Elige las 2 duplas de palabras que mejor definan tu proceso creativo y personal.»*
* **Tipo de Selección:** Múltiple exacta (`maxSelections: 2`, `minSelections: 2`). **Valor:** $+2.0\text{ pts}$ por cada opción elegida.
* **Opciones:**
  * **Opción A:** **«Estructura / Geometría»** — *El orden oculto y la proporción detrás de todas las cosas.*
    * *Tags:* `["#estructurado", "#geometria"]`
    * *Artistas (+2.0 pts):* `["Piet Mondrian", "Giotto di Bondone", "Mark Rothko"]`
  * **Opción B:** **«Caos / Pasión»** — *La urgencia visceral de sentir y plasmar sin filtros.*
    * *Tags:* `["#visceral", "#emocional", "#urgencia"]`
    * *Artistas (+2.0 pts):* `["Vincent van Gogh", "Jean-Michel Basquiat", "Francis Bacon", "Frida Kahlo"]`
  * **Opción C:** **«Detalle / Calma»** — *La paciencia metódica donde habita la perfección técnica.*
    * *Tags:* `["#minucioso", "#precision"]`
    * *Artistas (+2.0 pts):* `["Jan van Eyck", "Simone Martini", "Bartolomé Bermejo", "Njideka Akunyili Crosby"]`
  * **Opción D:** **«Luz / Momento»** — *La captura sensible del instante fugaz y la atmósfera.*
    * *Tags:* `["#atmosferico", "#luminoso"]`
    * *Artistas (+2.0 pts):* `["Claude Monet", "David Hockney"]`
  * **Opción E:** **«Misterio / Sueños»** — *Los mundos simbólicos que despiertan cuando la razón duerme.*
    * *Tags:* `["#onirico", "#subconsciente"]`
    * *Artistas (+2.0 pts):* `["Salvador Dalí", "El Bosco", "Francisco de Goya", "Yayoi Kusama"]`

### Pregunta 03: Emoción Dominante (Pregunta Ancla — Desempate Nivel 1)
* **Enunciado:** *«Si tuvieras que elegir una sola palabra ancla que resuene con tu mundo interior hoy, ¿cuál sería?»*
* **Tipo de Selección:** Única (`maxSelections: 1`). **Valor Ponderado ($\times 1.5$):** $+3.0\text{ pts}$ por artista vinculado.
* **Opciones:**
  * **Opción A:** **«Nostalgia»** — *El eco poético de la memoria, las raíces y el tiempo vivido.*
    * *Tags:* `["#simbolico", "#memoria"]`
    * *Artistas (+3.0 pts):* `["Frida Kahlo", "Njideka Akunyili Crosby", "Simone Martini", "Jan van Eyck"]`
  * **Opción B:** **«Melancolía»** — *La belleza profunda de la sombra, el silencio y la lucidez interior.*
    * *Tags:* `["#sombra", "#visceral"]`
    * *Artistas (+3.0 pts):* `["Francisco de Goya", "Mark Rothko", "Francis Bacon", "Bartolomé Bermejo"]`
  * **Opción C:** **«Euforia»** — *El latido vibrante del color, la obsesión creativa y la energía vital.*
    * *Tags:* `["#vitalista", "#emocional"]`
    * *Artistas (+3.0 pts):* `["Vincent van Gogh", "Yayoi Kusama", "Salvador Dalí", "David Hockney"]`
  * **Opción D:** **«Serenidad»** — *El equilibrio contemplativo donde la mente y la forma descansan.*
    * *Tags:* `["#calma", "#atmosferico"]`
    * *Artistas (+3.0 pts):* `["Claude Monet", "Piet Mondrian", "Giotto di Bondone"]`
  * **Opción E:** **«Rebeldía»** — *El impulso indomable de cuestionar las reglas y sacudir conciencias.*
    * *Tags:* `["#subversivo", "#provocacion"]`
    * *Artistas (+3.0 pts):* `["Jean-Michel Basquiat", "Banksy", "El Bosco"]`

### Pregunta 04: Resonancia Cromática
* **Enunciado:** *«Selecciona la combinación cromática que más resuena con tu espacio actual.»*
* **Tipo de Selección:** Única (`maxSelections: 1`). **Valor:** $+2.0\text{ pts}$ por artista vinculado. (Mostrar en cada tarjeta los 3 bloques de color correspondientes).
* **Opciones:**
  * **Opción A:** **«Tenebrismo»** — *Negro carbón (`#141414`), Carmín profundo (`#6E1414`), Ocre tenue (`#B88B4A`).*
    * *Tags:* `["#sombra", "#visceral"]`
    * *Artistas (+2.0 pts):* `["Francisco de Goya", "Francis Bacon", "Bartolomé Bermejo", "Mark Rothko"]`
  * **Opción B:** **«Neoplástico»** — *Blanco puro (`#FFFFFF`), Negro absoluto (`#0A0A0A`), Azul primario (`#0047AB`).*
    * *Tags:* `["#estructurado", "#geometria"]`
    * *Artistas (+2.0 pts):* `["Piet Mondrian", "Giotto di Bondone", "Jan van Eyck"]`
  * **Opción C:** **«Urbano Neón»** — *Amarillo estridente (`#FFE600`), Negro mate (`#1C1C1C`), Rosa grafiti (`#FF2A85`).*
    * *Tags:* `["#subversivo", "#urgencia"]`
    * *Artistas (+2.0 pts):* `["Jean-Michel Basquiat", "Banksy", "Yayoi Kusama", "Salvador Dalí"]`
  * **Opción D:** **«Luz Orgánica»** — *Verde oliva (`#6B7F46`), Azul lavanda (`#8C9EE8`), Amarillo solar (`#F5C742`).*
    * *Tags:* `["#atmosferico", "#luminoso"]`
    * *Artistas (+2.0 pts):* `["Claude Monet", "David Hockney", "Vincent van Gogh", "Frida Kahlo", "Simone Martini", "Njideka Akunyili Crosby"]`

### Pregunta 05: Activadores del Proceso Creativo
* **Enunciado:** *«Toca las 3 palabras que activan tu proceso creativo.»*
* **Tipo de Selección:** Múltiple exacta (`maxSelections: 3`, `minSelections: 3`). **Valor:** $+1.5\text{ pts}$ por cada palabra seleccionada.
* **Banco de 10 Palabras:**
  1. `GEOMETRÍA` $\rightarrow$ `["Piet Mondrian", "Giotto di Bondone", "Yayoi Kusama"]` (`#estructurado`)
  2. `SOMBRA` $\rightarrow$ `["Francisco de Goya", "Bartolomé Bermejo", "Mark Rothko"]` (`#sombra`)
  3. `DESGARRO` $\rightarrow$ `["Francis Bacon", "Frida Kahlo", "Vincent van Gogh"]` (`#visceral`)
  4. `ATMÓSFERA` $\rightarrow$ `["Claude Monet", "David Hockney", "Njideka Akunyili Crosby"]` (`#atmosferico`)
  5. `URGENCIA` $\rightarrow$ `["Jean-Michel Basquiat", "Vincent van Gogh", "Yayoi Kusama"]` (`#urgencia`)
  6. `PRECISIÓN` $\rightarrow$ `["Jan van Eyck", "Simone Martini", "Piet Mondrian"]` (`#minucioso`)
  7. `MISTERIO` $\rightarrow$ `["El Bosco", "Salvador Dalí", "Mark Rothko"]` (`#onirico`)
  8. `SÁTIRA` $\rightarrow$ `["Banksy", "Francisco de Goya", "El Bosco"]` (`#subversivo`)
  9. `SILENCIO` $\rightarrow$ `["Mark Rothko", "Claude Monet", "Jan van Eyck", "Njideka Akunyili Crosby"]` (`#silencio`)
  10. `PROVOCACIÓN` $\rightarrow$ `["Salvador Dalí", "Banksy", "Jean-Michel Basquiat", "Francis Bacon"]` (`#provocacion`)

### Pregunta 06: El Manifiesto Personal (Desempate Nivel 2)
* **Enunciado:** *«Elige la frase con la que sellarías tu trabajo.»*
* **Tipo de Selección:** Única (`maxSelections: 1`). **Valor Ponderado ($\times 1.5$):** $+3.0\text{ pts}$ por artista vinculado.
* **Opciones:**
  * **Opción A:** *«La belleza nace del orden estricto de las formas.»*
    * *Artistas (+3.0 pts):* `["Piet Mondrian", "Giotto di Bondone", "Simone Martini"]`
  * **Opción B:** *«Prefiero pintar la emoción humana antes que la realidad objetiva.»*
    * *Artistas (+3.0 pts):* `["Francis Bacon", "Vincent van Gogh", "Frida Kahlo", "Mark Rothko", "Francisco de Goya"]`
  * **Opción C:** *«El arte es una herramienta de intervención en el espacio público.»*
    * *Artistas (+3.0 pts):* `["Jean-Michel Basquiat", "Banksy", "Yayoi Kusama", "David Hockney"]`
  * **Opción D:** *«En el detalle más pequeño habita la verdad completa.»*
    * *Artistas (+3.0 pts):* `["Jan van Eyck", "El Bosco", "Bartolomé Bermejo", "Salvador Dalí", "Njideka Akunyili Crosby"]`

### Pregunta 07: El Momento de Pausa
* **Enunciado:** *«Elige el momento de pausa que mejor describe tu domingo ideal:»*
* **Tipo de Selección:** Única (`maxSelections: 1`). **Valor:** $+2.0\text{ pts}$ por artista vinculado.
* **Opciones:**
  * **Opción A:** *«Caminar solo por calles antiguas o museos analizando la arquitectura y los detalles de los edificios.»*
    * *Artistas (+2.0 pts):* `["Jan van Eyck", "Francisco de Goya", "Giotto di Bondone", "Simone Martini", "Bartolomé Bermejo"]`
  * **Opción B:** *«Escuchar música a un volumen alto en una habitación con poca luz, divagando en pensamientos profundos.»*
    * *Artistas (+2.0 pts):* `["Francis Bacon", "Mark Rothko", "Frida Kahlo", "El Bosco"]`
  * **Opción C:** *«Salir a un parque o un lugar abierto a observar cómo cambia la luz del sol a lo largo de la tarde.»*
    * *Artistas (+2.0 pts):* `["Claude Monet", "David Hockney", "Vincent van Gogh", "Njideka Akunyili Crosby"]`
  * **Opción D:** *«Sumergirme en la ciudad, ver el movimiento urbano, la gente y capturar ideas rápidas en el celular o libreta.»*
    * *Artistas (+2.0 pts):* `["Jean-Michel Basquiat", "Banksy", "Salvador Dalí", "Yayoi Kusama"]`

### Pregunta 08: Identidad Textil y Guardarropa
* **Enunciado:** *«Si tu guardarropa hablara de ti hoy, ¿qué texturas y tonos predominan?»*
* **Tipo de Selección:** Única con imagen representativa (`maxSelections: 1`). **Valor:** $+2.0\text{ pts}$ por artista vinculado.
* **Opciones:**
  * **Opción A:** *«Monocromático estricto, líneas rectas, negro absoluto o blanco puro.»*
    * *Artistas (+2.0 pts):* `["Piet Mondrian", "Mark Rothko", "Jan van Eyck", "Giotto di Bondone"]`
  * **Opción B:** *«Prendas oversize, capas mixtas, detalles texturizados o toques de estilo alternativo y urbano.»*
    * *Artistas (+2.0 pts):* `["Jean-Michel Basquiat", "Banksy", "Yayoi Kusama", "Salvador Dalí"]`
  * **Opción C:** *«Tejidos pesados, tonos tierra oscuros, abrigos largos con historia y presencia imponente.»*
    * *Artistas (+2.0 pts):* `["Francisco de Goya", "Francis Bacon", "Bartolomé Bermejo", "El Bosco"]`
  * **Opción D:** *«Prendas fluidas, cómodas, con colores suaves o toques de luz muy orgánicos.»*
    * *Artistas (+2.0 pts):* `["Claude Monet", "David Hockney", "Vincent van Gogh", "Frida Kahlo", "Simone Martini", "Njideka Akunyili Crosby"]`

### Pregunta 09: La Sombra del Proceso (El Mal Hábito)
* **Enunciado:** *«¿Cuál crees que es el mal hábito en el que más fácilmente caerías? Elige la tendencia que más podría sabotear tu proceso creativo o personal.»*
* **Tipo de Selección:** Única (`maxSelections: 1`). **Valor:** $+2.5\text{ pts}$ por artista vinculado.
* **Opciones:**
  * **Opción A — Autodestrucción:** *«Tengo la tendencia a exigirme más de lo necesario, ignorando mis propios límites hasta terminar perjudicándome.»*
    * *Artistas (+2.5 pts):* `["Vincent van Gogh", "Frida Kahlo", "Francis Bacon", "Mark Rothko"]`
  * **Opción B — Obsesión:** *«Puedo quedarme atrapado intentando alcanzar una idea de perfección, incapaz de soltar algo incluso cuando ya debería hacerlo.»*
    * *Artistas (+2.5 pts):* `["Yayoi Kusama", "Jan van Eyck", "Simone Martini", "Njideka Akunyili Crosby"]`
  * **Opción C — Adicción / Evasión:** *«Puedo refugiarme demasiado en aquello que me produce satisfacción inmediata, convirtiéndolo en una forma de evitar mis responsabilidades o emociones.»*
    * *Artistas (+2.5 pts):* `["El Bosco", "Salvador Dalí", "David Hockney"]`
  * **Opción D — Maltrato / Impaciencia:** *«Cuando algo no responde a mis expectativas, puedo reaccionar con dureza, impaciencia o poca consideración hacia los demás.»*
    * *Artistas (+2.5 pts):* `["Francisco de Goya", "Jean-Michel Basquiat", "Bartolomé Bermejo", "Banksy"]`
  * **Opción E — Arrogancia / Rigidez:** *«Puedo aferrarme tanto a mis propias ideas que termino ignorando otras perspectivas, rechazando críticas o sintiéndome superior.»*
    * *Artistas (+2.5 pts):* `["Salvador Dalí", "Piet Mondrian", "Giotto di Bondone"]`

### Pregunta 10: El Combustible Diario
* **Enunciado:** *«¿Cómo te mantienes en movimiento durante un día largo?»*
* **Tipo de Selección:** Única con imagen de cada bebida (`maxSelections: 1`). **Valor:** $+2.0\text{ pts}$ por artista vinculado.
* **Opciones:**
  * **Opción A:** **«Espresso»** — *Enfoque intenso, directo y estructurado.*
    * *Artistas (+2.0 pts):* `["Francis Bacon", "Francisco de Goya", "Piet Mondrian", "Bartolomé Bermejo", "Banksy"]`
  * **Opción B:** **«Un vaso de agua fría»** — *Enfoque limpio, puro y metódico.*
    * *Artistas (+2.0 pts):* `["Jan van Eyck", "Piet Mondrian", "Giotto di Bondone", "Simone Martini"]`
  * **Opción C:** **«Una taza grande de café con leche»** — *Enfoque visceral, cálido y expresivo.*
    * *Artistas (+2.0 pts):* `["Jean-Michel Basquiat", "Vincent van Gogh", "Frida Kahlo", "Salvador Dalí", "Yayoi Kusama"]`
  * **Opción D:** **«Té»** — *Enfoque contemplativo, pausado y atmosférico.*
    * *Artistas (+2.0 pts):* `["Claude Monet", "David Hockney", "Mark Rothko", "El Bosco", "Njideka Akunyili Crosby"]`

---

## 7. Base de Datos Maestra Corregida de los 18 Artistas

Esta tabla ha sido depurada y unificada (sin saltos ni celdas combinadas erróneas) para que todos los 18 pintores tengan exactamente sus datos completos:

| ID | Nombre del Pintor | Estilo Artístico | Título del Arquetipo | Descripción Psicológica Completa | 3 Obras Más Famosas (Título y Año) | Color Firma (HEX) |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Vincent van Gogh** | Postimpresionismo / Trazo emocional | El Visionario Intenso | Pasional, empático, ves el mundo con extrema sensibilidad y expresas tus emociones sin filtro. Vives y creas como actos de entrega absoluta, buscando hacer visible el latido emocional de cada paisaje y de cada vínculo humano. | 1. *La noche estrellada* (1889)<br>2. *Los girasoles* (1888)<br>3. *Autorretrato con sombrero de fieltro* (1887) | `#1D4E89` |
| **02** | **Piet Mondrian** | Neoplasticismo / Geométrico | El Analítico Estructurado | Buscas el orden en el caos, amas la claridad, la lógica visual y la simplicidad esencial. Posees una mente arquitectónica capaz de destilar lo complejo hasta encontrar su estructura pura y armonía universal. | 1. *Composición en rojo, amarillo, azul y negro* (1921)<br>2. *Broadway Boogie Woogie* (1943)<br>3. *Composición II en rojo, azul y amarillo* (1930) | `#D62828` |
| **03** | **Claude Monet** | Impresionismo / Luz y atmósfera | El Observador Presente | Contemplativo, paciente, te enfocas en los matices del momento y en cómo cambian las cosas con el tiempo. Estás conectado con la serenidad y la luz orgánica, deteniéndote a contemplar la belleza fugaz que otros pasan por alto. | 1. *Impresión, sol naciente* (1872)<br>2. *Los nenúfares (Nymphéas)* (1916)<br>3. *Mujer con sombrilla* (1875) | `#588157` |
| **04** | **Salvador Dalí** | Surrealismo | El Soñador Disruptivo | Imaginación sin límites, inconformista, te atrae lo inusual y cuestionas la realidad establecida. Transformas los sueños y el subconsciente en un escenario propio donde las reglas del tiempo y la lógica se doblan. | 1. *La persistencia de la memoria* (1931)<br>2. *Sueño causado por el vuelo de una abeja...* (1944)<br>3. *Cisnes reflejando elefantes* (1937) | `#C98A27` |
| **05** | **Frida Kahlo** | Simbolismo / Expresionismo personal | El Espíritu Introspectivo | Resiliente, auténtico, transformas tus experiencias personales y heridas en identidad y arte visual. No temes habitar tu vulnerabilidad, convirtiendo tu biografía y tus raíces en un lenguaje simbólico profundamente honesto. | 1. *Las dos Fridas* (1939)<br>2. *La columna rota* (1944)<br>3. *Autorretrato con collar de espinas y colibrí* (1940) | `#9E2A2B` |
| **06** | **Mark Rothko** | Color Field / Abstracción pura | El Místico Profundo | Buscas conexiones espirituales y emocionales puras; prefieres el silencio y las emociones intensas sin rodeos. Te conmueven las atmósferas envolventes, la quietud meditativa y el poder del color para tocar lo sublime. | 1. *No. 61 (Rust and Blue)* (1953)<br>2. *Orange and Yellow* (1956)<br>3. *Black on Maroon* (1958) | `#6B1D2F` |
| **07** | **Jean-Michel Basquiat** | Neoexpresionismo / Arte urbano | El Disruptivo Genial | Intuitivo, eléctrico, posees una urgencia expresiva inmensa; mezclas referencias culturales diversas y transformas tus vivencias en un lenguaje visual crudo, veloz, auténtico y rebelde. | 1. *Untitled (Skull)* (1981)<br>2. *Hollywood Africans* (1983)<br>3. *Riding with Death* (1988) | `#E09F3E` |
| **08** | **Francisco de Goya** | Romanticismo / Neoclasicismo | El Crítico Introspectivo | Observador profundo de las contradicciones humanas, de la sombra y la luz. Posees una mirada lúcida y crítica que desconfía de las apariencias superficiales e indaga sin miedo en la verdad psicológica del alma. | 1. *El sueño de la razón produce monstruos* (1799)<br>2. *El aquelarre* (1823)<br>3. *El 3 de mayo en Madrid* (1814) | `#3D352E` |
| **09** | **Francis Bacon** | Figuración contemporánea / Visceral | El Diseccionador de Emociones | Introspectivo, audaz y profundamente honesto; no temes mirar de frente las contradicciones humanas, la vulnerabilidad y la intensidad cruda de la existencia. Prefieres la emoción desnuda antes que el consuelo estético. | 1. *Tres estudios para figuras en la base de una crucifixión* (1944)<br>2. *Estudio según el retrato del papa Inocencio X* (1953)<br>3. *Autorretrato* (1971) | `#78290F` |
| **10** | **El Bosco** | Gótico tardío / Renacimiento | El Visionario Enigmático | Fascinado por los mundos oníricos, los enigmas visuales y la constante tensión entre la razón y el subconsciente. Posees una mente curiosa y laberíntica que disfruta descifrando símbolos ocultos y paradojas. | 1. *El jardín de las delicias* (1500–1505)<br>2. *El carro de heno* (1516)<br>3. *Las tentaciones de San Antonio* (1501) | `#386641` |
| **11** | **Simone Martini** | Gótico internacional / Escuela sienesa | El Poeta de la Elegancia | Sensible, lírico y refinado; encuentras la belleza en la armonía sutil, el gesto delicado y la narrativa simbólica. Tu mente conecta la tradición con una expresividad íntima, dorada y luminosa. | 1. *La Anunciación con Santa Margarita y San Ansano* (1333)<br>2. *Maestà del Palazzo Pubblico de Siena* (1315)<br>3. *Guidoriccio da Fogliano* (1330) | `#B5838D` |
| **12** | **Giotto di Bondone** | Proto-renacimiento / Gótico temprano | El Pionero Humano | Buscas la verdad esencial en las expresiones, valoras los cimientos sólidos y la empatía directa por encima de los aderezos superficiales. Combinas el amor por la estructura clara con una profunda calidez humana. | 1. *La lamentación sobre Cristo muerto* (1305)<br>2. *El beso de Judas* (1306)<br>3. *San Francisco predicando a los pájaros* (1297) | `#355070` |
| **13** | **Jan van Eyck** | Primitivo Flamenco | El Detallista Minucioso | Perfeccionista observador; encuentras valor en la precisión técnica, el simbolismo sutil y los detalles que otros pasan por alto. Para tu mirada metódica, cada reflejo y micro-decisión encierra una verdad completa. | 1. *El matrimonio Arnolfini* (1434)<br>2. *El Políptico de Gante* (1432)<br>3. *Hombre con turbante rojo* (1433) | `#283618` |
| **14** | **Yayoi Kusama** | Arte contemporáneo / Psicodélico | El Infinito Obsesivo | Canalizas tus mundos internos y repeticiones mentales en patrones visuales expansivos que envuelven el entorno. Posees una energía hipnótica capaz de transformar la intensidad psíquica en universos inmersivos y vibrantes. | 1. *Infinity Mirror Room — Phalli's Field* (1965)<br>2. *Pumpkin (Calabaza amarilla)* (1994)<br>3. *Narcissus Garden* (1966) | `#D90429` |
| **15** | **David Hockney** | Pop Art / Figurativo contemporáneo | El Observador Luminoso | Vitalista y versátil; estudias la luz, los espacios cotidianos y te adaptas con soltura a los nuevos medios digitales de expresión. Tienes una mirada fresca y optimista que celebra el color del presente. | 1. *A Bigger Splash* (1967)<br>2. *Portrait of an Artist (Pool with Two Figures)* (1972)<br>3. *Pearblossom Highway* (1986) | `#0077B6` |
| **16** | **Banksy** | Street Art / Arte urbano subversivo | El Provocador Irónico | Agudo e inconforme; utilizas el ingenio gráfico directo y la síntesis visual para cuestionar el entorno social mediante la sátira, el contraste político y la intervención en el espacio público. | 1. *Girl with Balloon* (2002)<br>2. *Flower Thrower (Love is in the Air)* (2003)<br>3. *Devolved Parliament* (2009) | `#2B2D42` |
| **17** | **Njideka Akunyili Crosby** | Pintura contemporánea mixta | El Tejedor de Mundos | Íntimo y multicultural; encuentras tu lenguaje en la intersección de historias personalizadas, capas de textura e identidades compuestas que entrelazan la memoria doméstica con la calma contemplativa. | 1. *Dwell: Aso Ebi* (2017)<br>2. *Before Now After (Mama, Mummy and Mamma)* (2015)<br>3. *The Beautyful Ones* (2014) | `#6D597A` |
| **18** | **Bartolomé Bermejo** | Gótico hispano-flamenco | El Forjador de Identidad | De carácter firme e introspectivo; combinas la exigencia formal con una presencia visual cruda y marcada. Tienes una personalidad sobria, magnética y perfeccionista que no teme al dramatismo de la sombra. | 1. *Piedad Desplà* (1490)<br>2. *Santo Domingo de Silos entronizado* (1477)<br>3. *San Miguel triunfante sobre el demonio* (1468) | `#5F0F40` |

---

## 8. Lógica del Algoritmo de Puntuación y Modelo de Datos (Corregido)

### 8.1 Fórmula Matemática de Puntuación y Porcentaje de Afinidad
Para cada artista $i \in \{1, \dots, 18\}$, el puntaje bruto total $S_i$ se calcula sumando los puntos directos obtenidos en cada pregunta $q \in \{1, \dots, 10\}$ más un bono de coherencia por etiquetas repetidas:

$$S_i = \sum_{q=1}^{10} P_{i,q}$$

Para mostrar al usuario un **Porcentaje de Afinidad ($\text{Affinity}_i$)** comprensible y elegante en la Pantalla de Resultados (tanto para el artista ganador como para el $2^\circ$ y $3^\circ$ lugar), se normaliza el puntaje obtenido frente al puntaje máximo teórico alcanzable por ese artista ($S_{i,\max} \approx 22.0\text{ pts}$), acotado en una escala curatorial entre $60\%$ y $98\%$:

$$\text{Affinity}_i = \min\left(98, \text{round}\left( 55 + \left(\frac{S_i}{S_{\text{winner}}}\right) \times 40 \right)\right)\%$$

#### Regla Estricta de Desempate (Tie-Breaker en 3 Niveles)
Si dos o más artistas empatan en el puntaje máximo $S_{\max}$:
1. **Nivel 1:** Gana el artista que haya sumado puntos en la **Pregunta 03 (Emoción Dominante)**.
2. **Nivel 2:** Si persiste el empate, gana el artista favorecido en la **Pregunta 06 (Manifiesto Personal)**.
3. **Nivel 3:** Si aún persiste el empate, gana el artista favorecido en la **Pregunta 01 (El Espacio Habitado)**.

### 8.2 Esquema de Base de Datos Corregido (JSON / SQL Model `test_submissions`)
*(Nota: Se corrigió la sintaxis JSON que estaba rota en la página 17 del PDF anterior y se integró el bloque `telemetry_hidden` para las métricas invisibles del Dashboard).*

```json
{
  "id": "uuid-v4-8f9d2a1b",
  "created_at": "2026-11-13T22:00:00Z",
  "user_data": {
    "full_name": "Valentina Gómez",
    "academic_program": "Diseño Visual Digital",
    "age": 20,
    "gender": "Femenino",
    "privacy_consent": true,
    "consent_timestamp": "2026-11-13T22:00:00Z"
  },
  "test_result": {
    "primary_artist_id": 1,
    "primary_artist_name": "Vincent van Gogh",
    "primary_archetype": "El Visionario Intenso",
    "primary_score": 16.5,
    "primary_affinity_percent": 95,
    "runner_up_artists": [
      {
        "id": 5,
        "name": "Frida Kahlo",
        "archetype": "El Espíritu Introspectivo",
        "score": 14.0,
        "affinity_percent": 89
      },
      {
        "id": 7,
        "name": "Jean-Michel Basquiat",
        "archetype": "El Disruptivo Genial",
        "score": 12.5,
        "affinity_percent": 85
      }
    ],
    "answers_log": {
      "q1": "D",
      "q2": ["B", "E"],
      "q3": "C",
      "q4": "D",
      "q5": ["DESGARRO", "URGENCIA", "ATMÓSFERA"],
      "q6": "B",
      "q7": "C",
      "q8": "D",
      "q9": "A",
      "q10": "C"
    }
  },
  "telemetry_hidden": {
    "device_type": "Mobile (iOS / 390x844)",
    "total_duration_seconds": 98,
    "back_button_total_clicks": 2,
    "back_button_questions": [3, 6],
    "question_time_ms": {
      "q1": 8400,
      "q2": 11200,
      "q3": 14500,
      "q4": 7100,
      "q5": 15800,
      "q6": 9300,
      "q7": 8200,
      "q8": 7600,
      "q9": 10900,
      "q10": 5000
    },
    "dominant_tags": ["#visceral", "#emocional", "#urgencia"],
    "shared_or_downloaded": true
  }
}
```

---

## 9. Instrucciones de Implementación y Arquitectura para Gravity

1. **Stack Tecnológico Recomendado:**
   * **Frontend:** React 18+ (Next.js App Router o Vite + React + TypeScript) con **Tailwind CSS** configurado con las variables de la Sección 2.1.
   * **Iconografía:** `lucide-react` combinado con el SVG personalizado para el **Botón Paleta de Pintor**.
   * **Gráficos del Dashboard:** Componentes SVG limpios o `recharts` / `chart.js` estilizados con los colores curatoriales (`#213448`, `#4A7480`, `#BDD3E1`, `#54626F`).
   * **Exportación de Tarjeta 9:16:** Generador programático en `<canvas>` nativo ($1080 \times 1920\text{px}$) que dibuje el póster tipográfico y artístico del resultado sin depender de capturas DOM externas que puedan fallar por CORS en teléfonos móviles.
   * **Persistencia Dual:** Si se despliega con Supabase/PostgreSQL, usar la tabla `test_submissions`; además, mantener un espejo automático en `localStorage` (`reflejo_creativo_submissions_v2`) inicializado con **20 registros semilla (Mock Data)** que abarquen distintas carreras universitarias, edades ($17$ a $34\text{ años}$), géneros, los 18 artistas y métricas de telemetría variadas.
2. **Manejo de Imágenes a Prueba de Fallos (Zero Broken Images):**
   * Utilizar URLs de obras de arte de dominio público verificadas (Wikimedia Commons / Unsplash Curated Art) y acompañar cada tarjeta con un respaldo visual (*fallback CSS gradient + textura artística*) para que la interfaz luzca impecable incluso si la red Wi-Fi de la universidad o galería es lenta.