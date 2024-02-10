import React from 'react';
import styles from './Create.module.css';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';
import BodyEditForm from '@/src/components/dashboard/produtosLista/edit/BodyEditForm';

const page = () => {
  return (
    <div className={`container_dashboard ${styles.container_create_product}`}>
      <BreadcrumbDashboard />
      <BodyEditForm />
    </div>
  );
};

export default page;
