'use client';
import { type OrderInterface } from '@/src/shared/helpers/interfaces';
import React from 'react';
import PedidoCard from './item/Pedido-card';
import styles from './pedido-container.module.css';
import PopupInfos from './item/PopupInfos';
import BackgoundClick from '../../compartilhado/backgrounds/BackgoundClick';

const PedidosContainer = ({
  data,
  refetchData
}: {
  data: { pedidos: OrderInterface[] };
  refetchData: any;
}) => {
  const [ativoPopUp, setAtivoPopUp] = React.useState(false);
  const [infosPopUp, setInfosPopUp] = React.useState<OrderInterface>();
  const [imageUser, setImageUser] = React.useState<string>('');
  return (
    <>
      <table className={styles.tabela_pedidos}>
        <thead className={styles.topo_tabela}>
          <tr>
            <th className={styles.ver_mais}></th>
            <th className={styles.id}>ID</th>
            <th className={styles.data}>DATA</th>
            <th className={styles.clientes}>CLIENTES</th>
            <th className={styles.pagamento}>PAGAMENTO</th>
            <th className={styles.valor}>VALOR</th>
            <th className={styles.status}>STATUS</th>
            <th className={styles.metodo}>MÉTODO</th>
          </tr>
        </thead>
        <tbody>
          {data?.pedidos?.map((item) => {
            return (
              <PedidoCard
                key={item._id}
                orderData={item}
                setAtivoPopUp={setAtivoPopUp}
                setInfosPopUp={setInfosPopUp}
                setImageUser={setImageUser}
              />
            );
          })}
        </tbody>
      </table>
      {ativoPopUp && <BackgoundClick setState1={setAtivoPopUp} />}
      {ativoPopUp && infosPopUp && (
        <PopupInfos
          setAtivoPopUp={setAtivoPopUp}
          data={infosPopUp}
          imageUser={imageUser}
          refetchData={refetchData}
        />
      )}
    </>
  );
};

export default PedidosContainer;
