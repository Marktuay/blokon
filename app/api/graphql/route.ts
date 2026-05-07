import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('>>> [PROXY] Petición GraphQL recibida');
  const body = await request.json();
  // Limpieza estricta de headers para evitar "invalid connection header" en Node.js/Undici
  const headersToSend = new Headers();
  headersToSend.set('Content-Type', 'application/json');
  
  // Reenviamos la sesión de WooCommerce si existe
  const wooSession = request.headers.get('woocommerce-session');
  if (wooSession) {
    headersToSend.set('woocommerce-session', wooSession);
  }

  try {
    const response = await fetch('https://api.blok-on.com/graphql', {
      method: 'POST',
      headers: headersToSend,
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
