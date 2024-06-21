import styles from './styles.module.css';
import FinalizarContainer from '@/src/components/loja/finalizar/Finalizar-container';

export default async function FinalizarPage() {
  return (
    <main className={styles.finalizar_container}>
      <h1 className={styles.titulo_pagina}>MEU CARRINHO</h1>

      <FinalizarContainer />
    </main>
  );
}
