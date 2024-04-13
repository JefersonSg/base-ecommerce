import React from 'react';
import styles from './styles.module.css';
import DataTable from '@/src/components/dashboard/subcategorias/table/DataTable';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';

const page = () => {
  return (
    <main className="dashboard_container">
      <div className={`container_dashboard ${styles.categoria_container}`}>
        <BreadcrumbDashboard />
        <DataTable />
      </div>
    </main>
  );
};

export default page;
