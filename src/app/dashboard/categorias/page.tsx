import React from 'react';
import styles from './styles.module.css';
import DataTable from '@/src/components/dashboard/categorias/table/DataTable';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';

const page = () => {
  return (
    <div className={styles.categoria_container}>
      <BreadcrumbDashboard />
      <DataTable />
    </div>
  );
};

export default page;
