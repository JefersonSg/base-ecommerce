import styles from './Breadcrumb.module.css';

function Breadcrumb({ texto }: { texto: string }) {
  return <span className={styles.breadcrumb}>{texto}</span>;
}

export default Breadcrumb;
