'use client';

import React from 'react';
import styles from './SectionProdutos.module.css';
import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import ProductsById from '../produtos/section/ProductsById';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { Titulo } from '../../compartilhado/textos/Titulo';
import PopUpMessage from '../../compartilhado/messages/PopUpMessage';
import LoadingAnimation from '../../compartilhado/loading/loadingAnimation';
import CreateAccount from '../../compartilhado/modals/CreateAccount';

const SectionProdutosViews = ({
  pesquisa,
  data,
  texto
}: {
  pesquisa?: string;
  data: { products: ProductApi[] };
  texto?: string;
}) => {
  const [totalProdutos, setTotalProdutos] = React.useState(9);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [textPopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  // Scrolls
  React.useEffect(() => {
    function infiniteScroll() {
      const scroll = Math.floor(window.scrollY);
      const heigth = document.body.offsetHeight - window.innerHeight;
      const scrollagem = scroll > heigth * 0.6;

      if (
        scrollagem &&
        data?.products?.length > 9 &&
        data.products.length > totalProdutos
      ) {
        setTotalProdutos(totalProdutos + 8);
      }
    }
    infiniteScroll();

    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [data?.products?.length, totalProdutos]);

  return (
    <>
      <div className={styles.section_produtos}>
        <div className={styles.informacoes}>
          <Titulo titulo={texto ?? 'Populares'} />
        </div>
        {data && (
          <ProductsById
            data={data}
            totalProdutos={totalProdutos}
            setIsLoading={setIsLoading}
            setMessagePopUp={setMessagePopUp}
            setTypePopUp={setTypePopUp}
            setModalLogin={setModalLogin}
          />
        )}
        {data?.products?.length > 9 && data.products.length > totalProdutos && (
          <div className={styles.botao}>
            <div
              onClick={() => {
                setTotalProdutos(totalProdutos + 8);
              }}
            >
              <BotaoColorido texto="Mostrar mais" />
            </div>
          </div>
        )}
      </div>
      {textPopUp && (
        <PopUpMessage
          text={textPopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {isLoading && <LoadingAnimation />}
      {modalLogin && <CreateAccount setState={setModalLogin} />}
    </>
  );
};

export default SectionProdutosViews;
