'use client';

import React from 'react';
import { useUserContext } from '@/src/shared/context';

const BotaoSair = () => {
  const { logout } = useUserContext();

  return (
    <li>
      <button
        style={{ minWidth: '60px', height: '40px' }}
        onClick={() => {
          void logout();
        }}
      >
        Sair
      </button>
    </li>
  );
};

export default BotaoSair;
