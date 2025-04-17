import React from 'react';
import styles from './styles.module.css';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';
import PedidosFetchDashboard from '@/src/components/dashboard/pedidos/PedidosFetchDashboard';

const page = () => {
  return (
    <div className="dashboard_container">
      <div className={`container_dashboard ${styles.categoria_container}`}>
        <BreadcrumbDashboard />
        <PedidosFetchDashboard />
      </div>
    </div>
  );
};

export default page;
