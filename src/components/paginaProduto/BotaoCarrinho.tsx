import Image from 'next/image';
import styles from './BotaoCarrinho.module.css';

function BotaoCarrinho() {
  return (
    <button className={styles.botaoCarrinho}>
      <Image
        alt="Imagem de carrinho"
        src={'/produto/carrinho.svg'}
        width={23}
        height={24}
      />
      Adicionar ao carrinho
    </button>
  );
}

export default BotaoCarrinho;
