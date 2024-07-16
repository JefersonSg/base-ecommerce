import Image from 'next/image';
import React from 'react';
import styles from './CategoriaItem.module.css';
import { useQuery } from '@tanstack/react-query';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import productsFilterGet from '@/src/actions/products-filters-get';

const CategoriaItem = ({
  idCategory,
  name,
  description,
  image,
  setAtivoEdit,
  setAtivoDelete,
  setIdCategory,
  setDefaultTitle,
  setDefaultDescription
}: {
  idCategory: string;
  name: string;
  description: string;
  image: string;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
  setDefaultTitle: React.Dispatch<React.SetStateAction<string>>;
  setDefaultDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useQuery({
    queryKey: ['productByCategory', idCategory],
    queryFn: async () => {
      return (await productsFilterGet({
        category: idCategory,
        total: 1000
      })) as {
        products: ProductApi[];
      };
    }
  });
  const [valorTotal, setValorTotal] = React.useState<number>();

  React.useEffect(() => {
    async function setValorCategory() {
      const valorTotalArray = data?.products?.reduce((i, product) => {
        const totalProducts = product.stock.amount.reduce((count, amount) => {
          const newAmount = amount.reduce((count, amount) => count + amount, 0);

          return count + +newAmount;
        }, 0);

        const totalValor = +product.price * +totalProducts;
        return i + totalValor;
      }, 0);

      if (valorTotalArray && valorTotalArray > 0) {
        setValorTotal(valorTotalArray);
      }
    }
    void setValorCategory();
  }, [data?.products]);

  return (
    <tr className={styles.categoria_item}>
      <td>
        <div className={styles.categoria_infos}>
          <div className={styles.div_img}>
            <Image
              alt="Imagem da categoria"
              src={image || '/categorias/batom.png'}
              quality={40}
              width={40}
              height={40}
              placeholder="empty"
            />
          </div>

          <div className={styles.infos}>
            <h3 className={`name ${styles.name}`}>{name}</h3>
            <p className={`description ${styles.description}`}>{description}</p>
          </div>
        </div>
      </td>

      <td className={styles.total_products_register}>
        <h3>{data?.products?.length}</h3>
      </td>
      <td className={styles.total_products_value}>
        <h3> R$ {convertNumberInReal(valorTotal ?? 0)}</h3>
      </td>
      <td>
        <div className={styles.actions}>
          <img
            alt="Lixeira para deletar a categoria"
            src={'/dashboard/lixeira.svg'}
            width={16}
            height={18}
            onClick={() => {
              setIdCategory(idCategory);
              setAtivoDelete(true);
            }}
          />
          <div
            onClick={() => {
              setIdCategory(idCategory);
            }}
          >
            <Image
              alt="Imagem de um laps para editar a categoria"
              src={'/dashboard/edit.svg'}
              width={16}
              height={18}
              onClick={() => {
                setDefaultTitle(name);
                setDefaultDescription(description);
                setAtivoEdit(true);
              }}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CategoriaItem;
