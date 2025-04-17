'use client';

import React, { Suspense } from 'react';
import styles from './BodyTable.module.css';
import TextInfos from './TextInfos';
import BannerItem from '../item/BannerItem';
import { type BannerType } from '@/src/shared/helpers/interfaces';

interface getAllBanners {
  banners: BannerType[];
}

const BodyTable = ({
  data,
  setAtivoEdit,
  setAtivoDelete,
  setBannerData
}: {
  data: getAllBanners;
  ativoDelete: boolean;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setBannerData: React.Dispatch<React.SetStateAction<BannerType>>;
}) => {
  //

  return (
    <div className={styles.BodyTable}>
      <TextInfos />

      {data?.banners?.map((banner, index) => {
        return (
          <div key={banner._id}>
            <Suspense fallback={<p>Carregando...</p>}>
              <BannerItem
                setBannerData={setBannerData}
                bannerData={banner}
                setAtivoEdit={setAtivoEdit}
                setAtivoDelete={setAtivoDelete}
              />
            </Suspense>
          </div>
        );
      })}
    </div>
  );
};

export default BodyTable;
