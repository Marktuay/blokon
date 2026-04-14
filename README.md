## 🆕 Cambios recientes (Abril 2026)

- **Tipografía corporativa aplicada según manual de arte:**
  - Títulos principales: Moderniz Regular (`/fonts/Moderniz.otf`).
  - Títulos secundarios: TT Drugs Trl Cnd Bold (`/fonts/TT Drugs Trial Condensed Bold.otf`).
  - Cuerpo de texto: Acumin Variable Concept Family (`/fonts/Acumin-*.otf`).
  - Todas las fuentes integradas vía `@font-face` en `css/styles.css` y asignadas por selectores y variables CSS.
- **Consistencia visual en todas las páginas:**
  - El espacio entre el menú y el título principal de cada vista ahora es uniforme (`padding-top: var(--spacing-16)` en todas las secciones de encabezado).
  - Eliminado el grid asimétrico en headers para apilado vertical de títulos y descripciones.
- **Lógica de acentos en títulos:**
  - Implementado en `js/app.js` un script que elimina acentos en palabras de títulos, primero solo en mayúsculas y luego en todos los títulos, para asegurar compatibilidad visual con la fuente Moderniz.
- **Refactor de estructura HTML:**
  - Unificación de clases y estructura de secciones de encabezado (`.page-header`, `.section-header`, `.about-hero`, etc.) para facilitar el mantenimiento y la consistencia visual.
- **Mejoras de accesibilidad y responsive:**
  - Ajustes en breakpoints y apilado de elementos para móvil y desktop.
  - Espaciados y márgenes revisados para todos los headers y formularios.
- **Actualización de ejemplos y documentación:**
  - Se actualizó este README y los comentarios en los archivos fuente para reflejar la nueva convención tipográfica y visual.

# Proyecto Emblemático: Blokon - E-commerce Headless

Este repositorio contiene el código base frontend para la plataforma de arquitectura, servicios y tienda (cotizaciones) de **Blokon**. El sitio ha sido construido utilizando una arquitectura **Headless**, es decir, desacoplado del backend (WooCommerce/WordPress), comunicándose enteramente a través de peticiones HTTP en un entorno Vanilla JavaScript sumamente rápido y ligero.

---

## 🏗 Arquitectura y Tecnologías

El proyecto se basa intencionalmente en tecnologías en bruto (Vanilla) sin frameworks pesados (como React o Angular), manteniendo la extrema rapidez pero emulando patrones de diseño modernos.

*   **HTML5 Semántico**: Diferenciado por vistas que consumen componentes en común.
*   **CSS3 (Vanilla)**: Utilizando CSS Variables (Custom Properties) para theming, CSS Grid/Flexbox para layouts y estilos de formularios superpuestos (`.form-overlay`).
*   **JavaScript (ES6+)**: 
  *   Uso de **Web Components Custom Elements** (`<site-header>`, `<site-footer>`) para inyección global.
  *   **Delegación de eventos y LocalStorage** para manejo del estado del Carrito y Autenticación.
*   **Integración**: WooCommerce REST API v3 y Contact Form 7 headless vía REST (ver manejo de `_wpcf7_unit_tag` en `app.js`).
*   **Tipografía Corporativa**: Títulos secundarios usan TT Drugs Trl Cnd Bold, cuerpo de texto usa Acumin Variable Concept Family (ver integración en CSS y recomendaciones en README).

---

## 📂 Organización de Archivos Críticos

### 1. Sistema de Componentes y UI (`js/components.js`)
Pilar central de la interfaz visual compartida. Inyecta código en todas las páginas.
- **`<site-header>`**: Contiene el logo de Blokon (imagen), menú principal ampliado (Proyectos, Muro, Kits V, Blog, Nosotros, Contacto), contacto visible (teléfono y correo), comprobación de sesión y **Cajón Lateral (Drawer)** flotante asociado al Carrito de Cotizaciones.
- **`<site-footer>`**: Mega Footer corporativo con enlaces, contacto, portafolio, servicios, cuenta, copyright (verde), y botón global de WhatsApp.

### 2. Gestor de Tienda y Carrito (`js/app.js`)
Motor de interacción con WooCommerce y manejo de productos.
- Contiene la configuración inicial **`WC_CONFIG`** (incluyendo el modo `usarMockLocal`).
- Implementa el objeto **`CartManager`**, que persiste en `localStorage` los productos agregados a la cesta de "Cotización".
- Genera el catálogo inyectando las tarjetas HTML de los productos provenientes de WP REST API en la vista de Listado.

### 3. Sistema MOCK de Autenticación (`js/auth.js`)
> **Atención al Desarrollador/Agente Futuro**: Por motivos de seguridad (XSS/Token Leaking), el sistema actual de inicio de sesión no manda peticiones en bruto a los endpoints de creación de Customer de `/wc/v3` usando Consumer Keys del Frontend. 
- Implementa **`AuthManager`**. Un simulador reactivo tipo SPA que guarda en `localStorage` (`pe_users_db` y `pe_current_session`) bases de datos falsas de clientes permitiendo flujos de *Login, Registro y Edición de Perfiles y Direcciones* interactivos sin riesgo de comprometer keys reales.

### 4. Estilos Centralizados (`css/styles.css`)
- **Paleta de Marca**: Controlada por `:root`.
  - Primario: Azul Corporativo Blokon (`#064c7c`).
  - Secundario: Verde de Acento Activo (`#96c121`).
- **Tipografía**: TT Drugs Trl Cnd Bold para títulos secundarios, Acumin Variable Concept Family para cuerpo de texto. Alternativas temporales: Oswald y Source Sans Pro.
- **Formularios superpuestos**: Usa `.form-overlay` para formularios destacados con sombra y fondo blanco fijo.
- **Campos de formulario**: Todos los inputs y textarea tienen fondo blanco y borde oscuro fijo para máximo contraste.
### 5. Integración Contact Form 7 Headless
- El frontend puede enviar formularios a Contact Form 7 vía REST usando el endpoint `/wp-json/contact-form-7/v1/contact-forms/{ID}/feedback`.
- El campo `_wpcf7_unit_tag` se obtiene dinámicamente del HTML de la página de contacto pública (`/contact-us/`).
- Ver ejemplo en `js/app.js`.

---

## 🗺 Vistas y Flujos de Usuario Implementados

1. **`index.html`, `proyectos.html`, `nosotros.html`**: Páginas de aterrizaje y corporativas.
2. **`producto.html`**: Vista dinámica de inventario.
3. **Flujo de Cotización (`contacto.html`)**: Al tener productos en el **Cajón Lateral** y dar clic en "Solicitar Cotización", este archivo lee el parámetro `?action=quote` y **autocompleta dinámicamente el `textarea`** del formulario con todos los productos que el cliente seleccionó en el `CartManager`.
4. **Flujo Cuentas de Usuario (`login.html` y `mi-cuenta.html`)**:
   - `login.html` aloja el formulario dual de ingreso y registro protegido por XSS.
   - `mi-cuenta.html` es una **Aplicación de Página Única (SPA)** embebida. A través de manipulaciones DOM oculta y muestra pestañas de navegación interna (Historial de Órdenes, Editar Perfil, Actualizar Direcciones) cargando y escribiendo directamente en la base de datos simulada del `AuthManager`.

---

## 🚀 Próximos Pasos & Road to Production

Si este repositorio va a ser pasado a un servidor en vivo conectado al Backend definitivo, **el próximo Agente/Programador debe realizar las siguientes tareas de seguridad y acoplamiento**:

1. **Implementar JWT para WordPress**: Se debe instalar el plugin "JWT Auth" en el servidor WP remoto. Luego, modificar `js/auth.js` deshaciendo la lógica mock e implementando llamadas `fetch()` `POST` al endpoint de token para validar contraseñas de verdad, actualizando la clave `pe_current_session` con un Bearer Token real.
2. **Quitar Mocks en `app.js`**: Remover o apagar el fallback de `mockProducts` y asegurar que los enpoints públicos lean usando variables de entorno o un middleware/backend if keys must be hidden.
3. **Persistir Cotizaciones**: Conectar el action submit del `contacto.html` a un manejador de correos tipo *Mailtrap* o a un Webhook final que procese la cotización enviada por el cliente.

---

## Notas sobre fuentes comerciales

- **TT Drugs Trl Cnd Bold** y **Acumin Variable Concept Family** requieren licencia. Si no tienes acceso, usa Oswald (Google Fonts) y Source Sans Pro como reemplazo temporal en desarrollo.
- Para Acumin Variable Concept Family, puedes integrar Adobe Fonts si tienes suscripción:
  ```html
  <link rel="stylesheet" href="https://use.typekit.net/XXXXXXX.css">
  ```
  Y en CSS:
  ```css
  font-family: 'acumin-variable-concept', Arial, Helvetica, sans-serif;
  ```