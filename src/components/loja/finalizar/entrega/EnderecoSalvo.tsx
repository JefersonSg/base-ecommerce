import React from 'react';
import styles from './EnderecoSalvo.module.css';
import { type AddressInterface } from '@/src/shared/helpers/interfaces';

const EnderecoSalvo = ({ data }: { data: { address: AddressInterface } }) => {
  return (
    <div className={styles.savedAddress}>
      <p>
        {data?.address?.nome} <span>| {data?.address?.telefone}</span>
      </p>
      <span>{data?.address?.rua}</span>
      <span>{data?.address?.bairro}</span>
      <span>
        {data?.address?.cidade} - {data?.address?.uf}
      </span>
      <span>{data?.address?.cep}</span>
    </div>
  );
};

export default EnderecoSalvo;
