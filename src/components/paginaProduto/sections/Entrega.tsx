'use client';
import Image from 'next/image';
import { Texto } from '../../textos/Texto';
import styles from './Entrega.module.css';
import TituloSection from './TituloSection';
import React from 'react';

function Entrega() {
  const [ativo, setAtivo] = React.useState(true);

  return (
    <div className={styles.entrega}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <TituloSection texto="Entrega" ativo={ativo} />
      </div>
      {ativo && (
        <>
          <input type="text" placeholder="CEP" />
          <div className={styles.textos}>
            <div>
              <Image
                alt="Caminhão"
                src={'produto/caminhao.svg'}
                width={22}
                height={14}
              />
              <Texto
                texto="Por correio - a partir de R$20,00
                 ou de graça a partir de R$250,00"
              />
            </div>
            <div>
              <Image
                alt="Caixa"
                src={'produto/box.svg'}
                width={22}
                height={14}
              />
              <Texto
                texto="Transportadora - a partir de R$25,00
                 de graça
                 ou de graça a partir de R$250,00"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Entrega;
