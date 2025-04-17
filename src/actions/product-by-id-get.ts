'use server';

import { PRODUCT_BY_ID } from '../shared/functions/api_urls';
import { type ProductApi } from '../shared/helpers/interfaces';

export default async function productByIdGet({ id }: { id: string }) {
  try {
    const { url } = PRODUCT_BY_ID({ id });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: [`product-by-id-${id}`]
      }
    });

    if (!response.ok)
      throw new Error('Erro ao pegar os produtos por categoria.');

    const data = (await response.json()) as { product: ProductApi };

    return data;
  } catch (error) {
    console.log('erro no fetch dos produtos por categoria,', error);
  }
}
