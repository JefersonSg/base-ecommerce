import styles from './Botoes.module.css';
import { Botao } from './Botao';

export function Botoes() {
  return (
    <>
      <ul className={styles.botoes}>
        <Botao img="entrega" text="Entrega" link="minhas-entregas" />
        <Botao img="telefone" text="(21) 969871826" type="telefone" />
        <Botao
          img="devolucao"
          text="Trocas e Devoluções"
          link="/pagina/trocas-e-devolucoes"
        />
        <Botao img="email" text="Email" type="email" />
      </ul>
    </>
  );
}
