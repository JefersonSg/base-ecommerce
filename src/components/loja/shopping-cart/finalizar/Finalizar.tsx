import React from 'react';
import styles from './Finalizar.module.css';
import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';

const Finalizar = () => {
  return (
    <div className={styles.finalizar_pedido}>
      <p>
        Custo dos produtos
        <span>R$ 157,58</span>
      </p>
      <p>
        Entrega
        <span>R$ 10,00</span>
      </p>
      <p>
        Valor do desconto
        <span>R$ 0,00</span>
      </p>
      <p className={styles.valor_final}>
        o valor total do pedido
        <span>R$ 167,58</span>
      </p>
      <div className={styles.botao}>
        <BotaoColorido texto="FINALIZAR PEDIDO" />
      </div>
    </div>
  );
};

export default Finalizar;
