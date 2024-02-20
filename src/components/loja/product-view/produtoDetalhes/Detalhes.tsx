'use client';

import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Cores from './Cores';
import styles from './Detalhes.module.css';
import Preco from './Preco';
import Tamanhos from './Tamanhos';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

function Detalhes({ data }: { data: ProductApi }) {
  return (
    <div className={styles.detalhes}>
      <div className={styles.informacoes}>
        <Cores colors={data?.colors} codeColors={data?.codeColors} />
        <Tamanhos size={data?.size} />
      </div>
      <Preco
        texto={`R$ ${data?.price.toFixed(2).toString().replace('.', ',')}`}
      />
      <div className={styles.botao_carrinho}>
        <BotaoColorido
          texto="Adicionar ao carrinho"
          img="carrinho.svg"
          alt="Imagem do carrinho"
        />
      </div>
    </div>
  );
}

export default Detalhes;
