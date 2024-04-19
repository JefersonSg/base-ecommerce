'use server';

import WelcomeEmail from '@/src/email-templates/welcome-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API_KEY);

const sendPurchasedEmail = async (
  name: string,
  id: string,
  cellphone: string
) => {
  try {
    await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
      to: [`${process.env.EMAIL_MAIN_SITE}`],
      subject: 'Uma nova compra foi registrada',
      react: WelcomeEmail({
        name,
        id,
        cellphone
      })
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendPurchasedEmail;
