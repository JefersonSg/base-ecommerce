import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';
import PedidoDetalhesContainer from '@/src/components/dashboard/pedidos/detalhes/Pedido-detalhes-container';

export default async function Page(query: { params: { id: string } }) {
  return (
    <main className="dashboard_container">
      <div className={`container_dashboard`}>
        <BreadcrumbDashboard text="Detalhe" />
        <PedidoDetalhesContainer orderId={query?.params?.id} />
      </div>
    </main>
  );
}
