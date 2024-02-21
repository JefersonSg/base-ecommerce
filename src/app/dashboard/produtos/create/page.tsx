import React from 'react';
import styles from './Create.module.css';
import FormCreateProduct from '@/src/components/dashboard/produtos-lista/create/FormCreateProduct';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';

const page = () => {
  return (
    <div className={`container_dashboard ${styles.container_create_product}`}>
      <BreadcrumbDashboard text="Create" />
      <FormCreateProduct />
    </div>
  );
};

export default page;
