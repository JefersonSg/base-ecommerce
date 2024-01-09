import BotaoLi from './BotaoLi';
import styles from './UlLinksUteis.module.css';

function UlLinksUteis() {
  return (
    <ul className={styles.linksUteis}>
      <BotaoLi texto="Atendimento" image="chat" />
      <BotaoLi texto="Rastrear pedido" image="caminhao" />
      <BotaoLi texto="Meus Pedidos" image="caixa" />
      <BotaoLi texto="Minha conta" image="usuario" />
    </ul>
  );
}

export default UlLinksUteis;
