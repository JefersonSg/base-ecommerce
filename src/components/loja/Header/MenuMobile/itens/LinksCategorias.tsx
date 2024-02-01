import BotaoLi from './BotaoLi';
import styles from './LinksCategorias.module.css';

function LinksCategorias() {
  return (
    <ul className={styles.links}>
      <BotaoLi texto="Loja de R$10" link="10-reais" />
      <BotaoLi texto="Acessórios" link="acessorios" />
      <BotaoLi texto="Base" link="base" />
      <BotaoLi texto="Blush" link="blush" />
      <BotaoLi texto="Bruma" link="bruma" />
      <BotaoLi texto="Colas" link="colas" />
      <BotaoLi texto="Contorno" link="contorno" />
      <BotaoLi texto="Corporal" link="corporal" />
      <BotaoLi texto="Corretivo" link="corretivo" />
      <BotaoLi texto="Cílios Postiços" link="cilios-posticos" />
    </ul>
  );
}

export default LinksCategorias;
