'use client';
import Image from 'next/image';
import styles from './Entrega.module.css';
import TituloSection from './TituloSection';
import React from 'react';
import { calculateDelivery } from '@/src/shared/api/GETS';
import { type delivery } from '@/src/shared/helpers/interfaces';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import useMedia from '@/src/shared/hooks/useMedia';
import Loading from '@/src/components/compartilhado/loading/LoadingSpinner';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

function Entrega() {
  const [ativo, setAtivo] = React.useState(true);

  const [infosEntrega, setInfosEntrega] = React.useState<delivery[]>();
  const [CEPWatch, setCEPWatch] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  async function fetchApi() {
    if (!isLoading) {
      try {
        setOpenModal(true);
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
      }
    }
  }

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
        <div className={styles.container}>
          <div>
            <div className={styles.texto_indicativo_input}>
              <Image
                alt="Imagem de caminhão de frete"
                src={'/produto/caminhao.svg'}
                width={24}
                height={24}
              />
              <label htmlFor="cep">Consulte o frete</label>
            </div>
            <div className={styles.input_entrega}>
              <input
                name="cep"
                id="cep"
                type="text"
                placeholder="Digite seu CEP"
                value={CEPWatch}
                maxLength={9}
                onChange={(e) => {
                  setCEPWatch(e.target.value);
                }}
              />
              <button
                className={styles.buttonOk}
                onClick={() => {
                  if (CEPWatch.length >= 8) {
                    void fetchApi();
                  }
                }}
              >
                OK
              </button>
            </div>
          </div>
          <div className={styles.textos}>
            {openModal ? (
              <div className={styles.entregas_metodos}>
                {isLoading && (
                  <>
                    <Loading />
                  </>
                )}
                {infosEntrega?.[0] &&
                  infosEntrega?.map((info) => {
                    if (info.error) {
                      return <></>;
                    }
                    return (
                      <div key={info.id} className={styles.entrega_calculo}>
                        <p>{info.name}</p>
                        <p>
                          {info.error?.length
                            ? 'Não disponivel'
                            : info.name === 'Motoboy'
                              ? 'Até 2 horas'
                              : info.name === 'Retirada na loja'
                                ? 'Combinar'
                                : ' até ' + info?.delivery_range?.max + ' dias'}
                        </p>
                        <p>
                          {info.currency}{' '}
                          {convertNumberInReal(Number(info.custom_price))}
                        </p>
                      </div>
                    );
                  })}
              </div>
            ) : (
              ''
            )}
          </div>
          {(isLoading && !mobile) || (openModal && !mobile) ? (
            <BackgoundClick setState1={setOpenModal} />
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}

export default Entrega;
