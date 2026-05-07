# Resumen Ejecutivo: Proyecto Blok-On (Headless E-commerce)

Blok-On es una plataforma de e-commerce de alto rendimiento orientada a soluciones estructurales y kits de vivienda, construida bajo una arquitectura **Headless** de última generación.

## 🏗️ 1. Arquitectura del Sistema
El proyecto separa totalmente la interfaz de usuario del motor de datos para maximizar la velocidad y seguridad.

- **Frontend (Next.js 15+):** Una aplicación React moderna que ofrece navegación instantánea y SEO optimizado.
- **Backend (WordPress + WooCommerce):** Utilizado exclusivamente como gestor de contenidos (CMS) y motor de ventas, accesible vía **GraphQL API**.
- **Comunicación:** Todo el intercambio de información ocurre mediante consultas precisas de Apollo Client, evitando sobrecarga de datos.

## 💻 2. Stack Tecnológico
- **Core:** Next.js (App Router), TypeScript, Tailwind CSS.
- **API:** GraphQL (WPGraphQL), Apollo Client.
- **Infraestructura:** Google Cloud Platform (VM), Nginx, PHP 8.5.
- **Diseño:** Sistema de diseño industrial premium (Paleta: `#11406C`, `#96C121`).

## ✨ 3. Funcionalidades Clave Implementadas

### 🛒 Carrito de Compras Global
- Persistencia de sesión mediante cabeceras dinámicas (`woocommerce-session`).
- Sincronización en tiempo real entre la tienda y el servidor de WooCommerce.
- Manejo de cookies seguro para entornos cross-domain.

### 📝 Blog dinámico Headless
- Listado y lectura de artículos cargados directamente desde la API.
- Renderizado por el servidor (Server Components) para un posicionamiento en buscadores (SEO) superior.
- Optimización automática de imágenes externas (Unsplash, Gravatar).

### 🏦 Checkout B2B Personalizado
- Formulario de pago adaptado al mercado nicaragüense (NIO / Nicaragua).
- Campos especializados para facturación corporativa (CFDI/RFC).
- Integración preparada para pasarelas de pago bancarias y transferencia SPEI.

## 🛡️ 4. Soluciones Técnicas Destacadas
- **Resolución de CORS:** Configuración avanzada de Nginx y PHP para permitir el flujo de datos seguro entre distintos dominios (`localhost` -> `api.blok-on.com`).
- **Seguridad (Hardening):** Aislamiento del backend y ocultamiento de endpoints sensibles.
- **Rendimiento:** Implementación de Turbopack y optimización de imágenes para tiempos de carga menores a 1 segundo.

## 🎨 5. Identidad Visual
El proyecto utiliza un lenguaje visual que proyecta **solidez, ingeniería y eficiencia**:
- **Epilogue:** Tipografía para títulos que evoca estructuras arquitectónicas.
- **Inter:** Tipografía para cuerpo de texto que asegura legibilidad técnica.
- **Micro-animaciones:** Efectos de zoom y transiciones suaves en catálogos y artículos.

---

## 🔒 Estado Actual y Próximos Pasos
- [x] Arquitectura base y comunicación GraphQL lista.
- [x] Carrito de compras funcional.
- [x] Blog dinámico completado.
- [ ] Integración final de Cardinal Commerce (3D Secure).
- [ ] Desarrollo de la galería de proyectos arquitectónicos.
- [ ] Lanzamiento a producción (Go-Live).
