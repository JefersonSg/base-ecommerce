import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface VercelInviteUserEmailProps {
  id: string;
  name?: string;
  cellphone: string;
}

export const PurchaseEmail = ({
  name = '',
  id = '',
  cellphone = ''
}: VercelInviteUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{'Olá uma nova compra foi registrada em seu site'}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Nome do cliente: {name}</strong>
              <br />
              <strong>id do pedido: {id}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Numero de contato: {cellphone}</strong>
            </Text>
            <Section>
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`https://wa.me/55${cellphone
                  .replace?.('(', '')
                  ?.replace(')', '')
                  ?.replace('-', '')
                  .replace(' ', '')}`}
              >
                Chamar cliente no WhatsApp
              </Button>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PurchaseEmail;
