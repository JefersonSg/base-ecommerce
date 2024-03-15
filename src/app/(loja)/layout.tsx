import React from 'react';
import { Footer } from '@/src/components/loja/Footer/Footer';
import { BtnZap } from '@/src/components/compartilhado/botoes/btnZap/BtnZap';

import { Header } from '@/src/components/loja/Header/Header';
import {
  getAllCategories,
  getSubcategoryByCategory
} from '@/src/shared/api/GETS';
import { type subcategoryInterface } from '@/src/shared/helpers/interfaces';

export type subcategoriesListByCategory = Record<
  number,
  {
    subcategories: subcategoryInterface[];
  }
>;
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();

  const subcategoriesList: subcategoriesListByCategory = [];

  const getSubcategoriesList = async () => {
    let i = 0;
    for (const category of categories.categories) {
      const subcategory = await getSubcategoryByCategory(category._id);

      subcategoriesList[i] = subcategory;
      i++;
    }
  };

  await getSubcategoriesList();

  return (
    <>
      {subcategoriesList[0] && (
        <Header categories={categories} subcategoriesList={subcategoriesList} />
      )}
      {children}
      <BtnZap />
      <Footer />
    </>
  );
}
