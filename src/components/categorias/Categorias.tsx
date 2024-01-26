import styles from './Categorias.module.css';
import SlideCategoria from './SlideCategoria';

function Categorias() {
  return (
    <div className={styles.categorias}>
      <h2 className={'titulo_sessao'}>Categorias</h2>
      <SlideCategoria />
    </div>
  );
}

export default Categorias;
