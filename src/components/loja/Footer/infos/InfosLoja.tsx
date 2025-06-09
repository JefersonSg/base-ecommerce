import styles from './InfosLoja.module.css';

function InfosLoja() {
  return (
    <nav className={styles.textos}>
      <ul>
        <li>
          <p className="texto">
            © 2025 - {process.env.NOME_LOJA} LTDA | CNPJ: 28.773.908/0001-57
            <br />© Todos os direitos reservados.
          </p>
        </li>
      </ul>
    </nav>
  );
}

export default InfosLoja;
