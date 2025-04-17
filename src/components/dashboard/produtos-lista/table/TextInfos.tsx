import React from 'react';
import styles from './TextInfos.module.css';

const TextInfos = ({
  setNoActivesProducts,
  noActivesProducts,
  setPromotionProducts,
  promotionProducts
}: {
  setNoActivesProducts: React.Dispatch<React.SetStateAction<boolean>>;
  noActivesProducts: boolean;
  setPromotionProducts: React.Dispatch<React.SetStateAction<boolean>>;
  promotionProducts: boolean;
}) => {
  return (
    <tr className={styles.textInfos_container}>
      <th className={styles.produto}>PRODUTO</th>
      <th
        className={`${styles.total_products_register} ${
          promotionProducts ? styles.ativo : ''
        }`}
        onClick={() => {
          setPromotionProducts(!promotionProducts);
          setNoActivesProducts(false);
        }}
      >
        PROMO
      </th>
      <th
        className={`${styles.total_products_register} ${
          noActivesProducts ? styles.ativo : ''
        }`}
        onClick={() => {
          setNoActivesProducts(!noActivesProducts);
          setPromotionProducts(false);
        }}
      >
        ATIVO
      </th>
      <th className={styles.total_products_amount}>QUANTIDADE</th>
      <th className={styles.total_products_value}>PREÇO</th>
      <th className={styles.actions}>AÇÕES</th>
    </tr>
  );
};

export default TextInfos;
