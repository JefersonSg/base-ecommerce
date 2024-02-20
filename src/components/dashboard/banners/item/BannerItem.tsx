import Image from 'next/image';
import React from 'react';
import styles from './Banner.module.css';
import ToggleButton from '../../Botoes/ToggleButton';
import Link from 'next/link';
import { type BannerType } from '@/src/shared/helpers/interfaces';

const BannerItem = ({
  data,
  setAtivoDelete,
  setIdBanner,
  setAtivoEdit
}: {
  data: BannerType;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdBanner: React.Dispatch<React.SetStateAction<string>>;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.produto_item}>
      <Image
        alt="Imagem da categoria"
        src={data.image || '/categorias/batom.png'}
        width={40}
        height={40}
      />

      <div className={styles.infos}>
        <Link href={{ pathname: '/produto', query: { _id: data._id } }}>
          <h3 className={`name ${styles.name}`}>{data?.name}</h3>
        </Link>
        <p className={`description ${styles.description}`}>{data?.link}</p>
      </div>
      <ToggleButton data={data} />
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
            setIdDelete(data._id);
          }}
        />
        <Link href={`/dashboard/produtos/${data?._id}`}>
          <Image
            alt="Imagem de um laps para editar a categoria"
            src={'/dashboard/edit.svg'}
            width={16}
            height={18}
          />
        </Link>
      </div>
    </div>
  );
};

export default BannerItem;
