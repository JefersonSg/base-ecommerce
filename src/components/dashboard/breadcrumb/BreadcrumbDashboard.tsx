'use client';

import React from 'react';
import styles from './Breadcrumb.module.css';
import { usePathname } from 'next/navigation';

const BreadcrumbDashboard = () => {
  const url = usePathname();

  const texto = url?.split('/');

  return (
    <div className={styles.breadcrumb}>
      <p>
        eCommerce /
        <span>
          {texto[2] ? ` ${texto[2]}` : ''}
          {texto[3] ? ` / ${texto[3]}` : ''}
        </span>
      </p>
    </div>
  );
};

export default BreadcrumbDashboard;
