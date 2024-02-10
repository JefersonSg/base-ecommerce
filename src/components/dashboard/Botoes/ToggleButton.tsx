/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ToggleButton.module.css';
import { toggleStock } from '@/src/shared/api/UPDATES';

const ToggleButton = ({ data }: { data: any }) => {
  const [active, setActive] = React.useState(data?.active ?? data ?? false);

  async function toggleStockParam() {
    const newData = data;

    if (newData?.active !== undefined) {
      newData.active = !newData.active;

      const response = await toggleStock(newData);
      if (response) {
        setActive(!active);
      }
    }

    setActive(!active);
  }

  return (
    <input
      onClick={toggleStockParam}
      className={`${styles.toggle_button} ${active ? styles.ativo : ''}`}
      type="checkbox"
    />
  );
};

export default ToggleButton;
