import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const wooSession = request.headers.get('woocommerce-session');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Blokon-Proxy/1.0',
    };

    if (wooSession) {
      headers['woocommerce-session'] = wooSession;
    }

    const response = await fetch('https://api.blok-on.com/graphql', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[PROXY ERROR] WP Status ${response.status}: ${errorText.substring(0, 500)}`);
      return NextResponse.json({ error: 'WP_ERROR' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[PROXY FATAL ERROR]:', error.message || error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
