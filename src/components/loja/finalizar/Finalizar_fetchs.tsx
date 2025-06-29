'use client';

import styles from './FinalizarFetchs.module.css';
import React from 'react';
import { type CartInterface } from '@/src/shared/helpers/interfaces';
import ProdutosFinalizar from './produto/ProdutosFinalizar';
import Image from 'next/image';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

const Finalizarfetchs = ({
  data,
  refetch
}: {
  data?: CartInterface;
  refetch: any;
}) => {
  const [ativo, setAtivo] = React.useState(true);
  return (
    <div className={styles.produtos_checkout}>
      <div className={styles.cabeçalho_produtos}>
        <p className={'subtitle_finalizar'}>Seu carrinho</p>
        <div
          onClick={() => {
            setAtivo(!ativo);
          }}
        >
          <span className={styles.total_produtos}>
            {data?.itemsCart?.length} ITENS
          </span>
          <Image
            alt="Imagem de seta"
            src={'/pagamento/seta.svg'}
            width={22}
            height={12}
            unoptimized
          />
        </div>
      </div>
      <div className={` ${styles.wrapper_table} ${ativo ? styles.ativo : ''}`}>
        <table className={`${styles.table_body}`}>
          <thead>
            <tr>
              <th className={styles.product}>
                <p>Produtos</p>
              </th>
              <th className={styles.information}>
                <p>informacoes</p>
              </th>
              <th className={styles.product_price}>
                <p>Preço</p>
              </th>
              <th className={styles.quantity}>
                <p>Quantidade</p>
              </th>
              <th className={styles.quantity_price}>
                <p>Total</p>
              </th>
              <th className={styles.item_remove}></th>
            </tr>
          </thead>
          <tbody className={styles.corpo_tabela}>
            {data?.itemsCart?.map((item, index) => (
              <ProdutosFinalizar
                key={item._id}
                amount={item.amount}
                color={item.color}
                size={item.size}
                total={data?.prices[index]}
                productId={item.productId}
                ItemCartId={item._id}
                refetchData={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.subtotal}>
        Subtotal{' '}
        <span>
          R$ {convertNumberInReal(data?.totalValue ? data?.totalValue : 0)}
        </span>
      </p>
    </div>
  );
};

export default Finalizarfetchs;
