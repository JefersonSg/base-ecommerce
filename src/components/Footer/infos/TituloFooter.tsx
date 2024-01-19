import Image from 'next/image';
import { TituloArea } from '../../textos/TituloArea';
import styles from './TituloFooter.module.css';

export function TituloFooter({
  titulo,
  ativo,
  seta
}: {
  titulo: string;
  ativo: null | boolean;
  seta: boolean;
}) {
  return (
    <div className={styles.titulo_footer}>
      <TituloArea titulo={titulo} />
      {seta ? (
        <Image
          className={`${styles.seta} ${ativo === true && styles.ativo}`}
          alt="Seta"
          src={'/setaBaixoWhite.svg'}
          width={8}
          height={4}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
