import React from 'react';
import styles from './styles.module.css';
import Registro from '@/src/components/registro/Registro';

const page = () => {
  return (
    <div className={styles.login_container}>
      <Registro />
    </div>
  );
};

export default page;
