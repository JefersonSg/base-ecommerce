'use client';

import { type ProductGetParams } from '@/src/actions/products-filters-get';
import { type ProductApi } from '../helpers/interfaces';

export async function getFilters({
  pesquisa,
  functionGetProduct,
  active,
  promotion,
  categoryId,
  subcategoryId,
  orderBy,
  orderDirection
}: {
  functionGetProduct: ({ id, page, total }: ProductGetParams) => Promise<
    | {
        products: ProductApi[];
      }
    | undefined
  >;
  pesquisa?: string;
  active?: boolean;
  promotion?: boolean;
  categoryId?: string;
  subcategoryId?: string;
  orderBy?: string;
  orderDirection?: string;
}) {
  const actionData = await functionGetProduct({
    category: categoryId,
    subcategory: subcategoryId,
    name: pesquisa,
    total: 10000,
    active,
    promotion,
    orderBy,
    orderDirection
  });

  // Cores
  const colorMap = actionData?.products?.reduce((acc: any, product) => {
    product?.colors?.forEach((color, index) => {
      if (!acc[color]) {
        acc[color] = product?.codeColors?.[index];
      }
    });
    return acc;
  }, {});

  const uniqueColors = Object.keys(colorMap).map((color) => {
    return { color, codeColor: colorMap[color] };
  });

  // Tamanhos
  const sizeSet = new Set();

  actionData?.products.forEach((product) => {
    product.size.forEach((size) => {
      sizeSet.add(size.trim());
    });
  });

  const uniqueSizes = Array.from(sizeSet);

  // Marcas

  const brandMap = actionData?.products.reduce((acc: any, product) => {
    acc[product.brand] = true;
    return acc;
  }, {});

  const uniqueBrands = Object.keys(brandMap);

  return {
    cores: uniqueColors,
    tamanhos: uniqueSizes,
    marcas: uniqueBrands
  };
}
