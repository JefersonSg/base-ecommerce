import styles from './TituloSections.module.css';
import { TituloSessao } from '../../textos/TituloSessao';

function TituloSections({ texto }: { texto: string }) {
  return (
    <div className={styles.tituloSections}>
      <TituloSessao titulo={texto} />
    </div>
  );
}

export default TituloSections;
