import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface VercelInviteUserEmailProps {
  email: string;
  name?: string;
}

export const RegisterEmail = ({
  name = '',
  email = ''
}: VercelInviteUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{'Um novo usuário fez registro no site'}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>Nome do cliente: {name}</strong>
              <br />
              <strong>email: {email}</strong>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RegisterEmail;
