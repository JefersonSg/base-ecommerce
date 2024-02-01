import Image from 'next/image';
import React from 'react';
import styles from './CategoriaItem.module.css';

const CategoriaItem = () => {
  return (
    <div className={styles.categoria_item}>
      <div className={styles.div_img}>
        <Image
          alt="Imagem da categoria"
          src={'/categorias/batom.png'}
          width={40}
          height={40}
        />
      </div>
      <div className={styles.infos}>
        <h3 className={styles.name}>Batom</h3>
        <p className={styles.description}>Encontre os melhores batons </p>
      </div>
      <div className={styles.total_products_register}>
        <h3 className={styles.products_register}>75</h3>
      </div>
    </div>
  );
};

export default CategoriaItem;
