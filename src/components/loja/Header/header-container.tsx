import { type subcategoriesListByCategory } from '@/src/app/(loja)/layout';
import { Header } from './Header';
import {
  getAllCategories,
  getSubcategoryByCategory
} from '@/src/shared/api/GETS';

export default async function HeaderContainer() {
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
      <Header categories={categories} subcategoriesList={subcategoriesList} />
    </>
  );
}
