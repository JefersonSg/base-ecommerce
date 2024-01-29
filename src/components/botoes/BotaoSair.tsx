'use client';

import React from 'react';
import { useUserContext } from '@/src/shared/context';

const BotaoSair = () => {
  const { logout } = useUserContext();

  return <button onClick={logout}>Sair</button>;
};

export default BotaoSair;
