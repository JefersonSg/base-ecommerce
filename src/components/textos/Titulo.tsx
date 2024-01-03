import styles from './Titulo.module.css';

export function Titulo(texto: string) {
  return (
    <>
      <h1 className={styles.titulo}>{texto}</h1>
    </>
  );
}
