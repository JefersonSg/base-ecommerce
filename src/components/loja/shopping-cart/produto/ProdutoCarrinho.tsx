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

const ProdutoCarrinho = ({
  productId,
  color,
  size,
  amount,
  ItemCartId,
  refetchData
}: {
  productId: string;
  color: string;
  size: string;
  amount: number;
  ItemCartId: string;
  refetchData: (
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

  async function updateItem(valueAmount: number) {
    const newAmount = amount + valueAmount;
    const data = {
      size,
      color,
      amount: newAmount
    };
    try {
      const response = await updateItemCart(ItemCartId, data);
      await refetchData();
      await refetch();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteItem(idCart: string) {
    try {
      const response = await deleteCartItem(idCart);

      await refetchData();
      await refetch();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.produto_Carrinho}>
      <div className={styles.informacoes_produto}>
        <Image
          alt="Imagem do produto"
          src={`${data?.product?.images?.[0] ?? '/produto/produto1.png'}`}
          width={104}
          height={135}
        />
        <div className={styles.informacoes}>
          <span className={styles.titulo}>
            {data?.product?.name ?? 'carregando...'}
          </span>
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
        <BotaoQuantidade contador={amount} functionUpdate={updateItem} />
        <p className={styles.valor}>
          R${' '}
          {(data?.product?.price ? +data?.product?.price * amount : 0).toFixed(
            2
          )}
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
