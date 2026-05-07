import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const formData = await request.formData();
  
  try {
    const response = await fetch(`https://api.blok-on.com/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Contact Proxy:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
