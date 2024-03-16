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
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';

function Detalhes({ data }: { data: ProductApi }) {
  const userData = useQuery<{ user: UserInterface }>({
    queryKey: ['user']
  });

  const [colorSelected, setColorSelected] = React.useState(
    data.colors[0] ?? ''
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const [textPopUp, setTextPopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  async function addCartItem() {
    setTextPopUp('');
    setTypePopUp('');

    if (!userData?.data?.user?._id) {
      setTextPopUp('Faça login para adicionar ao carrinho');
      setTypePopUp('error');

      const timeout = setTimeout(() => {
        setTextPopUp('');
        setTypePopUp('');
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }

    const infosCartItem = {
      productId: data._id,
      userId: userData.data.user._id,
      size: data.size,
      color: colorSelected,
      amount: 1
    };

    try {
      setIsLoading(true);
      const response = await addNewItemCart(infosCartItem);

      setTimeout(() => {
        setIsLoading(false);
      }, 700);

      setTextPopUp('Produdo adicionado ao carrinho');
      setTypePopUp('');

      const timeout = setTimeout(() => {
        setTextPopUp('');
        setTypePopUp('');
      }, 3000);

      clearTimeout(timeout);
      return response;
    } catch (error) {
      console.log(error);
      setTypePopUp('Erro ao adicionar ao carrinho');
      setTypePopUp('error');
      setIsLoading(false);
    }
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
          if (isLoading) return;
          void addCartItem();
        }}
      >
        <BotaoColorido
          texto="Adicionar ao carrinho"
          img="carrinho.svg"
          alt="Imagem do carrinho"
          isLoading={isLoading}
        />
      </div>
      {textPopUp && <PopUpMessage text={textPopUp} type={typePopUp} />}
    </div>
  );
}

export default Detalhes;
