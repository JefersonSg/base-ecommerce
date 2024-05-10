import React from 'react';
import styles from './loadingAnimation.module.css';
import LoadingAnimationLottie from '../../lottie/loadingAnimationLottie';

const LoadingAnimation = () => {
  return (
    <div className={styles.loading}>
      <LoadingAnimationLottie />
    </div>
  );
};

export default LoadingAnimation;
