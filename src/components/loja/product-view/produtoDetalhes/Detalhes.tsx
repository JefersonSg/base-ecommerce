'use client';

import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Cores from './Cores';
import styles from './Detalhes.module.css';
import Preco from './Preco';
import Tamanhos from './Tamanhos';
import {
  type UserInterface,
  type ProductApi
} from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { addNewItemCart } from '@/src/shared/api/CREATE';

function Detalhes({ data }: { data: ProductApi }) {
  const userData = useQuery<{ user: UserInterface }>({
    queryKey: ['user']
  });

  const [colorSelected, setColorSelected] = React.useState(
    data.colors[0] ?? ''
  );

  async function addCartItem() {
    const infosCartItem = {
      productId: data._id,
      userId: userData?.data?.user?._id,
      size: data.size,
      color: colorSelected,
      amount: 1
    };
    const response = await addNewItemCart(infosCartItem);
    return response;
  }

  return (
    <div className={styles.detalhes}>
      <div className={styles.informacoes}>
        <Cores
          colors={data?.colors}
          codeColors={data?.codeColors}
          colorSelected={colorSelected}
          setColorSelected={setColorSelected}
        />
        <Tamanhos size={data?.size} />
      </div>
      <Preco
        texto={`R$ ${data?.price.toFixed(2).toString().replace('.', ',')}`}
      />
      <div
        className={styles.botao_carrinho}
        onClick={() => {
          void addCartItem();
        }}
      >
        <BotaoColorido
          texto="Adicionar ao carrinho"
          img="carrinho.svg"
          alt="Imagem do carrinho"
        />
      </div>
    </div>
  );
}

export default Detalhes;
