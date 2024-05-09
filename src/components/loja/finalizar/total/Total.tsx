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
  const [discontoPorcentagem, setDiscontoPorcentagem] = React.useState(0);
  const [discontoFixo, setDiscontoFixo] = React.useState(0);

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
      const response =
        data?.totalValue && (await redeemCoupon(cupom, +data?.totalValue));

      if (response) {
        setCupomResponse(response);
        if (response?.cupom?.percentageDiscount) {
          setDiscontoPorcentagem(response.cupom.percentageDiscount / 100);
        }
        if (response?.cupom?.valueFixDiscount) {
          setDiscontoFixo(response?.cupom?.valueFixDiscount);
        }
      }
      console.log(response?.response?.data?.erro);
      if (response?.response?.data?.erro) {
        window.localStorage.removeItem('cupom');
      }
    }
  }, [cupom, data?.totalValue, valorTotal]);

  React.useEffect(() => {
    const cupomUsed = window.localStorage.getItem('cupom');

    if (cupomUsed && valorTotal) {
      setCupom(cupomUsed);
      void redeemCode();
    }
  }, [redeemCode, valorTotal]);

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
        <p className={styles.valor_desconto_aplicado}>
          {data?.totalValue
            ? discontoPorcentagem
              ? 'Desconto -R$ ' +
                convertNumberInReal(data?.totalValue * discontoPorcentagem)
              : cupomResponse?.cupom?.valueFixDiscount
                ? 'Desconto -R$ ' + cupomResponse?.cupom?.valueFixDiscount
                : 'Desconto R$ 0,00'
            : ''}
        </p>

        <p
          className={`${
            cupomResponse?.cupom?._id ? styles.valor_desconto : ''
          }`}
        >
          Produtos R${' '}
          {data?.totalValue ? convertNumberInReal(+data?.totalValue) : '0,00'}
        </p>
        <p
          style={{ display: `${cupomResponse?.cupom?._id ? 'block' : 'none'}` }}
          className={`${
            cupomResponse?.cupom?._id ? styles.valor_desconto_novo : ''
          }`}
        >
          Produtos R${' '}
          {discontoPorcentagem && data?.totalValue
            ? convertNumberInReal(
                (discontoPorcentagem
                  ? -data.totalValue * discontoPorcentagem
                  : 0) + +data.totalValue
              )
            : discontoFixo && data
              ? convertNumberInReal(
                  +data.totalValue - discontoFixo
                    ? -discontoFixo + +data.totalValue
                    : 0
                )
              : data && convertNumberInReal(+data.totalValue)}
        </p>

        <p className={styles.frete}>
          Frete: R${' '}
          {priceDelivery ? convertNumberInReal(priceDelivery) : '0,00'}
        </p>

        {valorTotal && (
          <p>
            Total: R${' '}
            {discontoPorcentagem && data?.totalValue
              ? convertNumberInReal(
                  (discontoPorcentagem
                    ? -data.totalValue * discontoPorcentagem
                    : 0) + +valorTotal?.replace(',', '.')
                )
              : discontoFixo
                ? convertNumberInReal(
                    +valorTotal?.replace(',', '.') - discontoFixo
                      ? -discontoFixo + +valorTotal?.replace(',', '.')
                      : 0
                  )
                : convertNumberInReal(+valorTotal.replace(',', '.'))}
          </p>
        )}
      </div>
    </div>
  );
};

export default TotalFinal;
