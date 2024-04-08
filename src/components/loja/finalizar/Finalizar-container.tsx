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
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import { getUserByToken } from '@/src/shared/api/GETS';
import { createNewOrder } from '@/src/shared/api/CREATE';
import Confirm from './confirmation/Confirm';
import BackgoundClick from '../../compartilhado/backgrounds/BackgoundClick';
import { useRouter } from 'next/navigation';

const FinalizarContainer = () => {
  const [selectPayment, setSelectPayment] = React.useState('card');
  const token = Cookies.get('auth_token');
  const { data } = useQuery<UserInterface>({
    queryKey: ['user'],
    queryFn: async () => {
      return (await getUserByToken(token)) as UserInterface;
    }
  });
  const [ativoConfirm, setAtivoConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (data && !isLoading) {
      try {
        setIsLoading(true);
        const response = await createNewOrder(data?.user._id, selectPayment);

        if (response) {
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
        router.push('/minha-conta/pedidos');
      }, 3000);
    }
  }, [ativoConfirm, router]);
  return (
    <div>
      <EntregaFinalizar />
      {data && <Finalizarfetchs userData={data} />}
      <Envio />
      <TotalFinal />
      <Pagamento
        selectPayment={selectPayment}
        setSelectPayment={setSelectPayment}
      />
      <div className={styles.botao_comprar} onClick={onSubmit}>
        <BotaoColorido texto="Comprar" isLoading={isLoading} />
      </div>

      {ativoConfirm && <BackgoundClick />}
      {ativoConfirm && <Confirm />}
    </div>
  );
};

export default FinalizarContainer;
