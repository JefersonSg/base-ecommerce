import styles from './styles.module.css';
import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import FinalizarContainer from '@/src/components/loja/finalizar/Finalizar-container';

export default async function FinalizarPage() {
  return (
    <main className={styles.finalizar_container}>
      <Breadcrumb texto1="Carrinho" link1="/carrinho" texto2="Finalizar" />
      <Titulo titulo="Finalizar compra" />
      <FinalizarContainer />
    </main>
  );
}
