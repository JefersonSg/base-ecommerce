import styles from './styles.module.css';
import FinalizarContainer from '@/src/components/loja/finalizar/Finalizar-container';

export default async function FinalizarPage() {
  return (
    <main className={styles.finalizar_container}>
      <FinalizarContainer />
    </main>
  );
}
