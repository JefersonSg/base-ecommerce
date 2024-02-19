import Image from 'next/image';
import React from 'react';

const UmaEstrela = ({ type }: { type?: string }) => {
  return (
    <Image
      alt="estrela cheia"
      src={`/estrelas/${type ?? 'escuras'}/estrela_cheia.svg`}
      width={16}
      height={16}
    />
  );
};

export default UmaEstrela;
