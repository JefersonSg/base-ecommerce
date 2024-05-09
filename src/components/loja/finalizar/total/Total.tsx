'use client';
import { getAllItemsCartByUserId, getUserByToken } from '@/src/shared/api/GETS';
import {
  type cuponsInterface,
  type CartInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Cookies from 'js-cookie';
import styles from './Total.module.css';
import { redeemCoupon } from '@/src/shared/api/POST';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

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
  const [cupom, setCupom] = React.useState('');
  const [cupomResponse, setCupomResponse] = React.useState<{
    cupom: cuponsInterface;
  }>();

  const { data } = useQuery<CartInterface>({
    queryKey: ['shopping-cart', userData?.data?.user?._id, cepRefetch],
    queryFn: async () => {
      if (userData?.data?.user?._id) {
        return await getAllItemsCartByUserId(userData?.data?.user?._id);
      }
      return [];
    }
  });

  const redeemCode = React.useCallback(async () => {
    if (cupom && valorTotal) {
      const response = await redeemCoupon(cupom, +valorTotal);

      if (response) {
        setCupomResponse(response);
      }
    }
  }, [cupom, valorTotal]);

  React.useEffect(() => {
    const cupomUsed = window.localStorage.getItem('cupom');

    if (cupomUsed && valorTotal) {
      setCupom(cupomUsed);
      void redeemCode();
    }
  }, [redeemCode, valorTotal]);

  console.log(valorTotal);

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
      <div style={{ textAlign: 'end' }}>
        {cupomResponse?.cupom?._id && (
          <p style={{ fontSize: '11px' }}>cupom aplicado </p>
        )}
        {cupomResponse?.cupom?._id && valorTotal
          ? cupomResponse?.cupom?.percentageDiscount
            ? '-R$ ' +
              +valorTotal.replace(',', '.') *
                (cupomResponse?.cupom?.percentageDiscount / 100)
            : cupomResponse?.cupom?.valueFixDiscount
              ? '-R$ ' + cupomResponse?.cupom?.valueFixDiscount
              : 'R$ 0,00'
          : ''}
        <p
          className={`${
            cupomResponse?.cupom?._id ? styles.valor_desconto : ''
          }`}
        >
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
        {cupomResponse?.cupom._id && valorTotal && (
          <p style={{ textAlign: 'end' }}>
            R${' '}
            {cupomResponse?.cupom?.percentageDiscount
              ? convertNumberInReal(
                  (+valorTotal?.replace(',', '.') -
                  cupomResponse?.cupom?.percentageDiscount
                    ? -valorTotal.replace(',', '.') *
                      (cupomResponse?.cupom?.percentageDiscount / 100)
                    : 0) + +valorTotal?.replace(',', '.')
                )
              : ''}
            {cupomResponse?.cupom?.valueFixDiscount
              ? convertNumberInReal(
                  +valorTotal?.replace(',', '.') -
                    cupomResponse?.cupom?.valueFixDiscount
                    ? -cupomResponse?.cupom?.valueFixDiscount +
                        +valorTotal?.replace(',', '.')
                    : 0
                )
              : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default TotalFinal;
