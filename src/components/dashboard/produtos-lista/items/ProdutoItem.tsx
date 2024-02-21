import Image from 'next/image';
import React from 'react';
import styles from './Produto.module.css';
import ToggleButton from '../../../compartilhado/formulario/ToggleButton';
import Link from 'next/link';

interface ProductsType {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  colors: string[];
  codecolors: string[];
  category: string;
  images: string[];
  stock: { sizeP: string[]; sizeM: string; sizeG: string; sizeGG: string };
  promotion: boolean;
  to: string;
  active: boolean;
}

const ProdutoItem = ({
  data,
  setAtivoDelete,
  setIdDelete
}: {
  data: ProductsType;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdDelete: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.produto_item}>
      <Link
        href={{ pathname: '/produto', query: { _id: data._id } }}
        className={styles.div_img}
      >
        <Image
          alt="Imagem da categoria"
          src={data.images?.[0] || '/categorias/batom.png'}
          width={40}
          height={40}
        />
      </Link>

      <div className={styles.infos}>
        <Link href={{ pathname: '/produto', query: { _id: data._id } }}>
          <h3 className={`name ${styles.name}`}>{data?.name}</h3>
        </Link>
        <p className={`description ${styles.description}`}>
          {data?.description}
        </p>
      </div>
      <ToggleButton data={data} />
      <div className={styles.total_products_register}>
        <h3>75</h3>
      </div>
      <div className={styles.total_products_value}>
        <h3>R$ {data?.price?.toFixed(2).replace('.', ',')}</h3>
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

export default ProdutoItem;
