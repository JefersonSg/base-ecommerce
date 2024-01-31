import styles from './Preco.module.css';

function Preco({ texto }: { texto: string }) {
  return (
    <div className={styles.preco}>
      <h2 className={`titulo_sessao`}>{texto}</h2>
    </div>
  );
}

export default Preco;
