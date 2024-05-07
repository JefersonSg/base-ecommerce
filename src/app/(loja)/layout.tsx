import React from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';
import { BtnZap } from '@/src/components/compartilhado/botoes/btnZap/BtnZap';

import HeaderContainer from '@/src/components/loja/Header/header-fetchs';
import './globalsLoja.css';
import { GoogleTagManager } from '@next/third-parties/google';

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
