'use client';

import { type ProductApi } from '@/src/shared/helpers/interfaces';
import Descricao from './Descricao';
import Entrega from './Entrega';
import styles from './Sections.module.css';
import Avaliacoes from '../avaliacoes/Avaliacoes';
import React, { Suspense } from 'react';
import Separador from '@/src/components/compartilhado/Separador';

function Sections({ data }: { data: ProductApi }) {
  return (
    <div className={styles.sections}>
      <div className={styles.entrega}>
        <Entrega />
      </div>
      <Separador />
      <div className={styles.select_view}>
        <p className={`${styles.select_description} `}>Descrição</p>
      </div>

      <div
        className={`${styles.div_descricoes} 
        `}
      >
        {data?.description && (
          <Descricao description={data.description} title="Descrição" />
        )}
        {data?.composition && (
          <Descricao description={data.composition} title="Composição" />
        )}
        {data?.characteristic && (
          <Descricao
            description={data.characteristic}
            title="Caracteristicas"
          />
        )}
        {data?.howToUse && (
          <Descricao description={data.howToUse} title="Modo de uso" />
        )}
      </div>

      <div className={`${styles.div_avaliacao}`}>
        <Suspense
          fallback={
            <>
              <div className={styles.espaco_branco}></div>
            </>
          }
        >
          <Avaliacoes />
        </Suspense>
      </div>
    </div>
  );
}

export default Sections;
