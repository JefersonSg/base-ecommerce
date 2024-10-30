'use client';

import React, { Suspense } from 'react';
import styles from './SectionProdutos.module.css';
import ProductsById from '../produtos/section/ProductsById';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { Titulo } from '../../compartilhado/textos/Titulo';
import PopUpMessage from '../../compartilhado/messages/PopUpMessage';
import LoadingAnimation from '../../compartilhado/loading/loadingAnimation';
import CreateAccount from '../../compartilhado/modals/CreateAccount';
import MessageFloating from '../../compartilhado/messages/message-floating-cart';
import { type ProductGetParams } from '@/src/actions/products-filters-get';

const SectionProdutosViews = ({
  data,
  texto,
  functionGetProduct,
  categoryId
}: {
  data: ProductApi[];
  texto?: string;
  functionGetProduct: ({
    id,
    page,
    total,
    promotion,
    active
  }: ProductGetParams) => Promise<
    | {
        products: ProductApi[];
      }
    | undefined
  >;
  categoryId?: string;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [textPopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  const [page, setPage] = React.useState(1);
  const [dataProducts, setDataProducts] = React.useState<ProductApi[]>(data);
  const [infinite, setInfinite] = React.useState(!(data.length < 6));
  const [loading, setLoading] = React.useState(false);
  const [nameProduct, setNameProduct] = React.useState('');
  const [priceProduct, setPriceProduct] = React.useState<number>(0);
  const [imageProduct, setImageProduct] = React.useState('');

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
        id: '',
        category: categoryId,
        promotion: true,
        active: true,
        page,
        total: 9
      });

      if (actionData?.products) {
        const { products } = actionData;

        setDataProducts((currentProducts) => [...currentProducts, ...products]);
      }
      if (actionData?.products && actionData?.products?.length < 9)
        setInfinite(false);

      if (actionData === undefined) {
        setInfinite(false);
      }
    }

    void getProducts(page);
  }, [categoryId, functionGetProduct, page]);

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
        <div className={styles.informacoes}>
          <Titulo titulo={texto ?? 'Populares'} />
        </div>
        {dataProducts && (
          <ProductsById
            data={dataProducts}
            setIsLoading={setIsLoading}
            setMessagePopUp={setMessagePopUp}
            setTypePopUp={setTypePopUp}
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
      <div className={`${styles.loading} ${isLoading ? styles.ativo : ''}`}>
        <Suspense>
          <LoadingAnimation />
        </Suspense>
      </div>
      {loading && <p>carregando...</p>}
      {modalLogin && <CreateAccount setModalLogin={setModalLogin} />}
    </>
  );
};

export default SectionProdutosViews;
