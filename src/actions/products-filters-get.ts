'use server';

import { PRODUCT_FILTER } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';

export interface ProductGetParams {
  page?: number;
  total?: number;
  id?: string;
  active?: boolean | string;
  name?: string;
  promotion?: boolean | string;
  category?: string;
  subcategory?: string;
  color?: string;
  size?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  orderBy?: string;
  orderDirection?: string;
}

export default async function productsFilterGet({
  page = 1,
  total = 9,
  active = '',
  promotion = '',
  brand = '',
  category = '',
  color = '',
  maxPrice = '',
  minPrice = '',
  name = '',
  orderBy = '',
  orderDirection = '',
  size = '',
  subcategory = ''
}: ProductGetParams = {}) {
  try {
    const { url } = PRODUCT_FILTER({
      page,
      total,
      active,
      brand,
      category,
      color,
      maxPrice,
      minPrice,
      name,
      orderBy,
      orderDirection,
      promotion,
      size,
      subcategory
    });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: [`products-filter`]
      }
    });

    const data = (await response.json()) as { products: ProductApi[] };

    return data;
  } catch (error) {
    console.log('erro no fetch dos produtos products-filter,', error);

    return { products: [] };
  }
}
