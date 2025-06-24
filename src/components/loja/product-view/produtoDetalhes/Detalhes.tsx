'use client';

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
import { addNewItemCart } from '@/src/shared/api/POST';
import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import Entrega from '../sections-page-product/Entrega';
import MessageFloating from '@/src/components/compartilhado/messages/message-floating-cart';
import getCookie from '@/src/actions/getCookie';
import setNewCookie from '@/src/actions/setCookie';
import AdicionarCarrinho from './AdicionarCarrinho';
import Favotiro from '../interacoesUser/Favotiro';
import CreateAccount from '@/src/components/compartilhado/modals/CreateAccount';
import Compartilhar from '../interacoesUser/Compartilhar';
import Separador from '@/src/components/compartilhado/Separador';

function Detalhes({ data }: { data: ProductApi }) {
  const userData = useQuery<UserInterface>({
    queryKey: ['user']
  });
  const [hasStock, setHasStock] = React.useState(true);

  const [colorSelected, setColorSelected] = React.useState(
    data?.colors?.[0] ?? ''
  );
  const [sizeSelected, setSizeSelected] = React.useState(data.size[0]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');
  const [haveColor, setHaveColor] = React.useState<boolean>();
  const [haveSize, setHaveSize] = React.useState<boolean>();
  const [nameProduct, setNameProduct] = React.useState('');
  const [priceProduct, setPriceProduct] = React.useState<number>(0);
  const [imageProduct, setImageProduct] = React.useState('');
  const [modalLogin, setModalLogin] = React.useState(false);

  async function addCartItem() {
    setMessagePopUp('');
    setTypePopUp('');

    const cookie = await getCookie({ nameCookie: 'cart_id' });

    const infosCartItem = {
      productId: data._id,
      userId: userData?.data?.user?._id,
      cartId: cookie ? cookie.value : '',
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
        setNameProduct(data.name);
        setPriceProduct(data.price);
        setImageProduct(
          data?.coverPhoto1?.length ? data.coverPhoto1 : data.images[0]
        );
        setNewCookie({
          nameCookie: 'cart_id',
          valueCookie: response.itemCart.shoppingCartId,
          duracaoDias: 7
        });
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

  React.useEffect(() => {
    const allAmounts = data.stock.amount.flat();
    const hasStock = allAmounts.some((amount) => amount > 0);

    setHasStock(hasStock);
  }, [data.stock.amount]);

  // No Stock color
  React.useEffect(() => {
    // caso haja cor no produto
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

  // No Stock Size
  React.useEffect(() => {
    // caso haja cor no produto
    const sizeIndex = data?.size.indexOf(sizeSelected);

    if (!haveColor && !haveSize) {
      // Se não tiver estoque na combinação atual
      if (!data.stock.amount[0][sizeIndex]) {
        setHaveSize(false);

        // Buscar a primeira combinação com estoque e já parar
        for (let i = 0; i < data.size.length; i++) {
          if (data.stock.amount[0][i]) {
            setSizeSelected(data.size[i]);
            setHaveSize(true);
            break; // PARA AQUI
          }
        }
        return;
      }

      setHaveSize(true);
    }
  }, [data, haveColor, haveSize, sizeSelected]);

  return (
    <div className={styles.detalhes}>
      <Preco
        promotion={data.promotion}
        promotionalPrice={Number(data?.promotionalPrice ?? 0)}
        price={data?.price}
      />
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

      <div className={styles.botao_carrinho}>
        <div className={styles.actions}>
          <div
            className={styles.favorito}
            onClick={() => {
              if (!userData.data?.user?._id) {
                setModalLogin(true);
              }
            }}
          >
            <Favotiro productId={data._id} />
          </div>
          <div
            onClick={() => {
              if (isLoading) return;
              void addCartItem();
            }}
            className={styles.btn_addcart}
          >
            <AdicionarCarrinho
              texto={`${
                !data.active || !hasStock
                  ? 'Sem estoque'
                  : !haveColor
                    ? 'Produto sem estoque nesta cor'
                    : 'Adicionar ao carrinho'
              } `}
              img="carrinho.svg"
              alt="Imagem do carrinho"
              isLoading={isLoading}
              disabled={!haveColor || !data.active || !hasStock}
            />
          </div>
        </div>
      </div>
      <div className={styles.share}>
        <p>Curtiu? Compartilhe esta peça!</p>
        <Compartilhar />
      </div>
      <Separador />
      <div className={styles.entrega}>
        <Entrega />
      </div>
      {messagePopUp && typePopUp === 'error' && (
        <PopUpMessage
          text={messagePopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {messagePopUp && typePopUp !== 'error' && (
        <MessageFloating
          amount={1}
          img={imageProduct}
          nameProduct={nameProduct}
          priceProduct={priceProduct}
          setMessagePopUp={setMessagePopUp}
          setTypePopUp={setTypePopUp}
          typePopUp={typePopUp}
        />
      )}
      {modalLogin && <CreateAccount setModalLogin={setModalLogin} />}
    </div>
  );
}

export default Detalhes;
