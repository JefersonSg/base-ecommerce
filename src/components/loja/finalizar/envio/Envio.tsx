'use client';

import React from 'react';
import styles from './Envio.module.css';
import { type delivery } from '@/src/shared/helpers/interfaces';
import Image from 'next/image';
import Loading from '@/src/components/compartilhado/loading/LoadingSpinner';

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
  console.log(shippingOption);
  return (
    <div className={styles.envio_container}>
      <h3>Envio:</h3>
      <div className={styles.escolha_entrega}>
        {!shippingOption?.[0] && <Loading />}
        {shippingOption?.[0] &&
          shippingOption?.map((info) => {
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
                <div className={styles.image_entrega}>
                  <Image
                    alt="imagem da empresa"
                    src={info?.company?.picture}
                    width={55}
                    height={15}
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
                <p className={styles.preco}>
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
