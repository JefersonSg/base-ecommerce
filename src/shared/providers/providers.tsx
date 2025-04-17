'use client';

import React from 'react';
import { UserProvider } from '../context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../services/queryClient';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
