import Image from 'next/image';
import React from 'react';

const EstrelaVazia = ({ type }: { type?: string }) => {
  return (
    <Image
      alt="Meia estrela"
      src={`/estrelas/${type ?? 'escuras'}/estrela_vazia.svg`}
      width={16}
      height={16}
      unoptimized
    />
  );
};

export default EstrelaVazia;
