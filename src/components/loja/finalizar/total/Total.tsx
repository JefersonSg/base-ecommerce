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
import LoadingAnimation from '@/src/components/compartilhado/loading/loadingAnimation';

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
  const [descontoPorcentagem, setDescontoPorcentagem] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

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
      setIsLoading(false);

      if (response) {
        setCupomResponse(response);
        if (response?.cupom?.percentageDiscount) {
          setDescontoPorcentagem(response.cupom.percentageDiscount / 100);
        }
      }
      if (response?.response?.data?.erro) {
        setIsLoading(false);
        if (typeof window === 'undefined') {
          return;
        }
        window.localStorage.removeItem('cupom');
      }
    }
  }, [cupom, data?.totalValue, valorTotal]);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const cupomUsed = window.localStorage.getItem('cupom');

    if (cupomUsed && valorTotal) {
      setIsLoading(true);
      setCupom(cupomUsed);
      void redeemCode();
    }
  }, [redeemCode, valorTotal]);

  React.useEffect(() => {
    async function setValorCategory() {
      if (data?.totalValue) {
        setIsLoading(false);
        const totalValor =
          priceDelivery && +data.totalValue < 249.9
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
    <>
      {isLoading && <LoadingAnimation />}
      <div className={styles.total_container}>
        {cupomResponse?.cupom?._id && (
          <p className={styles.cupom_aplicado}>cupom aplicado </p>
        )}

        <div>
          <p>Produtos </p>
          <p>
            {data?.totalValue
              ? 'R$ ' + convertNumberInReal(+data?.totalValue)
              : 'R$ 0,00'}
          </p>
        </div>
        <div>
          <p>Desconto</p>
          <p
            className={`${
              descontoPorcentagem ? styles.valor_desconto_aplicado : ''
            }`}
          >
            {data?.totalValue
              ? descontoPorcentagem
                ? '-R$ ' +
                  convertNumberInReal(data?.totalValue * descontoPorcentagem)
                : 'R$ 0,00'
              : ''}
          </p>
        </div>
        <div>
          <p>Frete</p>
          <p
            className={`${styles.frete} ${
              valorTotal &&
              +valorTotal.replace('.', '').replace(',', '.') > 249.9
                ? styles.frete_gratis
                : ''
            }`}
          >
            {valorTotal &&
            +valorTotal.replace('.', '').replace(',', '.') > 249.9 ? (
              'Frete grátis'
            ) : (
              <>
                {priceDelivery
                  ? 'R$ ' + convertNumberInReal(priceDelivery)
                  : 'R$ 0,00'}
              </>
            )}
          </p>
        </div>
        {valorTotal && (
          <div className={styles.valor_total}>
            <p>VALOR TOTAL</p>
            <p>
              {descontoPorcentagem && data?.totalValue
                ? 'R$ ' +
                  convertNumberInReal(
                    (descontoPorcentagem
                      ? -data.totalValue * descontoPorcentagem
                      : 0) +
                      +valorTotal?.replace('.', '').replace(',', '.') +
                      priceDelivery
                  )
                : 'R$ ' +
                  convertNumberInReal(
                    +valorTotal.replace('.', '').replace(',', '.')
                  )}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TotalFinal;
