import React from 'react';
import styles from './status.module.css';

export const StatusPedido = ({ status }: { status: string }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    switch (status) {
      case 'pendente':
        setProgress(0);
        break;
      case 'confirmado':
        setProgress(1);
        break;
      case 'enviado':
        setProgress(2);
        break;
      case 'concluido':
        setProgress(3);
        break;
      case 'cancelado':
      case 'devolvido':
        setProgress(4);
        break;
      default:
        setProgress(0);
    }
  }, [status]);
  return (
    <div className={styles.status_pedido}>
      <h3>STATUS DO PEDIDO</h3>
      <div
        className={`${styles.progresso} ${
          progress === 0
            ? styles.noConfirm
            : progress === 1
              ? styles.progress1
              : progress === 2
                ? styles.progress2
                : progress === 3
                  ? styles.progress3
                  : styles.canceled
        }`}
      >
        <span className={styles.barra_progresso}></span>
        <p className={styles.pendente}>Pedido Pendente</p>
        <p className={styles.confirmado}>Pedido Confirmado</p>
        <p className={styles.separado}>Pedido em separação</p>
        <p className={styles.enviado}>Enviando pedido</p>
        <p className={styles.entregue}>Pedido entregue</p>
      </div>
    </div>
  );
};
