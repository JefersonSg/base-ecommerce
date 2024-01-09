import styles from './Botoes.module.css';
import { Botao } from './Botao';

export function Botoes() {
  return (
    <>
      <ul className={styles.botoes}>
        <Botao img="entrega" text="Entrega" />
        <Botao img="telefone" text="(21) 969871826" type="telefone" />
        <Botao img="devolucao" text="Devolução" />
        <Botao img="email" text="Email" type="email" />
      </ul>
    </>
  );
}
