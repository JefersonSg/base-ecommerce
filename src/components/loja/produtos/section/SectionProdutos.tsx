'use client';

import React, { Suspense } from 'react';
import styles from './SectionProdutos.module.css';
// import Image from 'next/image';
import ProductsById from './ProductsById';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import LoadingAnimation from '@/src/components/compartilhado/loading/loadingAnimation';
import CreateAccount from '@/src/components/compartilhado/modals/CreateAccount';
import { type ProductGetParams } from '@/src/actions/products-active-get';
import MessageFloating from '@/src/components/compartilhado/messages/message-floating-cart';

const SectionProdutos = ({
  data,
  pesquisa,
  functionGetProduct,
  categoryId
}: {
  data: ProductApi[];
  pesquisa?: string;
  categoryId?: string;
  functionGetProduct: ({ id, page, total }: ProductGetParams) => Promise<
    | {
        products: ProductApi[];
      }
    | undefined
  >;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [textPopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');
  const [nameProduct, setNameProduct] = React.useState('');
  const [priceProduct, setPriceProduct] = React.useState<number>(0);
  const [imageProduct, setImageProduct] = React.useState('');

  const [page, setPage] = React.useState(1);
  const [dataProducts, setDataProducts] = React.useState<ProductApi[]>(data);
  const [infinite, setInfinite] = React.useState(!(data.length < 6));
  const [loading, setLoading] = React.useState(false);

  const fetching = React.useRef(false);

  // Scrolls

  function infiniteScroll() {
    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);

    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  React.useEffect(() => {
    if (page === 1) return;

    async function getProducts(page: number) {
      const actionData = await functionGetProduct({
        id: categoryId ?? pesquisa ?? '',
        page,
        total: 9
      });

      if (actionData?.products) {
        const { products } = actionData;

        setDataProducts((currentProducts) => [...currentProducts, ...products]);
      }
      if (actionData?.products && actionData?.products?.length < 9)
        setInfinite(false);
    }
    void getProducts(page);
  }, [categoryId, functionGetProduct, page, pesquisa]);

  React.useEffect(() => {
    if (infinite) {
      window.addEventListener('scroll', infiniteScroll);
      window.addEventListener('wheel', infiniteScroll);
    } else {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    }
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
      window.removeEventListener('wheel', infiniteScroll);
    };
  }, [infinite]);

  return (
    <>
      <div className={styles.section_produtos}>
        {/* <Filter /> */}

        <div className={styles.informacoes}>
          {/* <div className={styles.select_view}>
          <Image
          alt="imagem de quadrados para mudar a vizualização dos produtos"
          src={'/produtos/multi_view.svg'}
          width={17}
          height={17}
          />
          
          <Image
          alt="imagem de quadrados para mudar a vizualização dos produtos"
          src={'/produtos/single_view.svg'}
          width={17}
          height={17}
          />
          </div> */}
        </div>
        {data && (
          <ProductsById
            data={dataProducts}
            setMessagePopUp={setMessagePopUp}
            setTypePopUp={setTypePopUp}
            setIsLoading={setIsLoading}
            setModalLogin={setModalLogin}
            setImageProduct={setImageProduct}
            setNameProduct={setNameProduct}
            setPriceProduct={setPriceProduct}
          />
        )}
      </div>
      {textPopUp && typePopUp === 'error' && (
        <PopUpMessage
          text={textPopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {textPopUp && typePopUp !== 'error' && (
        <MessageFloating
          amount={1}
          img={imageProduct}
          nameProduct={nameProduct}
          priceProduct={priceProduct}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
        />
      )}
      {loading && <p>carregando...</p>}
      <Suspense>{isLoading && <LoadingAnimation />}</Suspense>
      {modalLogin && <CreateAccount setModalLogin={setModalLogin} />}
    </>
  );
};

export default SectionProdutos;
