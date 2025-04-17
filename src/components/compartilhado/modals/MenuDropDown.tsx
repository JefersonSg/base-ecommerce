import React from 'react';
import styles from './MenuDropDown.module.css';

const MenuDropDown = ({
  active,
  setActive,
  wrapperRef,
  setDaysAgo
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  wrapperRef: React.MutableRefObject<any>;
  setDaysAgo: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={styles.modal_select_days}>
      <div
        className={styles.botao}
        onClick={() => {
          setActive(!active);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {active && (
        <div className={styles.opcoes} ref={wrapperRef}>
          <p
            onClick={() => {
              setDaysAgo(0);
              setActive(false);
            }}
          >
            Hoje
          </p>
          <p
            onClick={() => {
              setDaysAgo(7);
              setActive(false);
            }}
          >
            7 dias atrás
          </p>
          <p
            onClick={() => {
              setDaysAgo(15);
              setActive(false);
            }}
          >
            15 dias atrás
          </p>
          <p
            onClick={() => {
              setDaysAgo(30);
              setActive(false);
            }}
          >
            30 dias atrás
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuDropDown;
