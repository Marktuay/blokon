# Memo Arquitectónico: Bot de WhatsApp Blok-On

Este documento preserva todo el contexto, decisiones y arquitectura para la implementación del servicio de Bot de WhatsApp de Blok-On. 
El objetivo de mantener esta carpeta (`whatsapp-service/`) aislada del resto del sitio web (Next.js) es no mezclar entornos de despliegue ni lenguajes, manteniendo una arquitectura limpia.

## 1. El Problema a Resolver
Blok-On necesita una vía de comunicación por WhatsApp donde los clientes puedan ser atendidos 24/7.
Dado que hay un equipo de ~10 asesores de ventas, el bot no debe "estorbar" cuando los asesores estén platicando con un cliente, pero debe intervenir inmediatamente si es fuera de horario, o intervenir después de 5 minutos si los asesores están ocupados.

## 2. La Solución (Arquitectura Final)

Se decidió implementar un ecosistema centralizado en una Máquina Virtual en la nube con la siguiente pila tecnológica:

1. **Número Único:** Se utilizará un (1) solo número telefónico oficial de Blok-On.
2. **Chatwoot (Panel Web Omnicanal):** 
   - Es la cara visible para el equipo de ventas.
   - Permite que los 10 asesores inicien sesión desde su navegador (ej. `chat.blok-on.com`) con usuarios y contraseñas independientes.
   - Elimina la restricción de WhatsApp Web (que solo permite 4 computadoras).
   - Desde aquí los agentes tomarán los chats, dejarán notas y responderán.
3. **Open-WA (WhatsApp Gateway):**
   - Correrá en segundo plano en el servidor.
   - Su función es conectar el número de WhatsApp oficial de la empresa y redirigir todos los mensajes que entran y salen hacia Chatwoot y hacia nuestra Lógica del Bot.
4. **Bot Logic Node.js + Google Gemini (IA):**
   - Un pequeño servidor en Node.js actuará como el "cerebro temporal".
   - Escuchará cada mensaje. Si el horario es laboral, esperará 5 minutos. Si ningún asesor contesta en Chatwoot, usará la API de Google Gemini (Nivel Gratuito) para responder al cliente con información del catálogo de Blok-On.
   - Si un asesor escribe algo en Chatwoot, este proceso en Node.js silencia a Gemini para ese chat.

## 3. Requerimientos de Infraestructura (Google Cloud)

Todo el ecosistema se desplegará utilizando **Docker Compose** en una sola máquina virtual para facilitar su mantenimiento.

- **Proveedor:** Google Cloud Platform (GCP).
- **Máquina Virtual (VM):** `e2-medium` (2 vCPU, 4GB RAM). Costo aprox: ~$25 USD/mes.
- **Disco:** 30 GB SSD.
- **Red:** IP Pública estática, subdominio asignado (ej. `chat.blok-on.com`), y Nginx Proxy Manager (o Traefik) para encriptación SSL (HTTPS).

## 4. Pasos para la Implementación (Siguiente Fase)

Cuando el equipo apruebe este Memo, el flujo de trabajo técnico será:

1. **Infraestructura:** Crear la VM en GCP y apuntar el subdominio en los DNS.
2. **Preparación de Entorno:** Instalar Docker y Nginx en la VM.
3. **Despliegue Chatwoot + Open-WA:** Configurar el archivo `docker-compose.yml` (que vivirá en esta carpeta `whatsapp-service/`) para levantar las plataformas y vincularlas.
4. **Código Lógico (Bot):** Escribir los scripts en Node.js (`index.js` en esta carpeta) que consultarán a la IA de Gemini y evaluarán las reglas de tiempo.
5. **Pruebas:** Vincular el teléfono escaneando el código QR en Open-WA y simular conversaciones como cliente y como agente en Chatwoot.

---
*Nota para el Agente AI: Al retomar este proyecto, lee este archivo para recuperar el 100% del contexto y continuar directamente en el Paso 1 de la Implementación.*
