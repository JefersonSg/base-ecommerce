'use client';

import styles from './styles.module.css';
import Login from '@/src/components/forms/Login/Login';

const page = () => {
  return (
    <div className={styles.login_container}>
      <Login />
    </div>
  );
};

export default page;
