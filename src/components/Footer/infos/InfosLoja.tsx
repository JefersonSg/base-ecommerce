import { Texto } from '../../textos/Texto';
import styles from './InfosLoja.module.css';

function InfosLoja() {
  return (
    <nav className={styles.textos}>
      <ul>
        <li>
          <Texto
            texto='"Empresa de responsabilidade limitada 
            Abayomi Make Beauty, Loja virtual de maquiagem"'
          />
        </li>
        <li>
          <Texto texto="© 2024  Abayomi Make Beauty." />
        </li>
        <li>
          <Texto texto="CNPJ: 53.341.788/0001-66" />
        </li>
        <li>
          <Texto texto="Todos os direitos reservados." />
        </li>
      </ul>
    </nav>
  );
}

export default InfosLoja;
