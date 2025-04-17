'use client';

import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';

interface estatistic {
  _id: string;
  count: number;
}

const HeaderPedidos = ({
  data
}: {
  data: {
    estatisticas: estatistic[];
  };
}) => {
  const [totalPendentes, setTotalPendentes] = React.useState(0);
  const [totalConcluidos, setTotalConcluidos] = React.useState(0);
  const [totalCancelados, setTotalCancelados] = React.useState(0);
  const [totalDevolvidos, setTotalDevolvidos] = React.useState(0);

  React.useEffect(() => {
    for (let i = 0; i < data?.estatisticas?.length; i++) {
      const estatistica = data.estatisticas[i];

      if (estatistica._id === 'pendente') {
        setTotalPendentes(estatistica.count);
      }
      if (estatistica._id === 'confirmado') {
        setTotalConcluidos(estatistica.count);
      }
      if (estatistica._id === 'cancelado') {
        setTotalCancelados(estatistica.count);
      }
      if (estatistica._id === 'devolvido') {
        setTotalDevolvidos(estatistica.count);
      }
    }
  }, [data]);
  return (
    <div className={styles.header_container}>
      <div className={styles.header_pedidos}>
        <div className={styles.info_container}>
          <h3>{totalPendentes}</h3>
          <span>Pagamento pendente</span>
          <div className={styles.imagem}>
            <Image
              alt="Imagem de calendário"
              src={'/dashboard/pedidos/calendario.svg'}
              fill={true}
            />
          </div>
        </div>

        <div className={styles.info_container}>
          <h3>{totalConcluidos}</h3>
          <span>Concluido</span>
          <div className={styles.imagem}>
            <Image
              alt="Imagem double check"
              src={'/dashboard/pedidos/double-check.svg'}
              fill={true}
            />
          </div>
        </div>

        <div className={styles.info_container}>
          <h3>{totalCancelados}</h3>
          <span>Cancelado</span>
          <div className={styles.imagem}>
            <Image
              alt="Imagem de alerta"
              src={'/dashboard/pedidos/alert.svg'}
              fill={true}
            />
          </div>
        </div>
        <div className={styles.info_container}>
          <h3>{totalDevolvidos}</h3>
          <span>Devolvidos</span>
          <div className={styles.imagem}>
            <Image
              alt="Imagem de uma carteira"
              src={'/dashboard/pedidos/carteira.svg'}
              fill={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPedidos;
