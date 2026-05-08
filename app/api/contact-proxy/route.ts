import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formId, formData } = body;

    if (!formId || !formData) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    // 1. Cabeceras de seguridad para WordPress
    const wpHeaders = new Headers();
    wpHeaders.append('User-Agent', 'Blokon-Contact-Proxy/1.1');
    // No pasamos cookies ni sesiones del cliente por seguridad en este paso

    // Convertimos el JSON de entrada al formato que espera Contact Form 7 (multipart/form-data o urlencoded)
    const wpFormData = new FormData();
    for (const key in formData) {
      wpFormData.append(key, formData[key]);
    }

    const response = await fetch(
      `https://api.blok-on.com/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
      {
        method: 'POST',
        headers: wpHeaders,
        body: wpFormData,
        cache: 'no-store',
      }
    );

    const result = await response.json();

    // 2. Respuesta limpia
    return NextResponse.json(result, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    });
  } catch (error: any) {
    console.error('[CONTACT-PROXY ERROR]:', error.message);
    return NextResponse.json(
      { error: 'Error al procesar el envío' },
      { status: 500 }
    );
  }
}

export async function GET() { return new Response('Not Allowed', { status: 405 }); }
