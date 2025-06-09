import styles from './Botoes.module.css';
import { Botao } from './Botao';
import { TituloFooter } from '../infos/TituloFooter';

export function Botoes() {
  return (
    <nav className={styles.nav_botoes}>
      <ul className={styles.botoes}>
        <TituloFooter
          titulo={'Perguntas frequentes'}
          ativo={false}
          seta={false}
        />
        <Botao img="entrega" text="Envio" link="/minha-conta/pedidos" />
        <Botao
          img="devolucao"
          text="Trocas e Devoluções"
          link="/pagina/trocas-e-devolucoes"
        />
        <Botao img="email" text="Email" type="email" />
      </ul>
    </nav>
  );
}
