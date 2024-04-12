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
import { getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { updateItemCart } from '@/src/shared/api/UPDATES';
import { deleteCartItem } from '@/src/shared/api/DELETE';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import Link from 'next/link';

const ProdutoCarrinho = ({
  productId,
  color,
  size,
  amount,
  ItemCartId,
  total,
  refetchData
}: {
  productId: string;
  color: string;
  size: string;
  amount: number;
  total: number;
  ItemCartId: string;
  refetchData?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { data, refetch } = useQuery<{ product: ProductApi }>({
    queryKey: ['product', productId],
    queryFn: async () => {
      return await getProductById(productId);
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
    data?.product.colors.filter((cor) => cor === color);

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
          <Link href={`produto/${productId}`}>
            <Image
              alt="Imagem do produto"
              src={data?.product?.images?.[0]}
              placeholder="blur"
              blurDataURL={data?.product?.images?.[0]}
              width={104}
              height={135}
              quality={40}
            />
          </Link>
        )}
        <div className={styles.informacoes}>
          <Link
            className={styles.titulo}
            href={{ pathname: '/produto', query: { _id: productId } }}
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
          funcDelete={deleteItem}
          id1={ItemCartId}
          setState={setModalDeleteActive}
          text="Deseja mesmo remover o produto?"
        />
      )}
    </div>
  );
};

export default ProdutoCarrinho;
