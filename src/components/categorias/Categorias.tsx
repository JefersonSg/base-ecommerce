import { TituloSessao } from '../textos/TituloSessao';
import styles from './Categorias.module.css';
import SlideCategoria from './SlideCategoria';

function Categorias() {
  return (
    <div className={styles.categorias}>
      <TituloSessao titulo="Categorias" />
      <SlideCategoria />
    </div>
  );
}

export default Categorias;
