'use client';

import React from 'react';
import FormCreateProduct from './FormEditProduct';
import { useParams } from 'next/navigation';
import { type ProductInputs } from '@/src/shared/helpers/interfaces';
import { getProductById } from '@/src/shared/api/GETS';

const BodyEditForm = () => {
  const [dataProduct, setDataProduct] = React.useState<{
    product: ProductInputs;
  }>();

  const { edit } = useParams<any>();

  React.useEffect(() => {
    const response = async () => {
      try {
        const responseData = await getProductById(edit);
        setDataProduct(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    void response();
  }, [edit]);
  return (
    <div>{dataProduct && <FormCreateProduct dataProduct={dataProduct} />}</div>
  );
};

export default BodyEditForm;
