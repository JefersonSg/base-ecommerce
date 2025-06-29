'use client';

import React from 'react';
import styles from './PopupInfos.module.css';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import Image from 'next/image';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import Link from 'next/link';
import {
  cancelOrder,
  concludedOrder,
  confirmOrder,
  dispatchedOrder,
  reversalOrder
} from '@/src/shared/api/UPDATES';

const PopupInfos = ({
  imageUser,
  setAtivoPopUp,
  data,
  refetchData
}: {
  imageUser: string;
  setAtivoPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  data: OrderInterface;
  refetchData: any;
}) => {
  const [dataTime, setDataTime] = React.useState('');
  const [confirmCancel, setConfirmCancel] = React.useState(false);
  const [confirmOrderState, setConfirmOrder] = React.useState(false);
  const [confirmDispatched, setConfirmDispatched] = React.useState(false);
  const [confirmConcluded, setConfirmConcluded] = React.useState(false);
  const [confirmEstorno, setConfirmEstorno] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [orderTracking, setOrderTracking] = React.useState('');

  React.useEffect(() => {
    const timestamp = data.createdAt;
    const newData = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };

    const dataFormatada = newData.toLocaleString('pt-BR', options);

    setDataTime(dataFormatada);
  }, [data]);

  const confirmOrderNow = async () => {
    setIsLoading(true);
    try {
      if (isLoading) {
        const response = await confirmOrder(data._id);

        if (response) {
          await refetchData();
          setAtivoPopUp(false);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Erro ao confirmar o pedido', error);
    }
  };
  const dispatchOrderNow = async () => {
    try {
      if (orderTracking) {
        const response = await dispatchedOrder(data._id, orderTracking);

        if (response) {
          await refetchData();
          setAtivoPopUp(false);
        }
      }
    } catch (error) {
      console.log('Erro atualizar o pedido', error);
    }
  };
  const reversalOrderNow = async () => {
    try {
      if (confirmEstorno) {
        const response = await reversalOrder(data._id);

        if (response) {
          await refetchData();
          setAtivoPopUp(false);
        }
      }
    } catch (error) {
      console.log('Erro atualizar o pedido', error);
    }
  };
  const cancelOrderNow = async () => {
    try {
      if (confirmCancel) {
        const response = await cancelOrder(data._id);

        if (response) {
          await refetchData();
          setAtivoPopUp(false);
        }
      }
    } catch (error) {
      console.log('Erro ao cancelar o pedido', error);
    }
  };
  const concludedOrderNow = async () => {
    try {
      const response = await concludedOrder(data._id);

      if (response) {
        await refetchData();
        setAtivoPopUp(false);
      }
    } catch (error) {
      console.log('Erro ao concluir o pedido', error);
    }
  };

  return (
    <div className={styles.PopupInfos}>
      <h1>Detalhes do pedido</h1>
      <div className={styles.id_pedido}>
        <p>Id do pedido:</p>
        <Link href={`/dashboard/pedidos/${data._id}`}>#{data._id}</Link>
      </div>
      <div>
        <p>Data:</p>
        <span className={`${styles.data_pedido} ${styles.texto_estilo_2}`}>
          {dataTime}
        </span>
      </div>
      <div>
        <p>Cliente:</p>
        <div className={styles.cliente_pedido}>
          <div className={styles.imagemPerfil}>
            <Image
              alt="Foto de perfil do clente"
              src={`${imageUser ?? '/profile/profile.svg'}`}
              fill={true}
              unoptimized
            />
          </div>
          <div>
            <p className={`${styles.name} ${styles.texto_estilo_1}`}>
              {data?.address?.[0]?.nome}
            </p>
            <p className={`${styles.email} ${styles.texto_estilo_2}`}>
              {data?.address?.[0]?.email}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p>Pagamento:</p>
        <div
          className={`${styles.status_pagamento_pedido} ${styles[data.status]}
             ${styles.texto_estilo_1} `}
        >
          <div className={styles.status_pagamento}>
            <span className={`${styles.bolinha} ${styles[data.status]}`}></span>
            <p className={`${styles[data.status]}`}>
              {data.status === 'pendente'
                ? 'Pendente'
                : data.status === 'cancelado'
                  ? 'Cancelado'
                  : 'Confirmado'}
            </p>
          </div>
        </div>
      </div>
      <div className={`${styles.valor_pedido} `}>
        <p>Valor do pedido: </p>
        <span>R$ {convertNumberInReal(data?.totalPayment)}</span>
      </div>
      <div>
        <p>Status:</p>
        <div className={`${styles.status_pedido} ${styles[data.status]}`}>
          {data.status}
        </div>
      </div>
      <div>
        <p>Metodo:</p>
        <span className={styles.metodo_pagamento_pedido}>
          {data.methodPayment}
        </span>
      </div>
      <div className={styles.botoes_atividade}>
        <Link href={`/dashboard/pedidos/${data._id}`}>
          <button>Ver mais</button>
        </Link>

        {data.status !== 'cancelado' && (
          <>
            {data.status === 'pendente' && (
              <button
                className={styles.botao_confirm}
                onClick={() => {
                  setConfirmOrder(true);
                  setConfirmDispatched(false);
                  setConfirmCancel(false);
                  setConfirmConcluded(false);
                  setConfirmEstorno(false);
                }}
              >
                Aceitar pedido
              </button>
            )}

            {data.status === 'confirmado' && (
              <button
                className={styles.botao_enviado}
                onClick={() => {
                  setConfirmDispatched(true);
                  setConfirmCancel(false);
                  setConfirmConcluded(false);
                  setConfirmOrder(false);
                  setConfirmEstorno(false);
                }}
              >
                Pedido enviado
              </button>
            )}
            {data.status === 'confirmado' || data.status === 'enviado' ? (
              <button
                className={styles.botao_concluido}
                onClick={() => {
                  setConfirmConcluded(true);
                  setConfirmDispatched(false);
                  setConfirmCancel(false);
                  setConfirmOrder(false);
                  setConfirmEstorno(false);
                }}
              >
                Pedido Entregue / Concluido
              </button>
            ) : (
              ''
            )}
            {data.status !== 'concluido' && data.status !== 'enviado' && (
              <button
                className={styles.botao_cancel}
                onClick={() => {
                  setConfirmCancel(true);
                  setConfirmDispatched(false);
                  setConfirmConcluded(false);
                  setConfirmOrder(false);
                }}
              >
                Cancelar Pedido
              </button>
            )}
            {data.status === 'enviado' || data.status === 'concluido' ? (
              <button
                className={styles.botao_devolucao}
                onClick={() => {
                  setConfirmEstorno(true);
                  setConfirmCancel(false);
                  setConfirmDispatched(false);
                  setConfirmConcluded(false);
                  setConfirmOrder(false);
                }}
              >
                Estornar Pedido
              </button>
            ) : (
              ''
            )}
          </>
        )}
      </div>
      {confirmCancel && (
        <div className={styles.confirm_cancelar}>
          <p>Deseja cancelar o pedido?</p>
          <div className={styles.buttons_confirm}>
            <button
              onClick={() => {
                setConfirmCancel(false);
              }}
            >
              Não
            </button>
            <button
              onClick={() => {
                void cancelOrderNow();
              }}
            >
              Sim
            </button>
          </div>
        </div>
      )}
      {confirmDispatched && (
        <div>
          <div className={styles.input_rastreio}>
            <label htmlFor="codigo">Código de rastreio</label>
            <input
              value={orderTracking}
              onChange={(e) => {
                setOrderTracking(e?.target?.value);
              }}
              name="codigo"
              placeholder="Codigo de rastreio"
            />
          </div>
          <button
            onClick={() => {
              void dispatchOrderNow();
            }}
          >
            Salvar
          </button>
        </div>
      )}
      {confirmOrderState && (
        <div className={styles.confirm_cancelar}>
          <p>Deseja aceitar o pedido?</p>
          <div className={styles.buttons_confirm}>
            <button
              onClick={() => {
                setConfirmOrder(false);
              }}
            >
              Não
            </button>
            <button
              onClick={() => {
                void confirmOrderNow();
              }}
            >
              Sim
            </button>
          </div>
        </div>
      )}
      {confirmConcluded && (
        <div className={styles.confirm_cancelar}>
          <p>O pedido ja foi realmente entregue / concluído ?</p>
          <div className={styles.buttons_confirm}>
            <button
              onClick={() => {
                setConfirmConcluded(false);
              }}
            >
              Não
            </button>
            <button
              onClick={() => {
                void concludedOrderNow();
              }}
            >
              Sim
            </button>
          </div>
        </div>
      )}
      {confirmEstorno && (
        <div className={styles.confirm_cancelar}>
          <p>Deseja confirmar a devolução do pedido?</p>
          <div className={styles.buttons_confirm}>
            <button
              onClick={() => {
                setConfirmEstorno(false);
              }}
            >
              Não
            </button>
            <button
              onClick={() => {
                void reversalOrderNow();
              }}
            >
              Sim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupInfos;
