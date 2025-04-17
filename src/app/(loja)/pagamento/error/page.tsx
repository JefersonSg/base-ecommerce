import ErrorConfirmLottie from '@/src/components/lottie/ErroConfirm';
import Link from 'next/link';
import styles from '../styles.module.css';

export default async function ErrorPage() {
  return (
    <main className={styles.container_message}>
      <div className={styles.message}>
        <h1>Ocorreu um erro ao processar o seu pagamento</h1>
        <ErrorConfirmLottie />
        <Link href={'/minha-conta/pedidos'}>ir para Meus Pedidos</Link>
      </div>
    </main>
  );
}
