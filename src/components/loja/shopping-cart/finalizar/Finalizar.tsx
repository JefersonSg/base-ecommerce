import React from 'react';
import styles from './Finalizar.module.css';
import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Link from 'next/link';

const Finalizar = ({ valorProdutos }: { valorProdutos: number }) => {
  return (
    <div className={styles.finalizar_pedido}>
      <p>
        Custo dos produtos
        <span>R$ {valorProdutos?.toFixed(2)?.replace('.', ',') ?? '0,00'}</span>
      </p>

      <p>
        Valor do desconto
        <span>R$ 0,00</span>
      </p>

      <p className={styles.valor_final}>
        o valor total do pedido
        <span>R$ {valorProdutos?.toFixed(2)?.replace('.', ',') ?? '0,00'}</span>
      </p>
      <Link href={'/carrinho/finalizar'} className={styles.botao}>
        <BotaoColorido texto="FINALIZAR PEDIDO" />
      </Link>
    </div>
  );
};

export default Finalizar;
