import React from 'react';
import { TituloSessao } from '../../textos/TituloSessao';
import { Texto } from '../../textos/Texto';
import { TituloArea } from '../../textos/TituloArea';
import styles from './Entrega.module.css';
import BotaoRedondo from '../../botoes/BotaoRedondo';
import Enderecos from './Enderecos';

const EntregaCarrinho = () => {
  return (
    <div className={styles.entrega_container}>
      <TituloSessao titulo="Entrega" />
      <BotaoRedondo texto="Por correio" img="/carrinho/shipping.svg" />
      <div className={styles.texto1}>
        <Texto texto="Experimente antes de comprar.  Prazo de entrega 2-7 dias " />
      </div>
      <div className={styles.tituloArea}>
        <TituloArea titulo="Onde o pedido deve ser entregue?" />
      </div>
      <Texto texto="Digite o endereço no mapa ou insira os dados" />
      <Enderecos />
    </div>
  );
};

export default EntregaCarrinho;
