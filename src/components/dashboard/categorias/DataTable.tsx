import React from 'react';
import styles from './DataTable.module.css';
import TopTable from './TopTable';

const DataTable = () => {
  return (
    <div className={styles.data_table}>
      <TopTable />
    </div>
  );
};

export default DataTable;
