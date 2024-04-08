/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import Lottie from 'react-lottie';
import styles from './confirm.module.css';

// Arquivos Lottie
import ConfirmAnimation from '../../../public/lottie/confirm/Animation - 1712531613063.json';

const ConfirmLottie = () => {
  const animation = ConfirmAnimation;

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation
  };

  return (
    <div
      className={styles.like}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Lottie options={defaultOptions} width={150} height={150} />
    </div>
  );
};

export default ConfirmLottie;
