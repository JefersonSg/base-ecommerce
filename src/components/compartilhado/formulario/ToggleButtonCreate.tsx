/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ToggleButton.module.css';

const ToggleButtonCreate = ({
  watchValue,
  register,
  name
}: {
  watchValue: any;
  register: any;
  name: string;
}) => {
  const [active, setActive] = React.useState(watchValue);

  async function toggleStockParam() {
    setActive(!active);
  }

  return (
    <input
      onClick={toggleStockParam}
      {...register(name)}
      className={`${styles.toggle_button} ${active ? styles.ativo : ''}`}
      type="checkbox"
    />
  );
};

export default ToggleButtonCreate;
