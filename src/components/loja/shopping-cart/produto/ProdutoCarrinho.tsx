'use client';

import React from 'react';
import styles from './ProdutoCarrinho.module.css';
import Image from 'next/image';
import BotaoQuantidade from '../quantidade/BotaoQuantidade';
import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery
} from '@tanstack/react-query';
import { updateItemCart } from '@/src/shared/api/UPDATES';
import { deleteCartItem } from '@/src/shared/api/DELETE';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import Link from 'next/link';
import productByIdGet from '@/src/actions/product-by-id-get';

const ProdutoCarrinho = ({
  productId,
  color,
  size,
  amount,
  ItemCartId,
  total,
  refetchData,
  setTypePopUp,
  setMessagePopUp
}: {
  productId: string;
  color: string;
  size: string;
  amount: number;
  total: number;
  ItemCartId: string;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  refetchData?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { data, refetch } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      return await productByIdGet({ id: productId });
    }
  });
  const [modalDeleteActive, setModalDeleteActive] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [stock, setStock] = React.useState(true);

  async function updateItem(valueAmount: number) {
    setIsloading(true);

    const newAmount = amount + valueAmount;

    if (newAmount < 1) {
      setIsloading(false);
      setModalDeleteActive(true);
      return;
    }
    const data = {
      size,
      color,
      amount: newAmount
    };
    try {
      const response = await updateItemCart(ItemCartId, data);
      if (refetchData) {
        await refetchData();
      }
      await refetch();
      setIsloading(false);

      return response.data;
    } catch (error) {
      setIsloading(false);

      console.log(error);
    }
  }

  async function deleteItem(idCart: string) {
    try {
      setIsloading(true);
      const response = await deleteCartItem(idCart);

      if (refetchData) {
        await refetchData();
      }
      await refetch();
      setIsloading(false);
      return response.data;
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  }
  React.useEffect(() => {
    data?.product?.colors?.filter((cor) => cor === color);

    if (!data) {
      setStock(false);
    }
  }, [color, data]);

  return (
    <div
      className={`${styles.produto_Carrinho} ${stock ? '' : styles.no_stock}`}
    >
      <div className={styles.informacoes_produto}>
        {data?.product && (
          <Link href={`/produtos/produto/${productId}`}>
            <Image
              alt="Imagem do produto"
              src={
                data?.product?.coverPhoto1?.[0]
                  ? data?.product?.coverPhoto1
                  : data?.product?.images?.[0]
              }
              placeholder="blur"
              blurDataURL={data?.product?.images?.[0]}
              width={104}
              height={135}
              quality={41}
              unoptimized
            />
          </Link>
        )}
        <div className={styles.informacoes}>
          <Link
            className={styles.titulo}
            href={`/produtos/produto/${productId}`}
          >
            {data?.product?.name ?? 'carregando...'}
          </Link>
          <p>
            <span>Cor: </span> {color}
          </p>
          <p>
            <span>Tamanho: </span> {size}
          </p>
          <p>
            <span>Quantidade: </span> {amount ?? 1}
          </p>
        </div>
        <Image
          className={styles.lixeira}
          alt="lixeira"
          src={'/carrinho/lixeira.svg'}
          width={19}
          height={21}
          onClick={() => {
            setModalDeleteActive(true);
          }}
        />
      </div>
      <div className={styles.quantidade}>
        <BotaoQuantidade
          contador={amount}
          isLoading={isLoading}
          functionUpdate={updateItem}
        />
        <p
          className={`${styles.valor} ${
            data?.product?.promotion && data?.product?.promotionalPrice
              ? styles.promotion
              : ''
          }`}
        >
          <span> R$ {(Number(data?.product?.price) * amount).toFixed(2)}</span>
          R$ {total?.toFixed(2)}
        </p>
      </div>
      {modalDeleteActive && <BackgoundClick setState1={setModalDeleteActive} />}
      {modalDeleteActive && (
        <ModalDelete
          id1={ItemCartId}
          text="Deseja mesmo remover o produto?"
          messageToErrorPopUp="Erro ao remover produto"
          messageToPopUp="Produto removido"
          setIsLoading={setIsloading}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          setState={setModalDeleteActive}
          funcDelete={deleteItem}
        />
      )}
    </div>
  );
};

export default ProdutoCarrinho;
