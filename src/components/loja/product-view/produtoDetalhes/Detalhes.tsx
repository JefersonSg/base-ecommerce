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
import React, { Suspense } from 'react';
import { addNewItemCart } from '@/src/shared/api/POST';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import Entrega from '../sections-page-product/Entrega';
import CreateAccount from '@/src/components/compartilhado/modals/CreateAccount';

function Detalhes({ data }: { data: ProductApi }) {
  const userData = useQuery<UserInterface>({
    queryKey: ['user']
  });

  const [colorSelected, setColorSelected] = React.useState(
    data?.colors?.[0] ?? ''
  );
  const [sizeSelected, setSizeSelected] = React.useState(data.size[0]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');
  const [haveColor, setHaveColor] = React.useState<boolean>();
  const [modalLogin, setModalLogin] = React.useState(false);

  async function addCartItem() {
    setMessagePopUp('');
    setTypePopUp('');

    if (!userData?.data?.user?._id) {
      setTypePopUp('error');
      setMessagePopUp('Faça login para adicionar ao carrinho');
      setModalLogin(true);
      return;
    }

    const infosCartItem = {
      productId: data._id,
      userId: userData.data.user._id,
      size: sizeSelected,
      color: colorSelected,
      amount: 1
    };

    try {
      setIsLoading(true);
      const response = await addNewItemCart(infosCartItem);

      setTimeout(() => {
        setIsLoading(false);
      }, 700);

      if (response) {
        setMessagePopUp('Produdo adicionado ao carrinho');
        setTypePopUp('');
      } else {
        setTypePopUp('error');
        setMessagePopUp('Erro ao adicionar ao carrinho');
      }

      return response;
    } catch (error) {
      console.log(error);
      setTypePopUp('error');
      setTypePopUp('Erro ao adicionar ao carrinho');
      setIsLoading(false);
    }
  }

  // No Stock
  React.useEffect(() => {
    if (data?.colors?.[0]) {
      const colorIndex = data?.colors.indexOf(colorSelected);
      const sizeIndex = data?.size.indexOf(sizeSelected);

      if (!data.stock.amount[colorIndex][sizeIndex]) {
        setHaveColor(false);

        data.size.forEach((size, i) => {
          if (data.stock.amount[colorIndex][i]) {
            setSizeSelected(size);
          }
        });
        return;
      }
      setHaveColor(true);
    } else {
      setHaveColor(true);
    }
  }, [colorSelected, data, sizeSelected]);

  return (
    <div className={styles.detalhes}>
      <div className={styles.informacoes}>
        <Cores
          sizes={data.size}
          sizeSelected={sizeSelected}
          setSizeSelected={setSizeSelected}
          colors={data?.colors}
          codeColors={data?.codeColors}
          colorSelected={colorSelected}
          setColorSelected={setColorSelected}
          amount={data.stock.amount}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
        />
        <Tamanhos
          colorSelected={colorSelected}
          colors={data.colors}
          amount={data.stock.amount}
          sizes={data?.size}
          sizeSelected={sizeSelected}
          setSizeSelected={setSizeSelected}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
        />
      </div>
      <Preco
        promotion={data.promotion}
        promotionalPrice={Number(data?.promotionalPrice ?? 0)}
        price={data?.price}
      />
      <div className={styles.entrega}>
        <Suspense>
          <Entrega />
        </Suspense>
      </div>
      <div
        className={styles.botao_carrinho}
        onClick={() => {
          if (isLoading) return;
          void addCartItem();
        }}
      >
        <BotaoColorido
          texto={`${
            !data.active
              ? 'Sem estoque'
              : !haveColor
                ? 'Produto sem estoque nesta cor'
                : 'Adicionar ao carrinho'
          } `}
          img="carrinho.svg"
          alt="Imagem do carrinho"
          isLoading={isLoading}
          disabled={!haveColor || !data.active}
        />
      </div>
      {messagePopUp && (
        <PopUpMessage
          text={messagePopUp}
          typePopUp={typePopUp}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
        />
      )}
      {modalLogin && <CreateAccount setModalLogin={setModalLogin} />}
    </div>
  );
}

export default Detalhes;
