import React from 'react';
import styles from './styles.module.css';
import BotaoSair from '@/src/components/compartilhado/botoes/BotaoSair';
import ProfileContainer from '@/src/components/loja/profile/Profile_container';
import { getUserByToken } from '@/src/shared/api/GETS';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import { cookies } from 'next/headers';

const page = async () => {
  const token = cookies().get('auth_token')?.value;
  const user = (await getUserByToken(token)) as UserInterface;

  return (
    <main className={styles.minha_conta_container}>
      <ProfileContainer userData={user} />
      <BotaoSair />
    </main>
  );
};

export default page;
