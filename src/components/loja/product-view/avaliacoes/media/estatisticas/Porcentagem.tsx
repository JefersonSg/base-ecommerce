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
      <span className={styles.numero_estrelas}>{estrelas}</span>
      <div className={styles.porcentagem_barra_content}>
        <span
          className={styles.porcentagem_barra}
          style={{ width: `${porcentagem ?? 0}%` }}
        ></span>
      </div>
      <span className={styles.porcentagem_numero}>
        {porcentagem?.toFixed(0) ?? 0}%
      </span>
    </div>
  );
}

export default Porcentagens;
