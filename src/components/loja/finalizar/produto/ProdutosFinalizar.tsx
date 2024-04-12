import { getProductById } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery
} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Produto.module.css';
import { updateItemCart } from '@/src/shared/api/UPDATES';
import BotaoQuantidadeFinalizar from '../quantidade/BotaoQuantidadeFinalizar';
import ModalDelete from '../../../compartilhado/modals/ModalDelete';
import BackgoundClick from '../../../compartilhado/backgrounds/BackgoundClick';
import { deleteCartItem } from '@/src/shared/api/DELETE';

const ProdutosFinalizar = ({
  productId,
  color,
  size,
  amount,
  total,
  ItemCartId,
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
      return response.data;
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  }

  return (
    <>
      <tr className={styles.produto_finalizar}>
        <td className={styles.informacoes_produto}>
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
          <td className={styles.informacoes}>
            <Link className={styles.titulo} href={`produto/${productId}`}>
              {data?.product?.name ?? 'carregando...'}
            </Link>
            <p>
              <span>Cor: </span> {color}
            </p>
            <p>
              <span>Tamanho: </span> {size}
            </p>
          </td>
        </td>
        <td className={styles.valor_produto}>
          <p
            className={`${styles.valor} ${
              data?.product?.promotion && data?.product?.promotionalPrice
                ? styles.promotion
                : ''
            }`}
          >
            <span> R$ {Number(data?.product?.price).toFixed(2)}</span>
            R$ {Number(total / amount).toFixed(2)}
          </p>
        </td>
        <td className={styles.quantidade_table}>
          <BotaoQuantidadeFinalizar
            contador={amount}
            isLoading={isLoading}
            functionUpdate={updateItem}
          />
        </td>
        <td className={styles.total_table}>
          <td className={styles.valor_total_produto}>
            <p
              className={`${styles.valor} ${
                data?.product?.promotion && data?.product?.promotionalPrice
                  ? styles.promotion
                  : ''
              }`}
            >
              <span>
                {' '}
                de R$ {(Number(data?.product?.price) * amount).toFixed(2)}
              </span>
              por R$ {total?.toFixed(2)}
            </p>
          </td>
        </td>
      </tr>
      {modalDeleteActive && <BackgoundClick setState1={setModalDeleteActive} />}
      {modalDeleteActive && (
        <ModalDelete
          funcDelete={deleteItem}
          id1={ItemCartId}
          setState={setModalDeleteActive}
          text="Deseja mesmo remover o produto?"
        />
      )}
    </>
  );
};

export default ProdutosFinalizar;
