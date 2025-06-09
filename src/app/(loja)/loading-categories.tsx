import styles from './loading.module.css';

export default function LoadingCategories() {
  return (
    <div className={styles.home_container}>
      {/* <h2 className={'titulo_sessao'}>Categorias</h2> */}
      <div className={styles.categorias}>
        <span>
          <p className={styles.text}></p>
        </span>
        <span>
          <p className={styles.text}></p>
        </span>
        <span>
          <p className={styles.text}></p>
        </span>
        <span>
          <p className={styles.text}></p>
        </span>
        <span>
          <p className={styles.text}></p>
        </span>
      </div>
    </div>
  );
}
