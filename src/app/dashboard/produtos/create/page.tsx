import React from 'react';
import styles from './Create.module.css';
import FormCreateProduct from '@/src/components/dashboard/produtosLista/create/FormCreateProduct';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';

const page = () => {
  return (
    <div className={`container_dashboard ${styles.container_create_product}`}>
      <BreadcrumbDashboard />
      <FormCreateProduct />
    </div>
  );
};

export default page;
