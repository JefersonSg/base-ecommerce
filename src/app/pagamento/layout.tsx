import React, { Suspense } from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';
import { BtnZap } from '@/src/components/compartilhado/botoes/btnZap/BtnZap';

import './globalsLoja.css';
import AddViewFunc from '@/src/components/compartilhado/AddViewFunc';
import HeaderPagamento from './Header_pagamento';

export default async function LojaLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <AddViewFunc />
      </Suspense>
      <HeaderPagamento />
      {children}
      <BtnZap />
      <Footer />
    </>
  );
}
