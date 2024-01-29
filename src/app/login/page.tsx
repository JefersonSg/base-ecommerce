'use client';

import LoginPage from '@/src/components/forms/login/LoginPage';
import styles from './styles.module.css';

const page = () => {
  return (
    <div className={styles.login_container}>
      <LoginPage />
    </div>
  );
};

export default page;
