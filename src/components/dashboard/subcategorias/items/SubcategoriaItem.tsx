'use client';

import Image from 'next/image';
import React from 'react';
import styles from './subcategoriaItem.module.css';
import {
  type ProductApi,
  type CategoryInterface
} from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';
import categoryByIdGet from '@/src/actions/category-by-id-get';
import productsFilterGet from '@/src/actions/products-filters-get';

const SubcategoriaItem = ({
  subcategoryId,
  name,
  description,
  image,
  category,
  setAtivoEdit,
  setAtivoDelete,
  setIdSubcategory,
  setIdCategory,
  setDefaultTitle,
  setDefaultDescription
}: {
  subcategoryId: string;
  name: string;
  description: string;
  image: string;
  category: string;
  setAtivoEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setAtivoDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIdSubcategory: React.Dispatch<React.SetStateAction<string>>;
  setIdCategory: React.Dispatch<React.SetStateAction<string>>;
  setDefaultTitle: React.Dispatch<React.SetStateAction<string>>;
  setDefaultDescription: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [categoryApi, setCategoryApi] = React.useState<{
    category: CategoryInterface;
  }>();

  React.useEffect(() => {
    const getCategoryName = async () => {
      const response = await categoryByIdGet({ id: category });
      setCategoryApi(response);
    };

    void getCategoryName();
  }, [category]);

  const { data } = useQuery({
    queryKey: ['productBySubcategory', subcategoryId],
    queryFn: async () => {
      return (await productsFilterGet({
        subcategory: subcategoryId,
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
    <tr className={styles.subcategoria_item}>
      <td>
        <div className={styles.subcategoria_infos}>
          <div className={styles.div_img}>
            <Image
              alt="Imagem da categoria"
              src={image || '/categorias/batom.png'}
              width={40}
              height={40}
            />
          </div>

          <div className={styles.infos}>
            <h3 className={`name ${styles.name}`}>{name}</h3>
            <p className={`description ${styles.description}`}>
              {categoryApi?.category?.name ?? '"subcategoria não encontrada"'}
            </p>
          </div>
        </div>
      </td>
      <td className={styles.total_products_register}>
        <h3>{data?.products?.length}</h3>
      </td>
      <td className={styles.total_products_value}>
        <h3> R${convertNumberInReal(valorTotal ?? 0)}</h3>
      </td>
      <td>
        <div className={styles.actions}>
          <Image
            alt="Lixeira para deletar a categoria"
            src={'/dashboard/lixeira.svg'}
            width={16}
            height={18}
            quality={40}
            placeholder="empty"
            onClick={() => {
              setIdSubcategory(subcategoryId);
              setAtivoDelete(true);
            }}
          />
          <div
            onClick={() => {
              setIdSubcategory(subcategoryId);
              setIdCategory(category);
            }}
          >
            <Image
              alt="Imagem de um lapis para editar a subcategoria"
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

export default SubcategoriaItem;
