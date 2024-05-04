/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import React from 'react';
import EntregaFinalizar from './entrega/EntregaFinalizar';
import Finalizarfetchs from './Finalizar_fetchs';
import Envio from './envio/Envio';
import TotalFinal from './total/Total';
import Pagamento from './pagamento/Pagamento';
import BotaoColorido from '../../compartilhado/botoes/BotaoColorido';
import styles from './FinalizarFetchs.module.css';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import {
  type AddressInterface,
  type CartInterface,
  type OrderInterface,
  type UserInterface
} from '@/src/shared/helpers/interfaces';
import {
  getAddress,
  getAllItemsCartByUserId,
  getUserByToken
} from '@/src/shared/api/GETS';
import { createNewOrder } from '@/src/shared/api/CREATE';
import Confirm from './confirmation/Confirm';
import BackgoundClick from '../../compartilhado/backgrounds/BackgoundClick';
import { useRouter } from 'next/navigation';
import sendPurchasedEmail from '@/src/actions/purchaseEmail';
import PopUpMessage from '../../compartilhado/messages/PopUpMessage';

const FinalizarContainer = () => {
  const [methodPayment, setMethodPayment] = React.useState('card');
  const [serviceShippingId, setServiceShippingId] = React.useState(0);
  const [popUpMessage, setPopUpMessage] = React.useState('');

  const token = Cookies.get('auth_token');
  const { data } = useQuery<UserInterface>({
    queryKey: ['user'],
    queryFn: async () => {
      return (await getUserByToken(token)) as UserInterface;
    }
  });
  const address = useQuery<{ address: AddressInterface }>({
    queryKey: ['address' + data?.user?._id],
    queryFn: async () => {
      return await getAddress();
    }
  });
  const itemsCart = useQuery<CartInterface>({
    queryKey: ['shopping-cart', data?.user?._id, address?.data?.address?.cep],
    queryFn: async () => {
      if (data?.user?._id) {
        return await getAllItemsCartByUserId(
          data?.user?._id,
          address?.data?.address?.cep
        );
      }
      return [];
    }
  });

  const [ativoConfirm, setAtivoConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectDelivery, setSelectDelivery] = React.useState('');
  const [priceDelivery, setPriceDelivery] = React.useState(NaN);
  const [paymentLink, setPaymentLink] = React.useState('');
  const router = useRouter();

  const onSubmit = async () => {
    if (data && !isLoading) {
      try {
        setIsLoading(true);
        const response = (await createNewOrder(
          data?.user._id,
          methodPayment,
          serviceShippingId,
          setPopUpMessage
        )) as { createOrder: OrderInterface };

        if (response) {
          await sendPurchasedEmail(
            data?.user?.name,
            response.createOrder._id,
            response.createOrder.address[0].telefone
          );
          console.log(response.createOrder.paymentLink);
          setPaymentLink(response.createOrder.paymentLink);
          setAtivoConfirm(true);
          setIsLoading(false);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log('Erro ao criar novo pedido', error);
      }
    }
  };

  React.useEffect(() => {
    if (ativoConfirm) {
      setTimeout(() => {
        router.push(paymentLink);
      }, 3500);
    }
  }, [ativoConfirm, paymentLink, router]);

  React.useEffect(() => {
    const temporizador = setTimeout(function closeError() {
      setPopUpMessage('');
    }, 5000);

    return () => {
      clearTimeout(temporizador);
    };
  }, [popUpMessage]);

  return (
    <>
      <div>
        <EntregaFinalizar />
        {data && itemsCart?.data && (
          <Finalizarfetchs data={itemsCart?.data} refetch={itemsCart.refetch} />
        )}
        <Envio
          shippingOption={itemsCart.data?.shippingOptions}
          selectDelivery={selectDelivery}
          setPriceDelivery={setPriceDelivery}
          setSelectDelivery={setSelectDelivery}
          setServiceShippingId={setServiceShippingId}
        />
        <TotalFinal
          priceDelivery={priceDelivery}
          cepRefetch={address?.data?.address?.cep ?? ''}
        />
        <Pagamento
          methodPayment={methodPayment}
          setMethodPayment={setMethodPayment}
        />
        <div className={styles.botao_comprar} onClick={onSubmit}>
          <BotaoColorido texto="Comprar" isLoading={isLoading} />
        </div>

        {ativoConfirm && <BackgoundClick />}
        {ativoConfirm && <Confirm />}
      </div>
      {popUpMessage && <PopUpMessage text={popUpMessage} />}
    </>
  );
};

export default FinalizarContainer;
