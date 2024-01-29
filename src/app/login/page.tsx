'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import styles from './styles.module.css';
import Login from '../../components/forms/login/Login';
import { queryClient } from '@/src/shared/services/queryClient';

const page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.login_container}>
        <Login />
      </div>
    </QueryClientProvider>
  );
};

export default page;
