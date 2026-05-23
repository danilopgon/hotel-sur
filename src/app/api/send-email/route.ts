import { contactoSchema } from '@/lib/schemas/contacto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = contactoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message, subject } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"Formulario Web Hotel Sur" <${process.env.EMAIL_USER}>`,
      to: 'somoshotelsur@gmail.com',
      replyTo: email,
      subject: `Contacto desde la web: ${subject}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        
        Mensaje:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nuevo mensaje desde la web de Hotel Sur</h2>
          <hr style="border: 1px solid #eee;">
          
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Mensaje:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <hr style="border: 1px solid #eee; margin-top: 30px;">
          <p style="color: #777; font-size: 12px;">Este mensaje fue enviado desde el formulario de contacto de Hotel Sur.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Correo enviado correctamente' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error al enviar el correo:', error);

    const err = error as { code?: string };

    if (err.code === 'EAUTH') {
      return NextResponse.json(
        { error: 'Error de autenticación con el servidor de correo' },
        { status: 500 }
      );
    } else if (err.code === 'ECONNECTION') {
      return NextResponse.json(
        { error: 'No se pudo conectar con el servidor de correo' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Error al enviar el correo' },
      { status: 500 }
    );
  }
}
