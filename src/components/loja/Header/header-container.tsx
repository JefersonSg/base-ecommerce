import { type subcategoriesListByCategory } from '@/src/app/(loja)/layout';
import { Header } from './Header';
import {
  getAllCategories,
  getSubcategoryByCategory,
  getUserByToken
} from '@/src/shared/api/GETS';
import { cookies } from 'next/headers';
import { type UserInterface } from '@/src/shared/helpers/interfaces';

export default async function HeaderContainer() {
  const token = cookies().get('auth_token')?.value;
  const userData = (await getUserByToken(token)) as UserInterface;
  const categories = await getAllCategories();

  const subcategoriesList: subcategoriesListByCategory = [];

  const getSubcategoriesList = async () => {
    let i = 0;

    if (!categories?.categories?.[0]) return null;

    for (const category of categories.categories) {
      const subcategory = await getSubcategoryByCategory(category._id);

      subcategoriesList[i] = subcategory;
      i++;
    }
  };

  await getSubcategoriesList();
  return (
    <>
      <Header
        userData={userData}
        categories={categories}
        subcategoriesList={subcategoriesList}
      />
    </>
  );
}
