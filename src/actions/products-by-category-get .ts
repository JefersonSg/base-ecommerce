'use server';

import { PRODUCT_BY_CATEGORY } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';
import { type ProductGetParams } from './products-active-get';

export default async function productsByCategoryGet({
  id = '',
  page = 1,
  total = 9
}: ProductGetParams = {}) {
  try {
    const { url } = PRODUCT_BY_CATEGORY({ id, page, total });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: ['products-by-category']
      }
    });

    if (!response.ok)
      throw new Error('Erro ao pegar os produtos por categoria.');

    const data = (await response.json()) as { products: ProductApi[] };

    return data;
  } catch (error) {
    console.log('erro no fetch dos produtos por categoria,', error);
  }
}
