import styles from './Porcentagem.module.css';

function Porcentagens({
  estrelas,
  porcentagem
}: {
  estrelas: number;
  porcentagem?: number;
}) {
  return (
    <div className={styles.porcentagem}>
      <span className={styles.numeroEstrela}>{estrelas}</span>
      <div className={styles.porcentagemBarraContent}>
        <span
          className={styles.porcentagemBarra}
          style={{ width: `${porcentagem ?? 0}%` }}
        ></span>
      </div>
      <span className={styles.porcentagemNumero}>{porcentagem ?? 0}%</span>
    </div>
  );
}

export default Porcentagens;
