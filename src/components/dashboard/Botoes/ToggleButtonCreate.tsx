/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ToggleButton.module.css';

const ToggleButtonCreate = ({
  data,
  register,
  name
}: {
  data: any;
  register: any;
  name: string;
}) => {
  const [active, setActive] = React.useState(data);

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
