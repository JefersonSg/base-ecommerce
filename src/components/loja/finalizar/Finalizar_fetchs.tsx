'use client';

import styles from './Produto.module.css';
import React from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { getAllItemsCartByUserId, getUserByToken } from '@/src/shared/api/GETS';
import {
  type CartInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import ProdutosFinalizar from './ProdutosFinalizar';

const Finalizarfetchs = () => {
  const token = Cookies.get('auth_token');
  const userData = useQuery<UserInterface>({
    queryKey: ['user'],
    queryFn: async () => {
      return (await getUserByToken(token)) as UserInterface;
    }
  });

  const { data } = useQuery<CartInterface>({
    queryKey: ['shopping-cart', userData?.data?.user?._id],
    queryFn: async () => {
      if (userData?.data?.user?._id) {
        return await getAllItemsCartByUserId(userData?.data?.user?._id);
      }
      return [];
    }
  });

  return (
    <div className={styles.produtos_checkout}>
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
        <tbody>
          {data?.itemsCart?.map((item, index) => (
            <ProdutosFinalizar
              key={item._id}
              amount={item.amount}
              color={item.color}
              size={item.size}
              total={data?.prices[index]}
              productId={item.productId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Finalizarfetchs;
