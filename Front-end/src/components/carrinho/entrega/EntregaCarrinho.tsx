import React from 'react';
import styles from './Entrega.module.css';
import BotaoRedondo from '../../botoes/BotaoRedondo';
import Enderecos from './Enderecos';

const EntregaCarrinho = () => {
  return (
    <div className={styles.entrega_container}>
      <h2 className={'titulo_sessao'}>Entrega</h2>
      <BotaoRedondo texto="Por correio" img="/carrinho/shipping.svg" />
      <div className={styles.texto1}>
        <p className="texto">
          Experimente antes de comprar. Prazo de entrega 2-7 dias{' '}
        </p>
      </div>
      <div className={styles.tituloArea}>
        <h3 className="titulo_area">Onde o pedido deve ser entregue?</h3>
      </div>
      <p className="texto">Digite o endereço no mapa ou insira os dados</p>
      <Enderecos />
    </div>
  );
};

export default EntregaCarrinho;
