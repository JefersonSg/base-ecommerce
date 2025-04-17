import React from 'react';
import styles from './Background.module.css';

const BackgoundClick = ({
  setState1,
  setState2,
  setState3
}: {
  setState1?: React.Dispatch<React.SetStateAction<any>>;
  setState2?: React.Dispatch<React.SetStateAction<boolean>>;
  setState3?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={styles.background}
      onClick={() => {
        if (setState1) {
          setState1(false);
        }

        if (setState2) {
          setState2(false);
        }
        if (setState3) {
          setState3(false);
        }
      }}
    ></div>
  );
};

export default BackgoundClick;
