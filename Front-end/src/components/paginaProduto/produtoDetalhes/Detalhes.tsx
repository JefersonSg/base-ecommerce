import BotaoColorido from '../../botoes/BotaoColorido';
import Cores from './Cores';
import styles from './Detalhes.module.css';
import Preco from './Preco';
import Tamanhos from './Tamanhos';

function Detalhes() {
  return (
    <div className={styles.detalhes}>
      <div className={styles.informacoes}>
        <Cores />
        <Tamanhos />
      </div>
      <Preco texto="R$ 79,99" />
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
