# Blokon Copilot Workspace Instructions

## Propósito
Estas instrucciones guían a agentes de IA y desarrolladores sobre cómo contribuir, depurar y mantener el frontend headless de Blokon, asegurando coherencia y seguridad en el flujo de trabajo.

---

## Arquitectura y Convenciones
- **Frontend desacoplado**: Todo el frontend es Vanilla JS, HTML5 y CSS3, sin frameworks pesados.
- **Componentes reutilizables**: Usa Web Components (`<site-header>`, `<site-footer>`) definidos en `js/components.js`.
- **Gestión de estado**: Carrito y autenticación simulados con `localStorage` (`CartManager`, `AuthManager`).
- **Integración WooCommerce**: Comunicación vía REST API, nunca expongas claves en el frontend. Usa el snippet PHP (`wordpress-cors-config.php`) para exponer endpoints públicos de solo lectura.
- **Estilos**: Centralizados en `css/styles.css` usando variables CSS para la paleta de marca.

---

## Flujos y Archivos Clave
- **Catálogo y carrito**: `js/app.js` y `js/components.js` gestionan productos y UI del carrito.
- **Autenticación**: `js/auth.js` es un mock seguro; para producción, implementa JWT y elimina mocks.
- **Vistas**: Cada archivo HTML representa una vista. `mi-cuenta.html` es SPA embebida.
- **Cotización**: `contacto.html` lee el carrito y autocompleta el formulario.

---

## Pruebas y Desarrollo
- No hay comandos de build/test automáticos; basta con abrir los HTML en navegador local.
- Para integración real, sigue los pasos de "Próximos Pasos" en el README.
- Usa el snippet PHP para CORS y seguridad en WordPress.

---

## Pitfalls y Reglas
- **Nunca** expongas Consumer Keys en JS.
- No uses frameworks ni dependencias externas sin justificación.
- Mantén la semántica HTML y la accesibilidad.
- Si migras a producción, elimina mocks y conecta endpoints reales.

---

## Documentación y Recursos
- [README.md](README.md): Arquitectura, organización y pasos de producción.
- [wordpress-cors-config.php](wordpress-cors-config.php): Snippet para exponer endpoints seguros.

---

## Ejemplos de Prompts
- "¿Cómo agrego un nuevo componente UI reutilizable?"
- "¿Cómo conecto el login a JWT real?"
- "¿Qué archivos debo modificar para cambiar la paleta de colores?"

---

## Siguientes Customizaciones Sugeridas
- Instrucciones específicas para migración a producción (aplicar solo a `js/auth.js` y `js/app.js`).
- Hooks para validación de accesibilidad en HTML.
- Agente especializado en integración WooCommerce segura.
