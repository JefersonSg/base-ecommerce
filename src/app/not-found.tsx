import styles from './NotFound.module.css';
import { Footer } from '../components/loja/Footer/Footer';
import { Header } from '../components/loja/Header/Header';
import { type subcategoriesListByCategory } from './(loja)/layout';
import {
  getAllCategories,
  getSubcategoryByCategory,
  getUserByToken
} from '../shared/api/GETS';
import { cookies } from 'next/headers';

const NotFound = async () => {
  const token = cookies().get('auth_token')?.value;
  const userData = await getUserByToken(token);
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
      <Header
        userData={userData}
        categories={categories}
        subcategoriesList={subcategoriesList}
      />
      <div className={styles.notFound}>
        <h1 className="titulo_sessao">404 - Página não encontrada</h1>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
