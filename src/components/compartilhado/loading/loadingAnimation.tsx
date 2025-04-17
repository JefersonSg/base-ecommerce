'use client';

import React from 'react';
import styles from './loadingAnimation.module.css';
import LoadingAnimationLottie from '../../lottie/loadingAnimationLottie';

const LoadingAnimation = () => {
  return (
    <div className={styles.loading}>
      <div>
        <LoadingAnimationLottie />
      </div>
    </div>
  );
};

export default LoadingAnimation;
