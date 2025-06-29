'use client';

import Image from 'next/image';
import styles from './MetodoPagametos.module.css';
import { TituloFooter } from '../infos/TituloFooter';

export function MetodoPagamentos({ img }: { img: string[] }) {
  return (
    <div className={styles.div_metodos_pagamentos}>
      <TituloFooter titulo="FORMAS DE PAGAMENTO" ativo={false} seta={false} />
      <div className={styles.formar_de_pagamento}>
        {img.map((image) => {
          return (
            <Image
              className={styles.imagens_metodo_pagamento}
              key={image}
              alt={image}
              src={`/footer/MetodosPagamentos/${image}.svg`}
              width={66}
              height={21}
              unoptimized
            />
          );
        })}
      </div>
    </div>
  );
}
