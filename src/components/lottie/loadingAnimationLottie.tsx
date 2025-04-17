/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import Lottie from 'react-lottie';
import styles from './confirm.module.css';

// Arquivos Lottie
import loadingAnimation from '../../../public/lottie/outros/loading.json';

const LoadingAnimationLottie = () => {
  const animation = loadingAnimation;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation
  };

  return (
    <div
      className={styles.loading}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Lottie options={defaultOptions} width={255} height={255} />
    </div>
  );
};

export default LoadingAnimationLottie;
