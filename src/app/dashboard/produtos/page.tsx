import React from 'react';
import styles from './styles.module.css';
import DataTable from '@/src/components/dashboard/produtos-lista/table/DataTable';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';

const page = () => {
  return (
    <div className={`container_dashboard ${styles.categoria_container}`}>
      <BreadcrumbDashboard />
      <DataTable />
    </div>
  );
};

export default page;
