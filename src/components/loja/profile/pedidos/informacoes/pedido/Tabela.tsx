import React from 'react';
import styles from './Tabela.module.css';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import ProdutoInfos from './ProdutoInfos';

const Tabela = ({ data }: { data: OrderInterface }) => {
  return (
    <div className={styles.tabela}>
      <p className={styles.texto}>Detalhes do pedido </p>
      <table>
        <thead className={styles.cabeçalho}>
          <tr>
            <th className={styles.produto}>PRODUTOS</th>
            <th className={styles.preco}>PREÇO</th>
            <th className={styles.quantidade}>QUANTIDADE</th>
            <th className={styles.total}>TOTAL</th>
          </tr>
        </thead>

        <tbody>
          {data?.productIds?.map((productId, index) => {
            return (
              <ProdutoInfos
                key={productId}
                productId={productId}
                corEscolhida={data?.productColors[index]}
                valorPago={data?.valueProducts?.[index]}
                quantidade={data?.productAmounts?.[index]}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tabela;
