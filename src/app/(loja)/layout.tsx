import React from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';
import { BtnZap } from '@/src/components/compartilhado/botoes/btnZap/BtnZap';

import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';
import HeaderContainer from '@/src/components/loja/Header/header-container';
import { typeFirst, typeFirstDashboard } from '@/src/shared/functions/fonts';

import './globalsLoja.css';

export type subcategoriesListByCategory = Record<
  number,
  {
    subcategories: subcategoryInterface[];
  }
>;
export default async function LojaLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${typeFirst.variable} ${typeFirstDashboard.variable}`}>
      <HeaderContainer />
      {children}
      <BtnZap />
      <Footer />
    </body>
  );
}
