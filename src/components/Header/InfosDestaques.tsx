import styles from './InfosDestaques.module.css';

export function InfosDestaques() {
  return (
    <>
      <div className={styles.infos}>
        <p className={styles.texto}>
          Parcele suas compras em até <span>10x sem juros!</span>
        </p>
      </div>
    </>
  );
}
