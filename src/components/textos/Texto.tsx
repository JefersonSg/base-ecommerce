import styles from './Texto.module.css';

export function Texto(texto: string) {
  return (
    <>
      <h1 className={styles.texto}>{texto}</h1>
    </>
  );
}
