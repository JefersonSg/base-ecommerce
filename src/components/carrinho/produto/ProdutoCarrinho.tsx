'use client';

import React from 'react';
import styles from './ProdutoCarrinho.module.css';
import Image from 'next/image';
import BotaoQuantidade from '../quantidade/BotaoQuantidade';

interface produto {
  nome: string;
  cor: string;
  tamanho: string;
  valor: number;
  img?: string;
}

const ProdutoCarrinho = ({ nome, cor, tamanho, valor, img }: produto) => {
  const [contador, setContador] = React.useState(1);

  return (
    <div className={styles.produto_Carrinho}>
      <div className={styles.informacoes_produto}>
        <Image
          alt="Imagem do produto"
          src={`${img ? '/produto/' + img : '/produto/produto1.png'}`}
          width={104}
          height={135}
        />
        <div className={styles.informacoes}>
          <span className={styles.titulo}>{nome}</span>
          <p>
            <span>Cor: </span> {cor}
          </p>
          <p>
            <span>Tamanho: </span> {tamanho}
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
        <p className={styles.valor}>R$ {(valor * contador).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProdutoCarrinho;
