import Image from 'next/image';
import { TituloArea } from '../../textos/TituloArea';
import styles from './TituloSessao.module.css';

export function TituloSessao({
  titulo,
  ativo
}: {
  titulo: string;
  ativo: null | boolean;
}) {
  return (
    <div className={styles.tituloSessao}>
      <TituloArea titulo={titulo} />
      <Image
        className={`${styles.seta} ${ativo === true && styles.ativo}`}
        alt="Seta"
        src={'/footer/setaBaixo.svg'}
        width={8}
        height={4}
      />
    </div>
  );
}
