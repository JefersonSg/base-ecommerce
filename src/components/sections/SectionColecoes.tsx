import styles from './SectionColecoes.module.css';
import { TituloSessao } from '../textos/TituloSessao';
import Colecao from './Colecao';
import BotaoSessao from '../botoes/BotaoSessao';

function SectionColecoes() {
  return (
    <div className={styles.container}>
      <TituloSessao titulo="Novas coleções" />
      <div className={styles.colecoes}>
        <Colecao nome="Acessórios" img="acessorios" />
        <Colecao nome="Maquiagens" img="maquiagem" />
        <Colecao nome="Itens para banho" img="banho" />
      </div>
      <BotaoSessao texto="Todas as coleções" />
    </div>
  );
}

export default SectionColecoes;
