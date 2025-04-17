'use client';

import React from 'react';
import Lottie from 'lottie-react';
import styles from './confirm.module.css';

// Importa o arquivo de animação
import ErrorAnimation from '@/public/lottie/error/animation.json';

const ErrorConfirmLottie = () => {
  return (
    <div
      className={styles.like}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Lottie
        animationData={ErrorAnimation}
        loop={false}
        autoplay={true}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default ErrorConfirmLottie;
