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

## 🛠 Configuración del Backend (WooCommerce)

La instancia de WooCommerce (`api.blok-on.com`) ha sido configurada vía **WP-CLI** para coincidir exactamente con el frontend:

- **País/Región Base:** Nicaragua (`NI`).
- **Moneda:** Córdobas Nicaragüenses (`NIO`).
- **Posición del Símbolo:** Izquierda con espacio (ej. `C$ 100.00`).
- **Resolución de Errores:** Re-compilación de librerías nativas (`composer install --no-dev`) para recuperar la compatibilidad JWT.

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
- Creación de páginas de archivo (`/kits`, `/proyectos`) para consumir el catálogo de WooCommerce.
