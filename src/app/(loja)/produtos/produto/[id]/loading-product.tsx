import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import styles from './loading.module.css';

export default function LoadingProduct() {
  return (
    <div className={styles.produto_container}>
      <Titulo titulo="carregando..." />
      <div className={styles.fotos}>
        <div className={styles.foto_principal}></div>
        <div className={styles.fotos_slide}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
