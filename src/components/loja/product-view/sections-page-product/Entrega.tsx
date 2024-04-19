'use client';
import Image from 'next/image';
import styles from './Entrega.module.css';
import TituloSection from './TituloSection';
import React from 'react';
import { calculateDelivery } from '@/src/shared/api/GETS';
import { type delivery } from '@/src/shared/helpers/interfaces';

function Entrega() {
  const [ativo, setAtivo] = React.useState(true);

  const [infosEntrega, setInfosEntrega] = React.useState<delivery[]>();
  const [CEPWatch, setCEPWatch] = React.useState('');

  React.useEffect(() => {
    async function fetchApi() {
      try {
        const responseApiCep =
          CEPWatch.length > 7 &&
          CEPWatch.length < 10 &&
          (await calculateDelivery(CEPWatch));
        const data: { response: delivery[] } = responseApiCep;

        if (data.response) {
          setInfosEntrega(data?.response);
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    if (CEPWatch?.length >= 8) {
      void fetchApi();
    }
  }, [CEPWatch]);

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
          <input
            type="text"
            placeholder="CEP"
            value={CEPWatch}
            onChange={(e) => {
              setCEPWatch(e.target.value);
            }}
          />
          <div className={styles.textos}>
            <div>
              <Image
                alt="Caminhão"
                src={'/produto/caminhao.svg'}
                width={22}
                height={14}
              />
              <p className="texto">
                Por correio - a partir de R$20,00 ou de graça a partir de
                R$250,00
              </p>
            </div>
            <div>
              <Image
                alt="Caixa"
                src={'/produto/box.svg'}
                width={22}
                height={14}
              />
              <p className="texto">
                Transportadora - a partir de R$25,00 de graça ou de graça a
                partir de R$250,00
              </p>
            </div>
            <div className={styles.entregas_metodos}>
              {infosEntrega?.map((info) => {
                return (
                  <div key={info.id} className={styles.entrega_calculo}>
                    <div className={styles.image_entrega}>
                      <Image
                        alt="imagem da empresa"
                        src={info?.company?.picture}
                        width={64}
                        height={25}
                      />
                    </div>
                    <p>{info.name}</p>
                    <p>
                      {info.currency} {info.custom_price}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Entrega;
