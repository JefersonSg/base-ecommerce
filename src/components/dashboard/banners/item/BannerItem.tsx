import Image from 'next/image';
import React from 'react';
import styles from './Banner.module.css';
import ToggleButton from '../../../compartilhado/formulario/ToggleButton';
import Link from 'next/link';
import { type BannerType } from '@/src/shared/helpers/interfaces';

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
  return (
    <div className={styles.produto_item}>
      <Image
        alt="Imagem da categoria"
        src={bannerData?.images?.[0]}
        width={40}
        height={40}
      />

      <div className={styles.infos}>
        <Link href={{ pathname: '/produto', query: { _id: bannerData._id } }}>
          <h3 className={`name ${styles.name}`}>{bannerData?.name}</h3>
        </Link>
        <p className={`description ${styles.description}`}>
          {bannerData?.link}
        </p>
      </div>
      <ToggleButton data={bannerData} />
      <div className={styles.total_products_register}>
        <h3>75</h3>
      </div>
      <div className={styles.total_products_value}>
        <h3>R$ </h3>
      </div>
      <div className={styles.actions}>
        <Image
          alt="Lixeira para deletar a categoria"
          src={'/dashboard/lixeira.svg'}
          width={16}
          height={18}
          onClick={() => {
            setAtivoDelete(true);
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
