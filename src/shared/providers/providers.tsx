'use client';

import React from 'react';
import { UserProvider } from '../context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../services/queryClient';
import { AvaliacoesProvider } from '../context/AvaliacaoContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AvaliacoesProvider>
        <UserProvider>{children}</UserProvider>
      </AvaliacoesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
