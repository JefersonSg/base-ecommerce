import Image from 'next/image';
import React from 'react';
import styles from './Produto.module.css';

const ProdutoItem = ({
  idProduct,
  name,
  description,
  images,
  setAtivoDelete,
  setIdDelete
}: {
  idProduct: string;
  name: string;
  description: string;
  images: string[];
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdDelete: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.categoria_item}>
      <div className={styles.div_img}>
        <Image
          alt="Imagem da categoria"
          src={images?.[0] || '/categorias/batom.png'}
          width={40}
          height={40}
        />
      </div>

      <div className={styles.infos}>
        <h3 className={`name ${styles.name}`}>{name}</h3>
        <p className={`description ${styles.description}`}>{description}</p>
      </div>
      <div className={styles.total_products_register}>
        <h3>75</h3>
      </div>
      <div className={styles.total_products_value}>
        <h3>R$2479,23</h3>
      </div>
      <div className={styles.actions}>
        <Image
          alt="Lixeira para deletar a categoria"
          src={'/dashboard/lixeira.svg'}
          width={16}
          height={18}
          onClick={() => {
            setAtivoDelete(true);
            setIdDelete(idProduct);
          }}
        />
        <div onClick={() => {}}>
          <Image
            alt="Imagem de um laps para editar a categoria"
            src={'/dashboard/edit.svg'}
            width={16}
            height={18}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdutoItem;
