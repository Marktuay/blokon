# Blok-On | E-commerce B2B (Headless)

Blok-On es una plataforma de e-commerce de grado empresarial orientada a soluciones estructurales, bloques y kits de viviendas. Está construida bajo una arquitectura **Headless** de vanguardia que separa el Frontend (Next.js) del Backend (WordPress/WooCommerce), asegurando rendimiento, seguridad y escalabilidad superiores.

## 🏗 Arquitectura del Sistema

El sistema opera mediante dos entornos independientes comunicados a través de **GraphQL**:

### 1. Frontend (Next.js 16 - Turbopack)
- **Framework:** Next.js App Router.
- **Estilos:** Tailwind CSS con diseño "Industrial Premium" (Blanco puro, Azul Marino `#11406C`, Verde Lima `#96C121`).
- **Tipografía:** Epilogue (Títulos) e Inter (Cuerpo).
- **Estado Global:** React Context API + Apollo Client (`CartContext.tsx`).
- **Despliegue:** Preparado para Vercel o infraestructura en la nube.

### 2. Backend (WordPress + WooCommerce Headless)
- **Servidor:** Google Cloud Platform (VM).
- **Motor Web:** Nginx + PHP 8.5 (Optimizado con Let's Encrypt SSL).
- **Base de Datos:** MySQL.
- **Endpoint API:** `https://api.blok-on.com/graphql`
- **Plugins Clave:** WooCommerce, WPGraphQL, WooGraphQL.
- **Seguridad:** Hardening aplicado y CORS dinámico en `functions.php`.

## 🚀 Funcionalidades Implementadas

### Checkout B2B Personalizado (`CheckoutForm.tsx`)
Formulario de pago adaptado a necesidades corporativas e industriales:
- Captura de información estándar de WooCommerce (Nomenclatura estricta `billing_...`).
- País base configurado por defecto (Nicaragua - `NI`).
- Funcionalidades avanzadas inyectadas vía `meta_data` en los pedidos:
  - Solicitud de Factura (CFDI).
  - RFC y Uso de CFDI con despliegue condicional.
- Selección interactiva de método de pago (Tarjeta vs SPEI/Transferencia).
- Checkbox de Términos y Condiciones con validación estricta en el botón de confirmación.

### Carrito de Compras Global (`CartContext.tsx`)
El proyecto cuenta con un estado global que mantiene la persistencia del carrito mediante la sesión nativa de WooCommerce:
- Mapeo estricto de GraphQL en `lib/graphql/cart.ts` (`GET_CART_QUERY`, `ADD_TO_CART_MUTATION`, etc.).
- Hook global `useCart()` que permite agregar productos, eliminar y modificar cantidades desde cualquier componente visual.
- Manejo de Cookies para preservar la sesión HTTP entre la tienda de Next.js y el servidor en Google Cloud.

### Estructura UI y Páginas
- **Inicio (`app/page.tsx`):** Portada de impacto arquitectónico con Hero Section interactivo, bloques de filosofía corporativa y pre-visualización del catálogo principal.
- **Footer y Globales:** Maquetación premium y corrección estricta de SVG de redes sociales.

### Blog Dinámico (`app/blog`)
Se ha implementado una revista arquitectónica (Blog) integrada totalmente con las publicaciones (`Posts`) de WordPress:
- Renderizado de artículos con la consulta `GET_POSTS_QUERY`.
- Vista de artículo individual (`/blog/[slug]`) utilizando Server Components para un renderizado veloz (SEO amigable).
- Tipografía optimizada mediante clases `prose` (Tailwind Typography).
- Listas blancas configuradas en `next.config.ts` para cargar imágenes desde Unsplash (`images.unsplash.com`) y avatares nativos de WordPress (`secure.gravatar.com`).

## 🛠 Configuración del Backend (WooCommerce & Infraestructura)

La instancia de WooCommerce (`api.blok-on.com`) ha sido configurada vía **WP-CLI** para coincidir exactamente con el frontend:

- **País/Región Base:** Nicaragua (`NI`).
- **Moneda:** Córdobas Nicaragüenses (`NIO`).
- **Posición del Símbolo:** Izquierda con espacio (ej. `C$ 100.00`).
- **Resolución de Errores:** Re-compilación de librerías nativas (`composer install --no-dev`) para recuperar la compatibilidad JWT.

### Seguridad CORS y Nginx (CRÍTICO)
Debido a la estricta seguridad requerida por el carrito de WooCommerce (envío de cabecera `woocommerce-session`), se requiere intervenir a nivel de infraestructura para evitar errores `Preflight OPTIONS` (CORS):
1. **Frontend:** Apollo Client envía `woocommerce-session: Session xxx` únicamente si el carrito posee productos (optimizado para evitar bloqueos innecesarios en el blog).
2. **Backend (Nginx):** Es necesario inyectar la regla CORS directamente en `/etc/nginx/sites-available/api.blok-on.com`:
   ```nginx
   add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, woocommerce-session, X-Requested-With' always;
   ```

## 📦 Ejecución Local

```bash
# 1. Instalar dependencias
npm install

# 2. Correr servidor de desarrollo con Turbopack
npm run dev
```
El portal estará disponible en `http://localhost:3000`.

## 🔒 Próximos Pasos (Roadmap)
- Integración del plugin de **Cardinal Commerce** (3D Secure) proporcionado por el procesador bancario.
- Finalización de las pasarelas de pago al realizar el Checkout final con el Banco.
