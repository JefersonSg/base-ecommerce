import React from 'react';
import { TituloSessao } from '../../textos/TituloSessao';
import { Texto } from '../../textos/Texto';
import { TituloArea } from '../../textos/TituloArea';
import Image from 'next/image';
import styles from './Entrega.module.css';

const EntregaCarrinho = () => {
  return (
    <div className={styles.entrega_container}>
      <TituloSessao titulo="Entrega" />
      <button className={styles.botao_entrega}>
        <Image
          alt="Imagem de caminhão para entrega"
          src={'/carrinho/shipping.svg'}
          width={24}
          height={24}
        />{' '}
        <p>Por correio</p>
      </button>
      <div className={styles.texto1}>
        <Texto texto="Experimente antes de comprar.  Prazo de entrega 2-7 dias " />
      </div>
      <div className={styles.tituloArea}>
        <TituloArea titulo="Onde o pedido deve ser entregue?" />
      </div>
      <Texto texto="Digite o endereço no mapa ou insira os dados" />
      <div className={styles.enderecos_cadastrados}>
        <Image
          alt="Imagem de marcador de mapa"
          src={'/carrinho/pin_map.svg'}
          width={24}
          height={24}
        />
        <span>Endereço cadastrados</span>
      </div>
    </div>
  );
};

export default EntregaCarrinho;
