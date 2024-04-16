'use client';

import styles from './FinalizarFetchs.module.css';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllItemsCartByUserId } from '@/src/shared/api/GETS';
import {
  type CartInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import ProdutosFinalizar from './produto/ProdutosFinalizar';

const Finalizarfetchs = ({ userData }: { userData: UserInterface }) => {
  const { data, refetch } = useQuery<CartInterface>({
    queryKey: ['shopping-cart', userData?.user?._id],
    queryFn: async () => {
      if (userData?.user?._id) {
        return await getAllItemsCartByUserId(userData?.user?._id);
      }
      return [];
    }
  });

  return (
    <div className={styles.produtos_checkout}>
      <p className={styles.titulo_table}>Resumo do pedido</p>
      <table>
        <thead>
          <tr>
            <th className="product">Produto</th>
            <th className="product-price">Preço</th>
            <th className="quantity">Quantidade</th>
            <th className="quantity-price">Total</th>
            <th className="item-remove"></th>
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
  );
};

export default Finalizarfetchs;
