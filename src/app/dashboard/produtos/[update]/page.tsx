import React from 'react';
import styles from './Create.module.css';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';
import BodyEditForm from '@/src/components/dashboard/produtosLista/update/BodyEditForm';

const page = () => {
  return (
    <div className={`container_dashboard ${styles.container_create_product}`}>
      <BreadcrumbDashboard text="Update" />
      <BodyEditForm />
    </div>
  );
};

export default page;
