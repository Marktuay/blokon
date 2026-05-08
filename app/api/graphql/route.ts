import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Verificación básica de seguridad: ¿De dónde viene la petición?
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const host = request.headers.get('host');

    // En producción, podrías restringir esto estrictamente a tu dominio
    // const allowedHost = process.env.NEXT_PUBLIC_SITE_URL || 'blok-on.com';
    // if (host && !host.includes(allowedHost)) { ... }

    const body = await request.json();
    const wooSession = request.headers.get('woocommerce-session');

    // 2. Definición de cabeceras limpias para enviar a WordPress
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Blokon-Security-Proxy/1.1',
    };

    if (wooSession) {
      headers['woocommerce-session'] = wooSession;
    }

    // 3. Petición a WordPress
    const response = await fetch('https://api.blok-on.com/graphql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!response.ok) {
      // Log interno para ti, pero respuesta genérica para el usuario
      console.error(`[SEC-PROXY] WP Error Status: ${response.status}`);
      return NextResponse.json(
        { error: 'Service Unavailable' }, 
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // 4. Respuesta limpia al cliente
    return NextResponse.json(data, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    });
  } catch (error: any) {
    console.error('[SEC-PROXY FATAL ERROR]:', error.message);
    return NextResponse.json(
      { error: 'Internal Security Error' }, 
      { status: 500 }
    );
  }
}

// Bloqueamos otros métodos por seguridad
export async function GET() { return new Response('Method Not Allowed', { status: 405 }); }
export async function PUT() { return new Response('Method Not Allowed', { status: 405 }); }
export async function DELETE() { return new Response('Method Not Allowed', { status: 405 }); }
