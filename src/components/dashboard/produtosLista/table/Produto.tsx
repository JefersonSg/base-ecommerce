import Image from 'next/image';
import React from 'react';
import styles from './Produto.module.css';

const Produto = ({
  setAtivoEdit,
  setAtivoDelete
}: {
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.categoria_item}>
      <div className={styles.div_img}>
        <Image
          alt="Imagem da categoria"
          src={'/produto/produto1.png'}
          width={40}
          height={40}
        />
      </div>
      <div className={styles.infos}>
        <h3 className={`name ${styles.name}`}>Creme hydra</h3>
        <p className={`description ${styles.description}`}>
          O melhor creme para a sua pele a...{' '}
        </p>
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
          }}
        />
        <Image
          alt="Lixeira para deletar a categoria"
          src={'/dashboard/edit.svg'}
          width={16}
          height={18}
          onClick={() => {
            setAtivoEdit(true);
          }}
        />
      </div>
    </div>
  );
};

export default Produto;
