import Image from 'next/image';
import React from 'react';
import styles from './Produto.module.css';
import ToggleButton from '../../../compartilhado/formulario/ToggleButton';
import Link from 'next/link';
import { revalidateTagAction } from '@/src/actions/revalidates';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';

const ProdutoItem = ({
  data,
  setAtivoDelete,
  setIdDelete
}: {
  data: ProductApi;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdDelete: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const revalidate = async () => {
    await revalidateTagAction('product-' + data?._id);
    await revalidateTagAction('all-products');
    await revalidateTagAction('all-active-products');
  };

  const [totalProducts, setTotalProducts] = React.useState<any>(0);
  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  React.useEffect(() => {
    async function totalProducts() {
      const total = data?.stock?.amount?.[0]?.reduce?.((cont, amount) => {
        return cont + amount;
      }, 0);
      setTotalProducts(total);
    }
    void totalProducts();
  }, [data]);

  return (
    <>
      <tr className={styles.produto_item}>
        <td className={styles.produto_info}>
          <div>
            <Link
              href={`/produtos/produto/${data._id}`}
              className={styles.div_img}
            >
              <Image
                alt="Imagem da categoria"
                src={data.images?.[0]}
                width={40}
                height={40}
                quality={30}
                placeholder="empty"
              />
            </Link>

            <div className={styles.infos}>
              <Link href={`/produtos/produto/${data._id}`}>
                <h3 className={`name ${styles.name}`}>{data?.name}</h3>
              </Link>
              <p className={`description ${styles.description}`}>
                {data?.description}
              </p>
            </div>
          </div>
        </td>
        <td>
          <div className={styles.estoque}>
            <ToggleButton
              type="promoção"
              data={data}
              pathnameUrl="products/edit/"
              revalidate={revalidate}
              setPopUpMessage={setMessagePopUp}
              status={data.promotion}
            />
          </div>
        </td>
        <td>
          <div className={styles.estoque}>
            <ToggleButton
              setPopUpMessage={setMessagePopUp}
              type="estoque"
              data={data}
              pathnameUrl="products/edit/"
              revalidate={revalidate}
              status={data.active}
            />
          </div>
        </td>
        <td className={styles.total_products_register}>
          <h3>{totalProducts}</h3>
        </td>
        <td className={styles.total_products_value}>
          <h3>R$ {convertNumberInReal(data.price)}</h3>
        </td>
        <td>
          <div className={styles.actions}>
            <Image
              alt="Lixeira para deletar a categoria"
              src={'/dashboard/lixeira.svg'}
              width={16}
              height={18}
              onClick={() => {
                setAtivoDelete(true);
                setIdDelete(data._id);
              }}
            />
            <Link href={`/dashboard/produtos/${data?._id}`}>
              <Image
                alt="Imagem de um laps para editar a categoria"
                src={'/dashboard/edit.svg'}
                width={16}
                height={18}
              />
            </Link>
          </div>
        </td>
      </tr>
      {messagePopUp && (
        <PopUpMessage
          text={messagePopUp}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
        />
      )}
    </>
  );
};

export default ProdutoItem;
