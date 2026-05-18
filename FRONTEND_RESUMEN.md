# Memoria de Arquitectura Frontend - Blok-On

Este documento sirve como registro y "memoria" del estado actual, estructura y reglas de diseño del frontend (Directorio `app/`) del proyecto Blok-On.

## 🏗️ 1. Estructura de Rutas (App Router - Next.js 15+)

El frontend está estructurado como una aplicación multi-página orientada a conversión y exposición de portafolio B2B/B2C:

- **`/` (Inicio - `app/page.tsx`)**: Actúa como el *Hub* central (Landing Page). Agrupa de forma resumida el valor de la marca e invita a visitar el resto de secciones. Contiene un Hero principal, "Ventajas Estructurales" (iconos) y resúmenes con llamadas a la acción (CTAs) para Sobre Nosotros, Proyectos, Kits, Muros y Productos.
- **`/muro`**: Landing page especializada en **Muros Perimetrales**. Incluye un hero enfocado, una guía visual de pasos de cotización y un formulario de contacto altamente personalizado con iconos en cada campo (incluyendo logo de WhatsApp).
- **`/productos`**: Catálogo de materiales sueltos. Implementa tarjetas de producto (`ProductCard`) que soportan lógica de precios regulares vs. precios de oferta.
- **`/proyectos`**: Portafolio corporativo. Muestra logotipos de alianzas/proyectos destacados (ej. Ciudad El Doral, Monte Nebo), una galería de viviendas construidas y una reiteración de las ventajas competitivas.
- **`/kits`**: Catálogo enfocado en la venta de kits de viviendas pre-diseñadas.
- **`/sobre-nosotros`**: Información corporativa, historia y misión de la empresa.
- **`/contacto`**: Página genérica de contacto.
- **`/blog`**: Renderizado de artículos traídos de forma *Headless* desde WordPress.
- **`/checkout`**: Flujo de pago y facturación personalizado (preparado para B2B).

## 🎨 2. Sistema de Diseño (Design System)

La identidad visual está programada rígidamente para transmitir **solidez, ingeniería, ecología y modernidad**.

- **Color Primario (Azul Marino):** `#11406C` - Usado para textos principales, fondos de secciones heroicas y botones primarios.
- **Color Acento (Verde Lima):** `#96C121` - Usado para resaltar información clave, hover states, separadores visuales y notificaciones.
- **Tipografías:**
  - **Títulos:** `font-moderniz` (Usada sistemáticamente en mayúsculas y con tracking ajustado para dar look arquitectónico).
  - **Cuerpo de texto:** `font-acumin` (o Inter en su defecto) para máxima legibilidad.
- **Estética de Componentes:** 
  - Abundante uso de márgenes amplios (`py-24`).
  - Tarjetas (Cards) con bordes redondeados y transiciones suaves al hacer hover (`hover:shadow-xl`, `hover:scale-105`).
  - Iconografía vectorial estandarizada (SVGs limpios, sin relleno, solo trazo `strokeWidth="1.5"`).

## 🧩 3. Componentes Globales

- **`Header.tsx` (`components/layout/Header.tsx`)**: 
  - Barra de navegación *sticky* superior.
  - Contiene el logo a la izquierda, enlaces al centro, y un bloque derecho tipo "píldora" con información de contacto directa y botones de carrito/usuario.
  - Menú hamburguesa responsivo completamente estilizado.
- **`Footer.tsx`**: Pie de página estandarizado presente en todo el sitio gracias a `layout.tsx`.

## ⚙️ 4. Reglas de Desarrollo y Mantenimiento

1. **Uso de Imágenes:** Las imágenes estáticas de diseño (ej. fotos de muros) están en `public/images/muro/`. Las imágenes dinámicas (productos) provienen del backend (CORS y dominios configurados en `next.config.js`).
2. **Interactividad Visual:** No se deben usar colores estridentes fuera de la paleta. Todo botón debe tener una transición (`transition-colors` o `transition-all`).
3. **Formularios:** Los formularios deben tener validación y usar iconos para guiar visualmente al usuario. El botón de envío debe ser contrastante.
4. **Despliegue:** Para subir cambios, siempre recordar: `git pull`, `npm install`, `npm run build` y `pm2 restart blokon-web`.

---
*Última actualización: Mayo 2026. Documento generado para mantener el contexto arquitectónico del Frontend.*
