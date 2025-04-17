'use server';

import PurchaseEmail from '../email-templates/purshase-email';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API_KEY);

const sendEmail = async () => {
  try {
    await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
      to: ['jefersongabri@gmail.com'],
      subject: 'Bem vindo ao novo teste',
      react: PurchaseEmail({
        name: 'Jeferson',
        cellphone: '5522981193154',
        id: '154781sds114522'
      })
    });

    return true;
  } catch (error) {
    return NextResponse.json({
      error
    });
  }
};

export default sendEmail;
