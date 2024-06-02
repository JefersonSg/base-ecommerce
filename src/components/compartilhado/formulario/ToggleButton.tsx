/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ToggleButton.module.css';
import { toggleStock } from '@/src/shared/api/UPDATES';
import {
  type QueryObserverResult,
  type RefetchOptions,
  type UseQueryResult
} from '@tanstack/react-query';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

const ToggleButton = ({
  data,
  pathnameUrl,
  refetch,
  refetch2,
  revalidate,
  type,
  setPopUpMessage,
  status
}: {
  data: ProductApi;
  pathnameUrl: string;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  refetch2?: UseQueryResult<any, Error>;
  revalidate: () => any;
  type: string;
  setPopUpMessage: React.Dispatch<React.SetStateAction<string>>;
  status: boolean;
}) => {
  const [active, setActive] = React.useState(status);
  const [isLoading, setIsLoading] = React.useState(false);

  async function toggleStockParam() {
    const newData = data;

    if (!isLoading) {
      setIsLoading(true);

      try {
        if (newData?.active !== undefined && type === 'estoque') {
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
        if (type === 'promoção' && !data?.promotionalPrice && !data.promotion) {
          setPopUpMessage('É necessário informar o valor da promoção');
          setActive(false);
          setIsLoading(false);
          return;
        }
        if (newData?.promotion !== undefined && type === 'promoção') {
          newData.promotion = !newData.promotion;

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
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setActive(false);
      }
    }
    setIsLoading(false);
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
