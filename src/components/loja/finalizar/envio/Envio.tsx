'use client';

import React from 'react';
import styles from './Envio.module.css';
import { type delivery } from '@/src/shared/helpers/interfaces';
import Loading from '@/src/components/compartilhado/loading/LoadingSpinner';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

const Envio = ({
  shippingOption,
  selectDelivery,
  setSelectDelivery,
  setPriceDelivery,
  setServiceShippingId
}: {
  shippingOption?: delivery[];
  selectDelivery: string;
  setSelectDelivery: React.Dispatch<React.SetStateAction<string>>;
  setPriceDelivery: React.Dispatch<React.SetStateAction<number>>;
  setServiceShippingId: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={styles.envio_container}>
      <h3 className={styles.envio_texto}>Frete</h3>
      <div className={styles.escolha_entrega}>
        {!shippingOption?.[0] && <Loading />}
        {shippingOption?.[0] &&
          shippingOption?.map((info) => {
            if (info.error?.length) {
              return <></>;
            }
            return (
              <div
                key={info.id}
                className={styles.entrega_calculo}
                onClick={(e) => {
                  if (!info.error) {
                    setSelectDelivery(info.name);
                    setPriceDelivery(+info.custom_price);
                    setServiceShippingId(info.id);
                  }
                }}
              >
                <p>{info.name}</p>
                <p className={styles.tempo_envio}>
                  {info.error?.length
                    ? 'Não disponivel'
                    : info.name === 'Motoboy'
                      ? 'Até 2 horas'
                      : info.name === 'Retirada na loja'
                        ? 'Combinar'
                        : ' até ' + info?.delivery_range?.max + ' dias'}
                </p>
                <p className={styles.preco}>
                  {info.currency}{' '}
                  {convertNumberInReal(Number(info.custom_price))}
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
