'use server';

import { SUBCATEGORY_BY_ID } from '../shared/functions/api_urls';
import { type subcategoryInterface } from '../shared/helpers/interfaces';

export default async function SubcategoriesByIdGet({ id }: { id: string }) {
  try {
    const { url } = SUBCATEGORY_BY_ID({ id });

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: [`subcategory-by-id-${id}`]
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar a subcategoria.');

    const data = (await response.json()) as {
      subcategory: subcategoryInterface;
    };

    return data;
  } catch (error) {
    console.log('erro no fetch da subcategoria,', error);
  }
}
