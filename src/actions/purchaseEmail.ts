'use server';

import PurchaseEmail from '@/src/email-templates/purshase-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API_KEY);

const sendPurchasedEmail = async (
  name: string,
  id: string,
  cellphone: string
) => {
  await resend.domains.create({ name: `${process.env.DOMAIN_MAIL}` });

  try {
    await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
      to: [`${process.env.EMAIL_MAIN_SITE}`],
      subject: 'Uma nova compra foi registrada',
      react: PurchaseEmail({
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
