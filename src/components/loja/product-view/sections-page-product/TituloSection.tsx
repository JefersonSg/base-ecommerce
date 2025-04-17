'use client';
import styles from './TituloSection.module.css';
import Image from 'next/image';

function TituloSection({ texto, ativo }: { texto: string; ativo?: boolean }) {
  return (
    <div className={styles.titulo_section}>
      <h2 className={styles.titulo_h2}>{texto}</h2>
      <Image
        className={`${styles.seta} ${ativo ? styles.ativo : ''}`}
        alt="Seta"
        src={'/setaBaixo.svg'}
        width={14}
        height={6}
      />
      {ativo}
    </div>
  );
}

export default TituloSection;
