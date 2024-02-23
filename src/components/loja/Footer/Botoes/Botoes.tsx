import styles from './Botoes.module.css';
import { Botao } from './Botao';

export function Botoes() {
  return (
    <>
      <ul className={styles.botoes}>
        <Botao img="entrega" text="Envios" link="minhas-entregas" />
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
