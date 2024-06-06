import React, { Suspense } from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';
import { BtnZap } from '@/src/components/compartilhado/botoes/btnZap/BtnZap';

import './globalsLoja.css';
import HeaderFetchs from '@/src/components/loja/Header/HeaderFetchs';
import AddViewFunc from '@/src/components/compartilhado/AddViewFunc';

export default async function LojaLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderFetchs />
      {children}
      <BtnZap />
      <Suspense>
        <AddViewFunc />
      </Suspense>
      <Footer />
    </>
  );
}
