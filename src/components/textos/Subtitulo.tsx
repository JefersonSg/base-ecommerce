import styles from './Subtitulo.module.css';

export function Subtitulo(texto: string) {
  return (
    <>
      <h1 className={styles.subtitulo}>{texto}</h1>
    </>
  );
}
