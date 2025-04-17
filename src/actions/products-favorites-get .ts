'use server';

import { PRODUCTS_FAVORITES } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';

interface ProductGetParams {
  userId?: string;
  page?: number;
  total?: number;
}

export default async function productsFavoritesGet({
  userId = '',
  page = 1,
  total = 9
}: ProductGetParams = {}) {
  try {
    const { url } = PRODUCTS_FAVORITES({ userId, page, total });

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
