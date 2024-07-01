import styles from './NotFound.module.css';
import { Footer } from '../components/loja/Footer/Footer';
import { Header } from '../components/loja/Header/Header';
import { type subcategoryInterface } from '../shared/helpers/interfaces';
import Link from 'next/link';
import categoriesGetAll from '../actions/category-get-all';
import { getSubcategoryByCategory } from '../shared/api/GETS';

const NotFound = async () => {
  const categories = await categoriesGetAll();

  const subcategoriesList: subcategoryInterface[] = [];

  const getSubcategoriesList = async () => {
    let i = 0;
    if (!categories.categories) return;
    for (const category of categories.categories) {
      const subcategory = await getSubcategoryByCategory(category._id);

      subcategoriesList[i] = subcategory;
      i++;
    }
  };

  await getSubcategoriesList();
  return (
    <>
      <Header />
      <div className={styles.notFound}>
        <h1 className="titulo_sessao">404 - Página não encontrada</h1>
        <Link href={'/'}>Volte para a home</Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
