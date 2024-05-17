import Link from 'next/link';
import PendingAnimantionLottie from '@/src/components/lottie/PendingAnimantion';
import styles from '../styles.module.css';

export default async function PendentePage() {
  return (
    <main className={styles.container_message}>
      <div className={styles.message}>
        <h1>
          Seu pagamento está pendente, estamos processando o seu pagamento
        </h1>
        <PendingAnimantionLottie />
        <Link href={'/minha-conta/pedidos'}>ir para Meus Pedidos</Link>
      </div>
    </main>
  );
}
