'use client';

import BotaoSessao from '@/src/components/compartilhado/botoes/BotaoSessao';
import styles from './Section.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

import SlideProduct from './slide-produto';
import PopUpMessage from '../../compartilhado/messages/PopUpMessage';
import LoadingAnimation from '../../compartilhado/loading/loadingAnimation';
import CreateAccount from '../../compartilhado/modals/CreateAccount';

async function Section({
  data,
  nomeSessao,
  link,
  textoBotao
}: {
  data: { products: ProductApi[] };
  nomeSessao: string;
  link: string;
  textoBotao?: string;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalLogin, setModalLogin] = React.useState(false);
  const [textPopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

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
                />
              )
          )}
        </div>
        <SlideProduct data={data} />
        <div className={styles.botao_sessao}>
          <BotaoSessao texto={textoBotao ?? 'Todos os produtos'} link={link} />
        </div>
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
}

export default Section;
