'use client';

import React from 'react';
import styles from './Breadcrumb.module.css';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const BreadcrumbDashboard = ({ text }: { text?: string }) => {
  const url = usePathname();
  const router = useRouter();

  const texto = url?.split('/');

  return (
    <div className={styles.breadcrumb}>
      <Link href={'/dashboard'} className={styles.first_texto}>
        eCommerce /
      </Link>
      <span
        onClick={() => {
          router.push(`/dashboard/${texto[2]}`);
        }}
      >
        {texto[2] ? `${' '} ${texto[2]} ` : ''}
      </span>
      {text ? <span> {'/ ' + text}</span> : ''}
    </div>
  );
};

export default BreadcrumbDashboard;
