'use client';
import React from 'react';
import EntregaFinalizar from './entrega/EntregaFinalizar';
import Finalizarfetchs from './Finalizar_fetchs';
import Envio from './envio/Envio';
import TotalFinal from './total/Total';
import Pagamento from './pagamento/Pagamento';
import BotaoColorido from '../../compartilhado/botoes/BotaoColorido';
import styles from './FinalizarFetchs.module.css';

const FinalizarContainer = () => {
  const [selectPayment, setSelectPayment] = React.useState('card');
  return (
    <div>
      <EntregaFinalizar />
      <Finalizarfetchs />
      <Envio />
      <TotalFinal />
      <Pagamento
        selectPayment={selectPayment}
        setSelectPayment={setSelectPayment}
      />
      <div className={styles.botao_comprar}>
        <BotaoColorido texto="Comprar" />
      </div>
    </div>
  );
};

export default FinalizarContainer;
