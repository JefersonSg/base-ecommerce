'use client';

import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { Titulo } from '../../compartilhado/textos/Titulo';
import ProdutoCarrinho from './produto/ProdutoCarrinho';

import styles from './container_cart.module.css';
import EntregaCarrinho from './entrega/EntregaCarrinho';
import Finalizar from './finalizar/Finalizar';
import { useQuery } from '@tanstack/react-query';
import { getAllItemsCartByUserId, getUserByToken } from '@/src/shared/api/GETS';
import {
  type CartInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

const ContainerCart = () => {
  const pathname = usePathname();
  const token = Cookies.get('auth_token');
  const userData = useQuery<UserInterface>({
    queryKey: ['user'],
    queryFn: async () => {
      return (await getUserByToken(token)) as UserInterface;
    }
  });

  const { data, refetch } = useQuery<CartInterface>({
    queryKey: ['shopping-cart', userData?.data?.user?._id],
    queryFn: async () => {
      if (userData?.data?.user?._id) {
        return await getAllItemsCartByUserId(userData?.data?.user?._id);
      }
      return [];
    }
  });
  React.useEffect(() => {
    async function handleChangeRoute() {
      await refetch();
    }

    void handleChangeRoute();
  }, [pathname, refetch]);

  return (
    <div>
      <div className={styles.area_textos_container}>
        <div className={styles.area_textos}>
          <Breadcrumb texto1="Carrinho" />
          <Titulo titulo="Carrinho" />
          <p className={`${styles.texto_indicativo} texto_indicativo`}>
            Você tem {data?.itemsCart?.length ?? 0} itens no seu carrinho
          </p>
        </div>
      </div>
      <div className={styles.produtos}>
        {data?.itemsCart?.map((itemCart, index) => {
          return (
            <ProdutoCarrinho
              refetchData={refetch}
              ItemCartId={itemCart._id}
              amount={itemCart.amount}
              key={itemCart?._id}
              productId={itemCart?.productId}
              color={itemCart?.color}
              size={itemCart?.size}
              total={data?.prices[index]}
            />
          );
        })}
      </div>
      {data?.itemsCart && (
        <div className={styles.entregas}>
          <EntregaCarrinho />
        </div>
      )}

      {data?.itemsCart && (
        <div className={styles.finalizar_container}>
          <Finalizar valorProdutos={data.totalValue} />
        </div>
      )}
    </div>
  );
};

export default ContainerCart;
