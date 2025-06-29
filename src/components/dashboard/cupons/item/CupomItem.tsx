import Image from 'next/image';
import React from 'react';
import styles from './Cupom.module.css';
import ToggleButton from '../../../compartilhado/formulario/ToggleButton';
import { type cuponsInterface } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getAllCupons } from '@/src/shared/api/GETS';
import { revalidateTagAction } from '@/src/actions/revalidates';

const CupomItem = ({
  cupomData,
  setAtivoDelete,
  setCupomData
}: {
  cupomData: cuponsInterface;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setCupomData: React.Dispatch<
    React.SetStateAction<cuponsInterface | undefined>
  >;
}) => {
  const { refetch } = useQuery({
    queryKey: ['cupons-dashboard'],
    queryFn: getAllCupons
  });

  const CuponsRevalidate = async () => {
    await revalidateTagAction('cupons-dashboard');
  };

  return (
    <tr className={styles.cupom_item}>
      <td>
        <div className={styles.infos}>
          <h3 className={`name ${styles.code}`}>{cupomData?.code}</h3>
          <p className={`description ${styles.link}`}>
            {cupomData?.percentageDiscount
              ? `${cupomData.percentageDiscount}% de desconto`
              : ''}
          </p>
        </div>
      </td>
      <td className={styles.usos}>
        <p>{cupomData.uses}</p>
      </td>
      <td>
        <ToggleButton
          status={cupomData.active}
          type="estoque"
          data={cupomData}
          pathnameUrl="cupons/toggle/"
          revalidate={CuponsRevalidate}
          refetch={refetch}
        />
      </td>

      <td>
        <div className={styles.actions}>
          <Image
            alt="Lixeira para deletar a categoria"
            src={'/dashboard/lixeira.svg'}
            width={16}
            height={18}
            unoptimized
            onClick={() => {
              setAtivoDelete(true);
              setCupomData(cupomData);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default CupomItem;
