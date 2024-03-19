'use client';

import React from 'react';
import { useUserContext } from '@/src/shared/context';

const BotaoSair = () => {
  const { logout } = useUserContext();

  return (
    <button style={{ minWidth: '60px', height: '40px' }} onClick={logout}>
      Sair
    </button>
  );
};

export default BotaoSair;
