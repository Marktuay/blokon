# Memoria de Arquitectura Frontend - Blok-On

Este documento sirve como registro y "memoria" del estado actual, estructura y reglas de diseño del frontend (Directorio `app/`) del proyecto Blok-On.

## 🏗️ 1. Estructura de Rutas (App Router - Next.js 15+)

El frontend está estructurado como una aplicación multi-página orientada a conversión y exposición de portafolio B2B/B2C:

- **`/` (Inicio - `app/page.tsx`)**: Actúa como el *Hub* central (Landing Page). Agrupa de forma resumida el valor de la marca e invita a visitar el resto de secciones. Contiene un Hero principal interactivo (inicia con un video inmersivo y al terminar hace una transición al texto y botones estáticos), "Ventajas Estructurales" (iconos) y resúmenes con llamadas a la acción (CTAs) para Sobre Nosotros, Proyectos, Kits, Muros y Productos.
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

## 🧩 3. Componentes Globales e Interactivos

- **`Header.tsx` (`components/layout/Header.tsx`)**: 
  - Barra de navegación *sticky* superior.
  - Contiene el logo a la izquierda, enlaces al centro, y un bloque derecho tipo "píldora" con información de contacto directa y botones de carrito/usuario. Se integra también un botón flotante directo a WhatsApp.
  - Menú hamburguesa responsivo completamente estilizado.
- **`Footer.tsx`**: Pie de página estandarizado presente en todo el sitio gracias a `layout.tsx`. (Se removió el botón flotante general para priorizar el de la cabecera).
- **`HeroSection.tsx` (`components/home/HeroSection.tsx`)**: Componente cliente que consolida el Hero en un carrusel dinámico de videos introductorios en secuencia. Soporta múltiples videos (actualmente 2: `rF-uyP2mSKk` de primero y `MCTTEprwnS4` de segundo) con autoplay silencioso, botones para omitir, silenciar/desmutear, flechas de anterior/siguiente e indicador de video actual. Al concluir la secuencia completa de videos (detectada mediante la API de YouTube Iframe), realiza una transición suave hacia el Hero estático, dejando un selector de miniaturas interactivas en la esquina inferior derecha para volver a reproducir cualquier video a pantalla completa.

## 🕒 4. Cronología de Cambios Recientes

- **Octubre 2026**: `fix(security): Patch dependencies and resolve all vulnerabilities via npm audit fix`  
  Se ejecutó remediación de seguridad actualizando Next.js a 16.4.3 y parches en dependencias como `sharp`, `postcss`, `js-cookie`, `zod`, `brace-expansion`. La auditoría de `npm audit` pasó de 12 vulnerabilidades (incluyendo 1 crítica y 9 altas) a **0 vulnerabilidades**. La compilación `npm run build` verificó 18 rutas estáticas y dinámicas sin errores.
- **Octubre 2026**: `feat(hero): Add multi-video carousel sequence with rF-uyP2mSKk as first video`  
  Se agregó el video `https://www.youtube.com/watch?v=rF-uyP2mSKk` en primera posición y se mantuvo `MCTTEprwnS4` en segunda posición. Se implementó navegación entre videos (indicador de video 1 de 2, flechas previo/siguiente) y doble miniatura interactiva de repetición en el Hero estático.
- **`cdd57fe` (Octubre 2026)**: `fix(kits): Remove 'Vigas y Accesorios' from kit models features`  
  Se retiró la característica "Vigas y Accesorios" del listado de características de todos los modelos de kits (`app/kits/page.tsx`), tanto para espesores de 12cm como de 15cm y en modalidades Completo y Cajón.
- **`d2f5501` (Agosto 2026)**: `fix(page): Remove erroneous ProductCard imports breaking build`  
  Corrección de imports no utilizados en `app/page.tsx` que provocaban errores de tipado en TypeScript durante el `npm run build` en entornos de producción.
- **`5cceaee` (Agosto 2026)**: `feat(hero): Integrate HeroSection into page and update CSP`  
  Integración definitiva de `HeroSection` en `app/page.tsx`, eliminación del componente obsoleto `HeroVideo.tsx` y actualización de la directiva `img-src` en `next.config.ts` para soportar miniaturas de YouTube (`img.youtube.com`, `i.ytimg.com`).
- **`5b321bd` (Agosto 2026)**: `fix(hero): Use official YT Iframe API for robust state detection`  
  Implementación de la API oficial de YouTube Iframe para capturar de manera fiable el evento `onStateChange` (código 0 = finalizado) y ejecutar la transición automática al contenido estático.
- **`2e11885` (Agosto 2026)**: `feat(hero): Add replay thumbnail to static hero state`  
  Incorporación de la miniatura flotante con botón Play en la esquina inferior derecha del Hero estático para volver a reproducir el video a pantalla completa.
- **`ee496ae` (Agosto 2026)**: `feat(home): Move HeroVideo to a dedicated section below Hero`  
  Etapa previa de experimentación donde el video se ubicó bajo el Hero antes de consolidarse en el carrusel interactivo actual.

## ⚙️ 5. Reglas de Desarrollo y Mantenimiento

1. **Uso de Imágenes y Medios:** Las imágenes estáticas de diseño (ej. fotos de muros) están en `public/images/muro/`. Para ahorrar espacio de almacenamiento y mejorar la carga, no se alojan videos grandes de fondo localmente; en su lugar, se insertan desde YouTube.
2. **Interactividad Visual:** No se deben usar colores estridentes fuera de la paleta. Todo botón debe tener una transición (`transition-colors` o `transition-all`).
3. **Seguridad y CSP (`next.config.ts`):** Existe una estricta Política de Seguridad de Contenido (CSP). Si se añade un recurso externo nuevo (como scripts, imágenes o iframes externos), **es imperativo agregarlo en el apartado `frame-src` o `script-src` de `next.config.ts`** para que el navegador no lo bloquee.
4. **Formularios:** Los formularios deben tener validación y usar iconos para guiar visualmente al usuario. El botón de envío debe ser contrastante.
5. **Despliegue:** Para subir cambios, siempre recordar: `git pull`, `npm install`, `npm run build` y `pm2 restart blokon-web`.

---
*Última actualización: Octubre 2026. Documento generado para mantener el contexto arquitectónico del Frontend.*
