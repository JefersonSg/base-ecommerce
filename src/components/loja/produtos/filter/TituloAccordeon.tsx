import React from 'react';
import styles from './TituloAccordeon.module.css';
import Image from 'next/image';

const TituloAccordeon = ({
  title,
  setAtivo,
  ativo
}: {
  title: string;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  ativo: boolean;
}) => {
  return (
    <div>
      <h3
        className={styles.titulo_accordeon}
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        {title}
        {ativo ? (
          <Image
            alt="Imagem de menos"
            src={'/filtro/ocultar.svg'}
            width={16}
            height={1}
          />
        ) : (
          <Image
            alt="Imagem de mais"
            src={'/filtro/expandir.svg'}
            width={13}
            height={13}
          />
        )}
      </h3>
    </div>
  );
};

export default TituloAccordeon;
