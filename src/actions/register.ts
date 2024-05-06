'use server';

import RegisterEmail from '@/src/email-templates/Register-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API_KEY);

const sendRegisterEmail = async (name: string, email: string) => {
  await resend.domains.create({ name: `${process.env.DOMAIN_MAIL}` });

  try {
    await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
      to: [`${process.env.EMAIL_MAIN_SITE}`],
      subject: 'Uma nova pessoa foi registrada no site',
      react: RegisterEmail({
        name,
        email
      })
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendRegisterEmail;
