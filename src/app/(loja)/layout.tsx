import React from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';
import { BtnZap } from '@/src/components/compartilhado/botoes/btnZap/BtnZap';

import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';
import HeaderContainer from '@/src/components/loja/Header/header-container';
import './globalsLoja.css';
import { GoogleTagManager } from '@next/third-parties/google';

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
    <>
      <GoogleTagManager gtmId="G-NYKP51D935" />
      <HeaderContainer />
      {children}
      <BtnZap />
      <Footer />
    </>
  );
}
