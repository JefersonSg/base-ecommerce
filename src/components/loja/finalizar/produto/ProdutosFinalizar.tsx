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
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import LoadingAnimation from '@/src/components/compartilhado/loading/loadingAnimation';
import productByIdGet from '@/src/actions/product-by-id-get';

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
  const { data, refetch } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      return await productByIdGet({ id: productId });
    }
  });
  const [modalDeleteActive, setModalDeleteActive] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  async function updateItem(valueAmount: number) {
    setIsLoading(true);

    const newAmount = amount + valueAmount;

    if (newAmount < 1) {
      setIsLoading(false);
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
      setIsLoading(false);

      setMessagePopUp('Quantidade atualizada');
      setTypePopUp('');

      return response.data;
    } catch (error) {
      setMessagePopUp('Erro ao atualizar o produto');
      setTypePopUp('error');
      setIsLoading(false);

      console.log(error);
    }
  }
  async function deleteItem(idCart: string) {
    try {
      setIsLoading(true);
      const response = await deleteCartItem(idCart);

      if (refetchData) {
        await refetchData();
      }
      await refetch();
      setIsLoading(false);

      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <tr className={styles.produto_finalizar}>
        <td className={styles.informacoes_produto}>
          {data?.product && (
            <Link href={`/produtos/produto/${productId}`}>
              <Image
                alt="Imagem do produto"
                src={data?.product?.images?.[0]}
                width={104}
                height={135}
                quality={40}
                unoptimized
              />
            </Link>
          )}

          <div>
            <Link
              className={styles.titulo}
              href={`/produtos/produto/${productId}`}
            >
              {data?.product?.name ?? 'carregando...'}
            </Link>
            <p className={styles.marca}>marca: {data?.product?.brand}</p>

            <div className={styles.informacoes_compra_2}>
              <p>
                <span>Cor: </span> {color}
              </p>
              <p>
                <span>Tamanho: </span> {size}
              </p>
            </div>
          </div>
        </td>
        <td className={styles.informacoes_compra}>
          <p>
            <span>Cor: </span> {color}
          </p>
          <p>
            <span>Tamanho: </span> {size}
          </p>
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
            {data?.product?.promotion && data?.product?.promotionalPrice
              ? 'por '
              : ''}
            R$ {total?.toFixed(2)}
          </p>
        </td>
      </tr>
      {modalDeleteActive && <BackgoundClick setState1={setModalDeleteActive} />}
      {modalDeleteActive && (
        <ModalDelete
          id1={ItemCartId}
          text="Deseja mesmo remover o produto?"
          messageToErrorPopUp="Erro ao remover o produto"
          messageToPopUp="Produto removido"
          funcDelete={deleteItem}
          setState={setModalDeleteActive}
          setIsLoading={setIsLoading}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          refetch={refetch}
        />
      )}
      {messagePopUp && (
        <PopUpMessage
          text={messagePopUp}
          setMessagePopUp={setMessagePopUp}
          typePopUp={typePopUp}
          setTypePopUp={setTypePopUp}
        />
      )}
      {isLoading && <LoadingAnimation />}
    </>
  );
};

export default ProdutosFinalizar;
