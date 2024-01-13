import styles from './TituloSection.module.css';
import { TituloSessao } from '../../textos/TituloSessao';
import Image from 'next/image';

function TituloSection({ texto }: { texto: string }) {
  return (
    <div className={styles.tituloSection}>
      <TituloSessao titulo={texto} />
      <Image alt="Seta" src={'/setaBaixo.svg'} width={14} height={6} />
    </div>
  );
}

export default TituloSection;
