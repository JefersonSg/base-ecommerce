import BotaoCarrinho from '../BotaoCarrinho';
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
      <BotaoCarrinho />
    </div>
  );
}

export default Detalhes;
