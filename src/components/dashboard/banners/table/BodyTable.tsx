'use client';

import React from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import BannerItem from '../item/BannerItem';
import { type BannerType } from '@/src/shared/helpers/interfaces';

interface GetAllCategoriesResponse {
  banners: BannerType[];
}

const BodyTable = ({
  data,
  setAtivoEdit,
  setAtivoDelete,
  setBannerId,
  bannerId
}: {
  data: GetAllCategoriesResponse;
  bannerId: string;
  ativoDelete: boolean;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setBannerId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //

  return (
    <div className={styles.BodyTable}>
      <TextInfos />

      {data?.banners?.map((banner, index) => {
        return (
          <div key={banner._id}>
            <BannerItem
              data={banner}
              setAtivoEdit={setAtivoEdit}
              setAtivoDelete={setAtivoDelete}
              setIdBanner={setIdBanner}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BodyTable;
