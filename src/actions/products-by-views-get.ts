'use server';

import { PRODUCT_BY_VIEWS } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';
import { type ProductGetParams } from './products-filters-get';

export default async function productsByViewsGet({
  page = 1,
  total = 9
}: ProductGetParams = {}) {
  try {
    const { url } = PRODUCT_BY_VIEWS({ page, total });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: ['products-by-views']
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar os produtos por views.');

    const data = (await response.json()) as { products: ProductApi[] };

    return data;
  } catch (error) {
    console.log('erro no fetch dos produtos por views,', error);
  }
}
