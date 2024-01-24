import styles from './InfosLoja.module.css';

function InfosLoja() {
  return (
    <nav className={styles.textos}>
      <ul>
        <li>
          <p className="texto">
            Empresa de responsabilidade limitada Abayomi Make Beauty, Loja
            virtual de maquiagem
          </p>
        </li>
        <li>
          <p className="texto">© 2024 Abayomi Make Beauty.</p>
        </li>
        <li>
          <p className="texto">CNPJ: 53.341.788/0001-66</p>
        </li>
        <li>
          <p className="texto">Todos os direitos reservados.</p>
        </li>
      </ul>
    </nav>
  );
}

export default InfosLoja;
