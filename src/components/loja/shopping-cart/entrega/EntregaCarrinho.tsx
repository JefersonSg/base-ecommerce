import React from 'react';
import styles from './Entrega.module.css';
import Enderecos from './Enderecos';

const EntregaCarrinho = () => {
  return (
    <div className={styles.entrega_container}>
      <h2 className={'titulo_sessao'}>Endereço de entrega</h2>

      <div className={styles.tituloArea}>
        <h3 className="titulo_area">Onde o pedido deve ser entregue?</h3>
      </div>
      <Enderecos />
    </div>
  );
};

export default EntregaCarrinho;
