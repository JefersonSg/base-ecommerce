import styles from './InfosLoja.module.css';

function InfosLoja() {
  return (
    <nav className={styles.textos}>
      <ul>
        <li>
          <p className="texto">
            {`"Empresa de responsabilidade limitada ${process.env.NOME_LOJA}, Loja
            virtual de maquiagem"`}
          </p>
        </li>
        <li>
          <p className="texto">© 2025 {process.env.NOME_LOJA}.</p>
        </li>
        <li>
          <p className="texto">CNPJ: 28.773.908/0001-57</p>
        </li>
        <li>
          <p className="texto">© Todos os direitos reservados.</p>
        </li>
      </ul>
    </nav>
  );
}

export default InfosLoja;
