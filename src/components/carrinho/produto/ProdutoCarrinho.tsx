'use client';

import React from 'react';
import styles from './ProdutoCarrinho.module.css';
import Image from 'next/image';
import BotaoQuantidade from '../quantidade/BotaoQuantidade';

interface produto {
  nome: string;
  cor: string;
  tamanho: string;
}

const ProdutoCarrinho = () => {
  const [contador, setContador] = React.useState(1);

  return (
    <div className={styles.produto_Carrinho}>
      <div className={styles.informacoes_produto}>
        <Image
          alt="Imagem do produto"
          src={'/produto/produto1.png'}
          width={104}
          height={135}
        />
        <div className={styles.informacoes}>
          <span className={styles.titulo}>Agua micelar</span>
          <p>
            <span>Cor: </span> Branco
          </p>
          <p>
            <span>Tamanho: </span> 300ml
          </p>
          <p>
            <span>Quantidade: </span> {contador}
          </p>
        </div>
        <Image
          className={styles.lixeira}
          alt="lixeira"
          src={'/carrinho/lixeira.svg'}
          width={19}
          height={21}
        />
      </div>
      <div className={styles.quantidade}>
        <BotaoQuantidade contador={contador} setContador={setContador} />
        <p className={styles.valor}>R$ {(100 * contador).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProdutoCarrinho;
