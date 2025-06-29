import Image from 'next/image';
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
      <h3 className="titulo_area">{titulo}</h3>
      {seta ? (
        <Image
          className={`${styles.seta} ${ativo === true && styles.ativo}`}
          alt="Seta"
          src={'/setaBaixoWhite.svg'}
          width={8}
          height={4}
          unoptimized
        />
      ) : (
        <></>
      )}
    </div>
  );
}
