'use server';

import { PRODUCT_ACTIVES } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';

export interface ProductGetParams {
  id?: string;
  page?: number;
  total?: number;
}

export default async function productsActiveGet({
  id = '',
  page = 1,
  total = 9
}: ProductGetParams = {}) {
  try {
    const { url } = PRODUCT_ACTIVES({ page, total });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: ['products-actives']
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar os produtos ativos.');

    const data = (await response.json()) as { products: ProductApi[] };

    return data;
  } catch (error) {
    console.log('erro no fetch dos produtos ativos,', error);
  }
}
