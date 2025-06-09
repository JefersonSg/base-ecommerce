import { type CategoryInterface } from '@/src/shared/helpers/interfaces';
import styles from './Categorias.module.css';
import SlideCategoria from './SlideCategoria';

function Categorias({
  categorias
}: {
  categorias: { categories: CategoryInterface[] };
}) {
  return (
    <div className={styles.categorias}>
      {/* <h2 className={'titulo_sessao'}> Categorias</h2> */}
      <SlideCategoria data={categorias} />
    </div>
  );
}

export default Categorias;
