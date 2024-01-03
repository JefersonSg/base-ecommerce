import styles from './TituloCarrinho.module.css';

export function TituloCarrinho(texto: string) {
  return (
    <>
      <h1 className={styles.tituloCarrinho}>{texto}</h1>
    </>
  );
}
