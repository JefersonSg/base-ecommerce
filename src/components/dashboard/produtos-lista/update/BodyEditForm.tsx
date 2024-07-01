'use client';

import React from 'react';
import FormUpdateProduct from './FormUpdateProduct';
import { useParams } from 'next/navigation';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import productByIdGet from '@/src/actions/product-by-id-get';

const BodyEditForm = () => {
  const [dataProduct, setDataProduct] = React.useState<{
    product: ProductApi;
  }>();
  const { update } = useParams<any>();

  React.useEffect(() => {
    const response = async () => {
      try {
        const responseData = await productByIdGet({ id: update });
        setDataProduct(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    void response();
  }, [update]);
  return (
    <div>{dataProduct && <FormUpdateProduct dataProduct={dataProduct} />}</div>
  );
};

export default BodyEditForm;
