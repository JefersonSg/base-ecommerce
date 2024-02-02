import React from 'react';
import styles from './styles.module.css';
import DataTable from '@/src/components/dashboard/categorias/table/DataTable';

const page = () => {
  return (
    <div className={styles.categoria_container}>
      <DataTable />
    </div>
  );
};

export default page;
