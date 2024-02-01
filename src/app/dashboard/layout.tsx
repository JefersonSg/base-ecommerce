import React from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';

import HeaderContainer from '@/src/components/dashboard/Header/HeaderContainer';
import './globalsDashboard.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderContainer />
      {children}
      <Footer />
    </>
  );
}
