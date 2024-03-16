import React from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';
import { BtnZap } from '@/src/components/compartilhado/botoes/btnZap/BtnZap';

import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';
import HeaderContainer from '@/src/components/loja/Header/header-container';

export type subcategoriesListByCategory = Record<
  number,
  {
    subcategories: subcategoryInterface[];
  }
>;
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderContainer />
      {children}
      <BtnZap />
      <Footer />
    </>
  );
}
