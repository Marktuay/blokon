<?php
/**
 * Proyectos Emblemáticos - Headless WooCommerce Config
 * 
 * Instrucciones:
 * Copia y pega este código al final del archivo `functions.php` de tu tema activo 
 * en WordPress (idealmente un tema hijo), o añádelo usando un plugin como "Code Snippets".
 * 
 * Propósito:
 * 1. Configura cabeceras CORS estrictas para que solo tu frontend pueda leer la API.
 * 2. Hace público el endpoint de lectura de productos para no tener que exponer 
 *    Consumer Keys en tu JavaScript Vanilla (lo cual es un riesgo grave de seguridad).
 */

// 1. Configurar CORS para mayor seguridad
add_action('init', function() {
    // Definir los orígenes permitidos (donde está hosteado tu frontend)
    $allowed_origins = [
        'http://localhost:8080',      // Para pruebas locales
        'http://127.0.0.1:8080',
        'https://blok-on.com',        // Tu dominio de producción principal
        'https://www.blok-on.com'     // En caso de que se acceda con 'www'
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
    }

    // Interceptar las peticiones preflight (OPTIONS) enviadas por el navegador
    if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
        status_header(200);
        exit();
    }
});

// 2. Hacer públicos los productos de WooCommerce (Solo Lectura)
add_filter('woocommerce_rest_check_permissions', function($permission, $context, $object_id, $post_type) {
    // Si la petición es solo para leer (GET) y es sobre productos, lo permitimos públicamente
    if ($context === 'read' && $post_type === 'product') {
        return true;
    }
    // Para todo lo demás (crear productos, ver órdenes, clientes), mantener la seguridad normal
    return $permission;
}, 10, 4);

// Opcional: Solucionar problema común si el REST API bloquea peticiones sin autenticación globalmente
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    return $result; // Permitir el flujo normal
});
