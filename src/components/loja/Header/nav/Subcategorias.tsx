import {
  type CategoryInterface,
  type subcategoryInterface
} from '@/src/shared/helpers/interfaces';
import React from 'react';
import styles from './subcategorias.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Subcategorias = ({
  data,
  category
}: {
  data: subcategoryInterface[];
  category: CategoryInterface;
}) => {
  const columns = [];

  for (let i = 0; i < data.length; i += 7) {
    const columnItems = data.slice(i, i + 7);
    columns.push(
      <ul className="grid-column" key={i}>
        {columnItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.subcategorias}>
      <nav>{columns}</nav>
      <div className={styles.category_colum}>
        <Link
          href={{
            pathname: `/produtos/categoria`,
            query: { _id: category._id }
          }}
          className={styles.div_img}
        >
          <Image
            alt="imagem da categoria"
            src={category?.image}
            width={70}
            height={70}
          />
        </Link>
        <p>{category.description}</p>
      </div>
    </div>
  );
};

export default Subcategorias;
