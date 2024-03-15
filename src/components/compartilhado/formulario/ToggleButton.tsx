/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ToggleButton.module.css';
import { toggleStock } from '@/src/shared/api/UPDATES';
import {
  type QueryObserverResult,
  type RefetchOptions,
  type UseQueryResult
} from '@tanstack/react-query';

const ToggleButton = ({
  data,
  pathnameUrl,
  refetch,
  refetch2,
  revalidate
}: {
  data: any;
  pathnameUrl: string;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  refetch2?: UseQueryResult<any, Error>;
  revalidate: () => any;
}) => {
  const [active, setActive] = React.useState(data?.active ?? data ?? false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function toggleStockParam() {
    const newData = data;

    if (!isLoading) {
      setIsLoading(true);

      if (newData?.active !== undefined) {
        newData.active = !newData.active;

        const response = await toggleStock(newData, pathnameUrl);
        if (refetch) {
          await refetch();
        }
        if (refetch2) {
          await refetch2.refetch();
        }
        if (response) {
          setActive(!active);
        }
        if (revalidate) {
          await revalidate();
        }
      }
    }
    setIsLoading(false);
    setActive(!active);
  }

  return (
    <input
      onClick={() => {
        void toggleStockParam();
      }}
      className={`${styles.toggle_button} ${active ? styles.ativo : ''} ${
        isLoading ? styles.loading : ''
      }`}
      type="checkbox"
    />
  );
};

export default ToggleButton;
