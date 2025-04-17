'use server';

import { CATEGORY_BY_ID } from '../shared/functions/api_urls';
import { type CategoryInterface } from '../shared/helpers/interfaces';

export default async function categoryByIdGet({ id }: { id: string }) {
  try {
    const { url } = CATEGORY_BY_ID({ id });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: [`category-by-id-${id}`]
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar a categoria.');

    const data = (await response.json()) as { category: CategoryInterface };

    return data;
  } catch (error) {
    console.log('erro no fetch da categoria,', error);
    // return  category: {} ;
  }
}
