'use client';

import BotaoSessao from '@/src/components/compartilhado/botoes/BotaoSessao';
import styles from './Section.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import React, { Suspense } from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

import SlideProduct from './slide-produto';
import LoadingAnimation from '../../compartilhado/loading/loadingAnimation';
import CreateAccount from '../../compartilhado/modals/CreateAccount';
import MessageFloating from '../../compartilhado/messages/message-floating-cart';
import PopUpMessage from '../../compartilhado/messages/PopUpMessage';

function Section({
  data,
  nomeSessao,
  link,
  textoBotao
}: {
  data?: { products: ProductApi[] };
  nomeSessao: string;
  link: string;
  textoBotao?: string;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [textPopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');
  const [nameProduct, setNameProduct] = React.useState('');
  const [priceProduct, setPriceProduct] = React.useState<number>(0);
  const [imageProduct, setImageProduct] = React.useState('');

  if (!data) {
    return;
  }

  return (
    <>
      <div className={styles.section}>
        <h2 className="titulo_sessao">{nomeSessao}</h2>

        <div className={`gallery_layout_container ${styles.home}`}>
          {data?.products?.map(
            (product, index) =>
              index <= 3 && (
                <Produto
                  setMessagePopUp={setMessagePopUp}
                  setTypePopUp={setTypePopUp}
                  key={product._id}
                  productData={product}
                  setIsLoading={setIsLoading}
                  setModalLogin={setModalLogin}
                  setNameProduct={setNameProduct}
                  setPriceProduct={setPriceProduct}
                  setImageProduct={setImageProduct}
                />
              )
          )}
        </div>
        <Suspense>
          <SlideProduct data={data} />
        </Suspense>
        <div className={styles.botao_sessao}>
          <BotaoSessao texto={textoBotao ?? 'Todos os produtos'} link={link} />
        </div>
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
      {modalLogin && (
        <Suspense>
          <CreateAccount setModalLogin={setModalLogin} />
        </Suspense>
      )}
    </>
  );
}

export default Section;
