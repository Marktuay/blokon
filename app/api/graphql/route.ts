import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const requestHeaders = new Headers(request.headers);
  
  // Limpiamos headers que puedan causar conflicto
  requestHeaders.delete('host');
  requestHeaders.delete('origin');
  requestHeaders.delete('referer');

  try {
    const response = await fetch('https://api.blok-on.com/graphql', {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const responseHeaders = new Headers();
    
    // Reenviamos el token de sesión de WooCommerce si WordPress lo envía
    const wooSession = response.headers.get('woocommerce-session');
    if (wooSession) {
      responseHeaders.set('woocommerce-session', wooSession);
    }
    
    return NextResponse.json(data, {
      headers: responseHeaders
    });
  } catch (error) {
    console.error('Error in GraphQL Proxy:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// También manejamos OPTIONS para evitar problemas de pre-vuelo locales si se dieran
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
