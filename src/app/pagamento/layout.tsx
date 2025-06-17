import React from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';
import { BtnZap } from '@/src/components/compartilhado/botoes/btnZap/BtnZap';

import './globalsPagamento.css';
import HeaderPagamento from './Header_pagamento';

export default async function PaymentLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={'container_payment'}>
        <HeaderPagamento />
        {children}
        <BtnZap />
        <Footer />
      </div>
    </>
  );
}
