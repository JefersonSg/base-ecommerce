import Image from 'next/image';
import React from 'react';

const EstrelaVazia = () => {
  return (
    <Image
      alt="Meia estrela"
      src={'/produto/pagina/comentarios/estrela_vazia.svg'}
      width={16}
      height={16}
    />
  );
};

export default EstrelaVazia;
