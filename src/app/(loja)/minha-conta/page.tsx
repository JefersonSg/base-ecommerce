import React from 'react';
import styles from './styles.module.css';
import BotaoSair from '@/src/components/compartilhado/botoes/BotaoSair';

const page: React.FC = () => {
  return (
    <div className={styles.minha_conta_container}>
      <BotaoSair />
    </div>
  );
};

export default page;
