import Image from 'next/image';
import React from 'react';

const MeiaEstrela = ({ type }: { type?: string }) => {
  return (
    <Image
      alt="Meia estrela"
      src={`/estrelas/${type ?? 'escuras'}/meia_estrela.svg`}
      width={16}
      height={16}
    />
  );
};

export default MeiaEstrela;
