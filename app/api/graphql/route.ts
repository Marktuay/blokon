import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('>>> [PROXY] Petición GraphQL recibida');
  
  try {
    const body = await request.json();
    const wooSession = request.headers.get('woocommerce-session');

    // Headers en objeto plano, sin usar la clase Headers para evitar herencias
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Blokon-Proxy/1.0',
    };

    if (wooSession) {
      headers['woocommerce-session'] = wooSession;
    }

    console.log('--- [PROXY] Enviando petición a WordPress...');

    const response = await fetch('https://api.blok-on.com/graphql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      cache: 'no-store', // Forzamos a no usar caché
    });

    console.log(`<<< [PROXY] WP respondió con status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log(`!!! [PROXY] Error de WordPress (Cuerpo): ${errorText.substring(0, 1000)}`);
      return NextResponse.json({ error: 'WP_ERROR', details: errorText }, { status: 500 });
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('!!! [PROXY] Error de GraphQL:', JSON.stringify(data.errors));
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('!!! [PROXY] Error fatal:', error.message || error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message }, 
      { status: 500 }
    );
  }
}
