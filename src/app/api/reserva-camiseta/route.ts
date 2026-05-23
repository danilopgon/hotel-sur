import { reservaCamisetaSchema } from '@/lib/schemas/reserva-camiseta';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    return NextResponse.json(
      { error: 'Configuración del servidor incompleta' },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = reservaCamisetaSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos' },
      { status: 400 },
    );
  }

  const payload = {
    ...parsed.data,
    estado: 'pendiente',
    id: crypto.randomUUID(),
    creado: new Date().toISOString(),
    origen: 'web-hotel-sur',
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hotel-sur-secret': webhookSecret,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { error: 'No se pudo registrar la reserva' },
        { status: 502 },
      );
    }

    const n8nResponse = await res.json().catch(() => null);

    return NextResponse.json({
      message:
        n8nResponse?.message ?? 'Reserva enviada correctamente',
      id: n8nResponse?.id ?? payload.id,
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error('reserva-camiseta webhook error:', err);

    return NextResponse.json(
      { error: 'Error al contactar con el servicio de reservas' },
      { status: 500 },
    );
  }
}
