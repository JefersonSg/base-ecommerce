'use client';
import { getAllItemsCartByUserId, getUserByToken } from '@/src/shared/api/GETS';
import {
  type CartInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Cookies from 'js-cookie';
import styles from './Total.module.css';

const TotalFinal = ({
  priceDelivery,
  cepRefetch
}: {
  priceDelivery: number;
  cepRefetch: string;
}) => {
  const token = Cookies.get('auth_token');
  const userData = useQuery<UserInterface>({
    queryKey: ['user'],
    queryFn: async () => {
      return (await getUserByToken(token)) as UserInterface;
    }
  });
  const [valorTotal, setValorTotal] = React.useState<string>();

  const { data } = useQuery<CartInterface>({
    queryKey: ['shopping-cart', userData?.data?.user?._id, cepRefetch],
    queryFn: async () => {
      if (userData?.data?.user?._id) {
        return await getAllItemsCartByUserId(userData?.data?.user?._id);
      }
      return [];
    }
  });

  React.useEffect(() => {
    async function setValorCategory() {
      if (data?.totalValue) {
        const totalValor = priceDelivery
          ? +data.totalValue + priceDelivery
          : +data.totalValue;

        const formatoNumero = new Intl.NumberFormat('pt-BR');
        const numeroFormatado = formatoNumero.format(totalValor);

        setValorTotal(numeroFormatado);
      }
    }
    void setValorCategory();
  }, [data, priceDelivery]);
  return (
    <div className={styles.total_container}>
      <p>Total:</p>{' '}
      <p>
        {' '}
        R${' '}
        {valorTotal?.split(',')?.[0]
          ? valorTotal?.split(',')?.[0] + ','
          : '0,'}{' '}
        {valorTotal?.split(',')?.[1]
          ? valorTotal?.split(',')?.[1].length > 1
            ? valorTotal?.split(',')?.[1]
            : valorTotal?.split(',')?.[1] + '0'
          : '00'}
      </p>
    </div>
  );
};

export default TotalFinal;
