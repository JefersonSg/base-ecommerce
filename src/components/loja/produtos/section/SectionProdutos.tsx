'use client';

import React, { Suspense } from 'react';
import styles from './SectionProdutos.module.css';
// import Image from 'next/image';
import ProductsById from './ProductsById';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import LoadingAnimation from '@/src/components/compartilhado/loading/loadingAnimation';
import CreateAccount from '@/src/components/compartilhado/modals/CreateAccount';
import MessageFloating from '@/src/components/compartilhado/messages/message-floating-cart';
import { type ProductGetParams } from '@/src/actions/products-filters-get';
import Filter from '../filter/Filter';

const SectionProdutos = ({
  data,
  pesquisa,
  functionGetProduct,
  active,
  promotion,
  categoryId,
  subcategoryId,
  orderBy,
  orderDirection
}: {
  data: ProductApi[];
  functionGetProduct: ({ id, page, total }: ProductGetParams) => Promise<
    | {
        products: ProductApi[];
      }
    | undefined
  >;
  pesquisa?: string;
  active?: boolean;
  promotion?: boolean;
  categoryId?: string;
  subcategoryId?: string;
  orderBy?: string;
  orderDirection?: string;
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
  const [color, setColor] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [size, setSize] = React.useState('');

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
        category: categoryId,
        subcategory: subcategoryId,
        name: pesquisa,
        page,
        total: 9,
        brand,
        color,
        size,
        active,
        promotion,
        orderBy,
        orderDirection
      });

      if (actionData?.products) {
        const { products } = actionData;

        setDataProducts((currentProducts) => [...currentProducts, ...products]);
      }
      if (actionData?.products && actionData?.products?.length < 9)
        setInfinite(false);
    }
    void getProducts(page);
  }, [
    active,
    functionGetProduct,
    orderBy,
    orderDirection,
    page,
    pesquisa,
    promotion,
    categoryId,
    subcategoryId,
    brand,
    color,
    size
  ]);

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

  // Set FIlters
  React.useEffect(() => {
    async function getProducts(page: number) {
      const actionData = await functionGetProduct({
        category: categoryId,
        subcategory: subcategoryId,
        name: pesquisa,
        page,
        total: 9,
        brand,
        color,
        size,
        active,
        promotion,
        orderBy,
        orderDirection
      });

      if (actionData?.products) {
        const { products } = actionData;

        console.log(actionData);

        setDataProducts([...products]);
      }
      if (actionData?.products && actionData?.products?.length < 9)
        setInfinite(false);
    }
    if (color || size || brand) {
      setPage(1);

      void getProducts(page);
    }
  }, [
    active,
    brand,
    categoryId,
    color,
    functionGetProduct,
    orderBy,
    orderDirection,
    page,
    pesquisa,
    promotion,
    size,
    subcategoryId
  ]);

  return (
    <>
      <div className={styles.section_produtos}>
        <Filter
          functionGetProduct={functionGetProduct}
          pesquisa={pesquisa}
          active={active}
          categoryId={categoryId}
          subcategoryId={subcategoryId}
          promotion={promotion}
          orderBy={orderBy}
          orderDirection={orderDirection}
          color={color}
          setColor={setColor}
          size={size}
          setSize={setSize}
          brand={brand}
          setBrand={setBrand}
        />

        <div className={styles.informacoes}></div>
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
