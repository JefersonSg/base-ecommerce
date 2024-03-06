import { getAllCategories } from '@/src/shared/api/GETS';
import styles from './Categorias.module.css';
import SlideCategoria from './SlideCategoria';

async function Categorias() {
  const data = await getAllCategories();

  return (
    <div className={styles.categorias}>
      <h2 className={'titulo_sessao'}>Principais Categorias</h2>
      <SlideCategoria data={data} />
    </div>
  );
}

export default Categorias;
