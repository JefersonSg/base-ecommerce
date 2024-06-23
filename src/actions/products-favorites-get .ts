'use server';

import { PRODUCT_BY_SUBCATEGORY } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';
import { type ProductGetParams } from './products-active-get';

export default async function productsFavoritesGet({
  id = '',
  page = 1,
  total = 9
}: ProductGetParams = {}) {
  try {
    const { url } = PRODUCT_BY_SUBCATEGORY({ id, page, total });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: ['products-favorites']
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar os produtos favoritos.');

    const data = (await response.json()) as { products: ProductApi[] };

    return data;
  } catch (error) {
    console.log('erro no fetch dos produtos favoritos,', error);
  }
}
