'use client';

import React from 'react';
import styles from './Filter.module.css';
import { useQuery } from '@tanstack/react-query';
import categoriesGetAll from '@/src/actions/category-get-all';
import subcategoriesGetAll from '@/src/actions/subcategory-get-all';
import ButtonsFilterContainer from './ButtonsFilterContainer';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import AccordionCategories from './AccordionCategories';
import AccordionSubcategories from './AccordionSubcategories';
import { type ProductGetParams } from '@/src/actions/products-filters-get';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { getFilters } from '@/src/shared/functions/getFilters';
import ColorFilter from './ColorFilter';
import BtnFechar from '@/src/components/compartilhado/botoes/BtnFechar';

export interface ColorFilterInterface {
  color: string;
  codeColor: string;
}

const Filter = ({
  pesquisa,
  functionGetProduct,
  active,
  promotion,
  categoryId,
  subcategoryId,
  orderBy,
  orderDirection
}: {
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
  const [ativo, setAtivo] = React.useState(false);
  const categories = useQuery({
    queryKey: ['categories-get-all'],
    queryFn: async () => await categoriesGetAll()
  });
  const subcategories = useQuery({
    queryKey: ['subcategories-get-all'],
    queryFn: async () => await subcategoriesGetAll()
  });
  const [filterColors, setFilterColors] = React.useState<
    ColorFilterInterface[]
  >([]);
  const getFiltersFunc = React.useCallback(async () => {
    const teste = await getFilters({
      pesquisa,
      functionGetProduct,
      active,
      promotion,
      categoryId,
      subcategoryId,
      orderBy,
      orderDirection
    });

    return teste;
  }, [
    active,
    categoryId,
    functionGetProduct,
    orderBy,
    orderDirection,
    pesquisa,
    promotion,
    subcategoryId
  ]);
  React.useEffect(() => {
    const get = async () => {
      const filters = await getFiltersFunc();

      if (filters.cores) {
        setFilterColors(filters?.cores);
      }
    };

    void get();
  }, [getFiltersFunc]);

  React.useEffect(() => {
    if (ativo) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [ativo]);

  return (
    <>
      <ButtonsFilterContainer ativo={ativo} setAtivo={setAtivo} />
      <div
        className={`${styles.filter_container} ${ativo ? styles.ativo : ''}`}
      >
        {ativo && <BtnFechar setAtivo={setAtivo} />}
        <div className={styles.side_nav}>
          <h3 className={styles.title}>Filtar</h3>
          <div className={styles.divisor}></div>
          <AccordionCategories content={categories.data?.categories} />
          <div className={styles.divisor}></div>
          <AccordionSubcategories content={subcategories.data?.subcategories} />
          <div className={styles.divisor}></div>

          <ColorFilter filterColors={filterColors} />
        </div>

        <div className={styles.botoes}>
          <button>LIMPAR</button>
          <button>APLICAR</button>
        </div>
      </div>
      {ativo && <BackgoundClick setState1={setAtivo} />}
    </>
  );
};

export default Filter;
