'use server';

import { PRODUCT_BY_SALES } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';
import { type ProductGetParams } from './products-active-get';

export default async function productsBySalesGet({
  page = 1,
  total = 9
}: ProductGetParams = {}) {
  try {
    const { url } = PRODUCT_BY_SALES({ page, total });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: ['products-by-sales']
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar os produtos por vendas.');

    const data = (await response.json()) as { products: ProductApi[] };

    return data;
  } catch (error) {
    console.log('erro no fetch dos produtos por venda,', error);
  }
}
