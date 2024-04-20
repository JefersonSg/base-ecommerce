'use client';
import Image from 'next/image';
import styles from './Entrega.module.css';
import TituloSection from './TituloSection';
import React from 'react';
import { calculateDelivery } from '@/src/shared/api/GETS';
import { type delivery } from '@/src/shared/helpers/interfaces';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import useMedia from '@/src/shared/hooks/useMedia';

function Entrega() {
  const [ativo, setAtivo] = React.useState(true);

  const [infosEntrega, setInfosEntrega] = React.useState<delivery[]>();
  const [CEPWatch, setCEPWatch] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  async function fetchApi() {
<<<<<<< HEAD
    try {
      const responseApiCep =
        CEPWatch.length > 7 &&
        CEPWatch.length < 10 &&
        (await calculateDelivery(CEPWatch));
      const data: { response: delivery[] } = responseApiCep;

      if (data.response) {
        setInfosEntrega(data?.response);
=======
    if (!isLoading) {
      try {
        setIsLoading(true);
        const responseApiCep =
          CEPWatch.length > 7 &&
          CEPWatch.length < 10 &&
          (await calculateDelivery(CEPWatch));
        const data: { response: delivery[] } = responseApiCep;
        setIsLoading(false);
        if (data.response) {
          setInfosEntrega(data?.response);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Erro ao buscar dados da API:', error);
>>>>>>> main
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  }
<<<<<<< HEAD
=======

  React.useEffect(() => {
    function formatCEP() {
      // Remove todos os caracteres que não sejam dígitos
      const cleaned = CEPWatch?.replace(/\D/g, '');

      if (CEPWatch?.length > 0 && CEPWatch.length < 10) {
        let formatted = '';
        for (let i = 0; i < cleaned.length; i++) {
          if (i === 5) {
            formatted += '-';
          }
          formatted += cleaned[i];
        }
        setCEPWatch(formatted);
      }
    }
    formatCEP();
  }, [CEPWatch]);
>>>>>>> main

  const mobile = useMedia('(max-width:64rem)');

  return (
    <div className={styles.entrega}>
      <div
        onClick={() => {
          setAtivo(!ativo);
        }}
      >
        <div className={styles.titulo}>
          <TituloSection texto="Entrega" ativo={ativo} />
        </div>
      </div>
      {ativo && (
        <>
          <div>
            <input
              type="text"
              placeholder="CEP"
              value={CEPWatch}
<<<<<<< HEAD
=======
              maxLength={9}
>>>>>>> main
              onChange={(e) => {
                setCEPWatch(e.target.value);
              }}
            />
            <button
              className={styles.buttonOk}
              onClick={() => {
<<<<<<< HEAD
                console.log(CEPWatch);
                if (CEPWatch.length >= 8) {
                  void fetchApi;
=======
                if (CEPWatch.length >= 8) {
                  void fetchApi();
>>>>>>> main
                }
              }}
            >
              OK
            </button>
          </div>
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
            {(isLoading && !mobile) || (infosEntrega?.[0] && !mobile) ? (
              <div className={styles.entregas_metodos}>
                {isLoading && (
                  <>
                    <div className={styles.loading}>Loading...</div>
                  </>
                )}
                {infosEntrega?.[0] &&
                  infosEntrega?.map((info) => {
                    return (
                      <div key={info.id} className={styles.entrega_calculo}>
                        <div className={styles.image_entrega}>
                          <Image
                            alt="imagem da empresa"
                            src={info?.company?.picture}
                            width={94}
                            height={20}
                          />
                        </div>
                        <p>{info.name}</p>
                        <p>
                          {info.error?.length
                            ? info.error
                            : 'entre ' +
                              info?.delivery_range?.min +
                              ' e ' +
                              info?.delivery_range?.max +
                              ' dias'}
                        </p>
                        <p>
                          {info.currency} {info.custom_price}
                        </p>
                      </div>
                    );
                  })}
              </div>
            ) : (
              ''
            )}
          </div>
          {(isLoading && !mobile) || (infosEntrega?.[0] && !mobile) ? (
            <BackgoundClick setState1={setInfosEntrega} />
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
}

export default Entrega;
