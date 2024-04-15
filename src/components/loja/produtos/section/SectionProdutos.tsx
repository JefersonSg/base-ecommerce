'use client';

import React from 'react';
import styles from './SectionProdutos.module.css';
import Image from 'next/image';
import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import ProductsById from './ProductsById';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const SectionProdutos = ({
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
        <span className={styles.total_pesquisa}>{`Total de ${
          data?.products?.length ?? 0
        } ${data?.products?.length > 1 ? 'produtos' : 'produto'}`}</span>

        <div className={styles.select_view}>
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
        </div>
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

export default SectionProdutos;
