'use client';

import BotaoSessao from '@/src/components/compartilhado/botoes/BotaoSessao';
import styles from './Section.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import React from 'react';
import Produto from '@/src/components/loja/produto/Produto';

function Section({
  nomeSessao,
  quantidadeItens,
  IdSessao
}: {
  nomeSessao: string;
  quantidadeItens: number;
  IdSessao: string;
}) {
  const { data } = useQuery<{ products: ProductApi[] }>({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  return (
    <div className={styles.section}>
      <h2 className="titulo_sessao">{nomeSessao}</h2>

      <div className={styles.produtos}>
        {data?.products?.map((product) => {
          return (
            <Produto
              key={product._id}
              link={product._id}
              name={product.name}
              price={product.price.toFixed(2).toString().replace('.', ',')}
              promotion={product.promotion}
              img={product.images}
            />
          );
        })}
      </div>
      <BotaoSessao texto="Todos os produtos" />
    </div>
  );
}

export default Section;
