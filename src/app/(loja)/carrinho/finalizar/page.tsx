import Finalizarfetchs from '@/src/components/loja/finalizar/Finalizar_fetchs';
import styles from './styles.module.css';

export default async function FinalizarPage() {
  return (
    <main className={styles.finalizar_container}>
      <h1>Finalizar</h1>
      <Finalizarfetchs />
    </main>
  );
}
