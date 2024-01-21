import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb';
import { TextoIndicativo } from '@/src/components/textos/TextoIndicativo';
import { Titulo } from '@/src/components/textos/Titulo';
import React from 'react';

import styles from './Carrinho.module.css';
import ProdutoCarrinho from '../../components/carrinho/produto/ProdutoCarrinho';

const page = () => {
  return (
    <div>
      <div className={styles.area_textos}>
        <Breadcrumb texto="Home / Carrinho" />
        <Titulo titulo="Carrinho" />
        <p className={styles.texto_indicativo}>
          <TextoIndicativo texto="Você tem 2 itens no seu carrinho" />
        </p>
      </div>
      <div className={styles.produtos}>
        <ProdutoCarrinho
          nome="Agua micelar"
          cor="branco"
          tamanho="300ml"
          valor={83.59}
          img="produto1.png"
        />
        <ProdutoCarrinho
          nome="Creme Hydra"
          cor="branco"
          tamanho="300ml"
          valor={73.99}
          img="produto2.png"
        />
      </div>
    </div>
  );
};

export default page;
