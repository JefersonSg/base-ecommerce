'use client';

import React from 'react';
import styles from './SectionProdutos.module.css';
import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import ProductsById from '../produtos/section/ProductsById';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { Titulo } from '../../compartilhado/textos/Titulo';

const SectionProdutosViews = ({
  pesquisa,
  data
}: {
  pesquisa?: string;
  data: { products: ProductApi[] };
}) => {
  const [totalProdutos, setTotalProdutos] = React.useState(9);

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
    <div className={styles.section_produtos}>
      <div className={styles.informacoes}>
        <Titulo titulo="Populares" />
      </div>
      {data && <ProductsById data={data} totalProdutos={totalProdutos} />}
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
  );
};

export default SectionProdutosViews;
