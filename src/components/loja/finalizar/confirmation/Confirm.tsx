import React from 'react';
import styles from './confirm.module.css';
import ConfirmLottie from '@/src/components/lottie/Confirm';

const Confirm = () => {
  return (
    <div className={styles.confirm_container}>
      <ConfirmLottie />
      <h1>Pedido concluido!</h1>
      <p>O pagamento sera concluido pelo Mercado Pago</p>
    </div>
  );
};

export default Confirm;
