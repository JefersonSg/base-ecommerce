import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';

const HeaderPedidos = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_pedidos}>
        <div className={styles.info_container}>
          <h3>56</h3>
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
          <h3>12,500</h3>
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
          <h3>197</h3>
          <span>Cancelado</span>
          <div className={styles.imagem}>
            <Image
              alt="Imagem de alerta"
              src={'/dashboard/pedidos/alerta.svg'}
              fill={true}
            />
          </div>
        </div>
        <div className={styles.info_container}>
          <h3>19</h3>
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
