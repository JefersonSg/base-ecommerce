'use client';

import styles from './styles.module.css';
import LoginPage from '@/src/components/forms/login/LoginPage';

const page = () => {
  return (
    <div className={styles.login_container}>
      <LoginPage />
    </div>
  );
};

export default page;
