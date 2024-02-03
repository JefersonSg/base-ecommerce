import React from 'react';
import styles from './styles.module.css';
import BreadcrumbDashboard from '@/src/components/dashboard/breadcrumb/BreadcrumbDashboard';

const page = () => {
  return (
    <div className={`container_dashboard ${styles.categoria_container}`}>
      <BreadcrumbDashboard />
    </div>
  );
};

export default page;
