import { TituloSessao } from '../../textos/TituloSessao';
import styles from './Preco.module.css';

function Preco({ texto }: { texto: string }) {
  return (
    <div className={styles.preco}>
      <TituloSessao titulo={texto} />
    </div>
  );
}

export default Preco;
