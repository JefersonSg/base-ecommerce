'use client';

import React from 'react';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import styles from './Produtos.module.css';
import SectionProdutos from './section/SectionProdutos';

// import BotaoFiltro from '@/src/components/compartilhado/botoes/BotaoFiltro';
import {
  type ProductApi,
  type CategoryInterface,
  type subcategoryInterface
} from '@/src/shared/helpers/interfaces';
import { type ProductGetParams } from '@/src/actions/products-filters-get';

function Produtos({
  titulo,
  pesquisa,
  data,
  subcategorieDataSlide,
  categorieDataSlide,
  functionGetProduct,
  active,
  promotion,
  categoryId,
  subcategoryId,
  orderBy,
  orderDirection
}: {
  titulo?: string;
  pesquisa?: string;
  data?: ProductApi[];
  categoryId?: string;
  subcategoryId?: string;
  subcategorieDataSlide?: { subcategories: subcategoryInterface[] };
  categorieDataSlide?: { categories: CategoryInterface[] };
  functionGetProduct: ({
    id,
    category,
    page,
    total
  }: ProductGetParams) => Promise<
    | {
        products: ProductApi[];
      }
    | undefined
  >;
  active?: boolean;
  promotion?: boolean;
  orderBy?: string;
  orderDirection?: string;
}) {
  return (
    <div className={styles.produtos_container}>
      <Titulo
        titulo={`${pesquisa ?? ''} 
        ${
          titulo ??
          (categorieDataSlide?.categories?.[0]
            ? 'Categorias'
            : subcategorieDataSlide?.subcategories?.[0]
              ? 'Subcategorias'
              : pesquisa
                ? ''
                : 'Produtos')
        }`}
      />

      {data && (
        <SectionProdutos
          data={data}
          functionGetProduct={functionGetProduct}
          pesquisa={pesquisa}
          active={active}
          categoryId={categoryId}
          subcategoryId={subcategoryId}
          promotion={promotion ?? false}
          orderBy={orderBy}
          orderDirection={orderDirection}
        />
      )}
    </div>
  );
}

export default Produtos;
