import Image from 'next/image';
import React from 'react';
import styles from './Enderecos.module.css';
import Formulario from './formulario/Formulario';

const Enderecos = () => {
  return (
    <>
      <div className={styles.enderecos_cadastrados}>
        <Image
          alt="Imagem de marcador de mapa"
          src={'/carrinho/pin_map.svg'}
          width={24}
          height={24}
        />
        <span>Endereço de entrega</span>
      </div>
      <Formulario />
    </>
  );
};

export default Enderecos;
