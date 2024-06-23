'use server';

import { PRODUCT_BY_NAME } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';
import { type ProductGetParams } from './products-active-get';

export default async function productsByNameGet({
  id = '',
  page = 1,
  total = 9
}: ProductGetParams = {}) {
  try {
    const { url } = PRODUCT_BY_NAME({ name: id, page, total });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: ['products-by-name']
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar os produtos por name.');

    const data = (await response.json()) as { products: ProductApi[] };

    return data;
  } catch (error) {
    console.log('erro no fetch dos produtos por name,', error);
  }
}
