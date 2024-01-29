'use client';

import React from 'react';
import { UserProvider } from '../context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
