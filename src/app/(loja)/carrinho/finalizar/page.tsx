import Finalizarfetchs from '@/src/components/loja/finalizar/Finalizar_fetchs';
import styles from './styles.module.css';
import Breadcrumb from '@/src/components/loja/breadcrumb/Breadcrumb';
import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import EntregaFinalizar from '@/src/components/loja/finalizar/entrega/EntregaFinalizar';
import Envio from '@/src/components/loja/finalizar/envio/Envio';
import TotalFinal from '@/src/components/loja/finalizar/total/Total';
import Pagamento from '@/src/components/loja/finalizar/pagamento/Pagamento';
import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';

export default async function FinalizarPage() {
  return (
    <main className={styles.finalizar_container}>
      <Breadcrumb texto1="Carrinho" link1="/carrinho" texto2="Finalizar" />
      <Titulo titulo="Finalizar compra" />
      <EntregaFinalizar />
      <Finalizarfetchs />
      <Envio />
      <TotalFinal />
      <Pagamento />
      <div className={styles.botao_comprar}>
        <BotaoColorido texto="Comprar" />
      </div>
    </main>
  );
}
