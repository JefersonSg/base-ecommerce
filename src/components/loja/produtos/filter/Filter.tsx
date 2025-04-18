'use client';

import React from 'react';
import styles from './Filter.module.css';
import { useQuery } from '@tanstack/react-query';
import categoriesGetAll from '@/src/actions/category-get-all';
import ButtonsFilterContainer from './ButtonsFilterContainer';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import AccordionCategories from './AccordionCategories';
import AccordionSubcategories from './AccordionSubcategories';
import { type ProductGetParams } from '@/src/actions/products-filters-get';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { getFilters } from '@/src/shared/functions/getFilters';
import ColorFilter from './ColorFilter';
import BtnFechar from '@/src/components/compartilhado/botoes/BtnFechar';
import AccordionSizes from './AccordionSizes';
import AccordionBrands from './AccordionBrands';
import subcategorieByCategoryIdGet from '@/src/actions/subcategory-by-category-id-get';

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
  orderDirection,
  color,
  setColor,
  size,
  setSize,
  brand,
  setBrand,
  setApliFilters,
  category,
  setCategory,
  subcategory,
  setSubcategory
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
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  brand: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  subcategory: string;
  setSubcategory: React.Dispatch<React.SetStateAction<string>>;
  setApliFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [ativo, setAtivo] = React.useState(false);
  const categories = useQuery({
    queryKey: ['categories-get-all'],
    queryFn: async () => await categoriesGetAll()
  });
  const subcategories = useQuery({
    queryKey: ['subcategories-get-by-categoryId', category],
    queryFn: async () =>
      await subcategorieByCategoryIdGet({ categoryId: category })
  });
  const [filterColors, setFilterColors] = React.useState<
    ColorFilterInterface[]
  >([]);
  const [filterSizes, setFilterSizes] = React.useState<string[]>([]);
  const [filterBrands, setFilterBrands] = React.useState<string[]>([]);
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
      if (filters.tamanhos) {
        setFilterSizes(filters?.tamanhos);
      }
      if (filters.marcas) {
        setFilterBrands(filters?.marcas);
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
          <AccordionCategories
            content={categories.data?.categories}
            category={category}
            setCategory={setCategory}
          />
          <div className={styles.divisor}></div>
          {subcategories.data?.subcategories[0] && (
            <>
              <AccordionSubcategories
                content={subcategories.data?.subcategories}
                subcategory={subcategory}
                setSubcategory={setSubcategory}
              />
              <div className={styles.divisor}></div>
            </>
          )}
          <AccordionSizes content={filterSizes} size={size} setSize={setSize} />
          <div className={styles.divisor}></div>
          <ColorFilter
            filterColors={filterColors}
            setColor={setColor}
            color={color}
          />
          <div className={styles.divisor}></div>
          <AccordionBrands
            brand={brand}
            setBrand={setBrand}
            content={filterBrands}
          />
        </div>

        <div className={styles.botoes}>
          <button
            className={styles.btn_limpar}
            onClick={() => {
              setBrand('');
              setSize('');
              setColor('');
              setApliFilters(true);
              setAtivo(false);
            }}
          >
            LIMPAR
          </button>
          <button
            className={styles.btn_aplicar}
            onClick={() => {
              setApliFilters(true);
              setAtivo(false);
            }}
          >
            APLICAR
          </button>
        </div>
      </div>
      {ativo && <BackgoundClick setState1={setAtivo} />}
    </>
  );
};

export default Filter;
