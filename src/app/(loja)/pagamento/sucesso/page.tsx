import ConfirmLottie from '@/src/components/lottie/Confirm';
import Link from 'next/link';
import styles from '../styles.module.css';

export default async function SucessoPage() {
  return (
    <main className={styles.container_message}>
      <div className={styles.message}>
        <h1>Seu pedido foi confirmado com sucesso</h1>
        <ConfirmLottie />
        <Link href={'/minha-conta/pedidos'}>ir para Meus Pedidos</Link>
      </div>
    </main>
  );
}
