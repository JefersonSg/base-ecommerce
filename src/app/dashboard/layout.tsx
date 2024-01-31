import React from 'react';
import { Inter } from 'next/font/google';

import Providers from '@/src/shared/providers/providers';
import HeaderContainer from '@/src/components/dashboard/Header/HeaderContainer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <HeaderContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
