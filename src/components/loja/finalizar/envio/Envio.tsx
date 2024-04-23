'use client';

import React from 'react';
import styles from './Envio.module.css';
import { useQuery } from '@tanstack/react-query';
import {
  type delivery,
  type AddressInterface
} from '@/src/shared/helpers/interfaces';
import { calculateDelivery, getAddress } from '@/src/shared/api/GETS';
import Image from 'next/image';
import Loading from '@/src/components/compartilhado/loading/Loading';

const Envio = ({
  selectDelivery,
  setSelectDelivery,
  setPriceDelivery
}: {
  selectDelivery: string;
  setSelectDelivery: React.Dispatch<React.SetStateAction<string>>;
  setPriceDelivery: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data } = useQuery<{ address: AddressInterface }>({
    queryKey: ['address'],
    queryFn: getAddress
  });

  const [infosEntrega, setInfosEntrega] = React.useState<delivery[]>();
  const [CEPWatch, setCEPWatch] = React.useState(data?.address?.cep);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchApi() {
      if (!isLoading) {
        try {
          setIsLoading(true);
          const responseApiCep =
            CEPWatch?.length && (await calculateDelivery(CEPWatch));
          const dataDelivery: { response: delivery[] } = responseApiCep;
          setIsLoading(false);
          if (dataDelivery.response) {
            setInfosEntrega(dataDelivery?.response);
          }
        } catch (error) {
          setIsLoading(false);
          console.error('Erro ao buscar dados da API:', error);
        }
      }
    }
    void fetchApi();
  }, [CEPWatch, isLoading]);

  React.useEffect(() => {
    setCEPWatch(data?.address.cep);
  }, [data?.address]);

  return (
    <div className={styles.envio_container}>
      <h3>Envio:</h3>
      <div className={styles.escolha_entrega}>
        {!infosEntrega?.[0] && <Loading />}
        {infosEntrega?.[0] &&
          infosEntrega?.map((info) => {
            return (
              <div
                key={info.id}
                className={styles.entrega_calculo}
                onClick={(e) => {
                  if (!info.error) {
                    setSelectDelivery(info.name);
                    setPriceDelivery(+info.custom_price);
                  }
                }}
              >
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
                    ? 'Não disponivel'
                    : 'entre ' +
                      info?.delivery_range?.min +
                      ' e ' +
                      info?.delivery_range?.max +
                      ' dias'}
                </p>
                <p>
                  {info.currency} {info.custom_price}
                </p>
                {!info.error && (
                  <span
                    className={`${styles.select} ${
                      selectDelivery === info.name ? styles.selected : ''
                    }`}
                  ></span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Envio;
