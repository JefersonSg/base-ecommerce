import React from 'react';
import { Footer } from '@/src/components/Footer/Footer';
import { BtnZap } from '@/src/components/botoes/btnZap/BtnZap';

import HeaderContainer from '@/src/components/Header/HeaderContainer';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeaderContainer />
        {children}
        <BtnZap />
        <Footer />
      </body>
    </html>
  );
}
