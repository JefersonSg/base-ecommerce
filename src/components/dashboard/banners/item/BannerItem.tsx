import Image from 'next/image';
import React from 'react';
import styles from './Banner.module.css';
import ToggleButton from '../../../compartilhado/formulario/ToggleButton';
import { type BannerType } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getAllBanners } from '@/src/shared/api/GETS';
import { revalidateTagAction } from '@/src/actions/revalidates';

const BannerItem = ({
  bannerData,
  setAtivoDelete,
  setAtivoEdit,
  setBannerData
}: {
  bannerData: BannerType;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setBannerData: React.Dispatch<React.SetStateAction<BannerType>>;
}) => {
  const { refetch } = useQuery({
    queryKey: ['banners-dashboard'],
    queryFn: getAllBanners
  });

  const bannerHomeRevalidate = async () => {
    await revalidateTagAction('all-active-banners');
  };

  return (
    <div className={styles.banner_item}>
      <Image
        alt="Imagem da categoria"
        src={bannerData.imageMobile}
        width={40}
        height={40}
        quality={40}
        placeholder="empty"
      />

      <div className={styles.infos}>
        <h3 className={`name ${styles.name}`}>{bannerData?.name}</h3>

        <p className={`description ${styles.link}`}>{bannerData?.link}</p>
      </div>
      <ToggleButton
        data={bannerData}
        pathnameUrl="banners/update/"
        revalidate={bannerHomeRevalidate}
        refetch={refetch}
      />

      <div className={styles.actions}>
        <Image
          alt="Lixeira para deletar a categoria"
          src={'/dashboard/lixeira.svg'}
          width={16}
          height={18}
          onClick={() => {
            setAtivoDelete(true);
            setBannerData(bannerData);
          }}
        />
        <Image
          alt="Imagem de um laps para editar a categoria"
          src={'/dashboard/edit.svg'}
          width={16}
          height={18}
          onClick={() => {
            setAtivoEdit(true);
            setBannerData(bannerData);
          }}
        />
      </div>
    </div>
  );
};

export default BannerItem;
