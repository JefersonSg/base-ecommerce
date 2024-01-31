import BotaoLi from './BotaoLi';
import styles from './LinksCategorias.module.css';

function LinksCategorias() {
  return (
    <ul className={styles.links}>
      <BotaoLi texto="Loja de R$10" />
      <BotaoLi texto="Acessórios" />
      <BotaoLi texto="Base" />
      <BotaoLi texto="Blush" />
      <BotaoLi texto="Bruma" />
      <BotaoLi texto="Cabelos" />
      <BotaoLi texto="Colas" />
      <BotaoLi texto="Contorno" />
      <BotaoLi texto="Corporal" />
      <BotaoLi texto="Corretivo" />
      <BotaoLi texto="Cílios Postiços" />
    </ul>
  );
}

export default LinksCategorias;
