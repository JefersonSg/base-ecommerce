'use server';

import { CATEGORIES_ALL } from '../shared/functions/api_urls';
import { type CategoryInterface } from '../shared/helpers/interfaces';

export default async function categoriesGetAll() {
  try {
    const { url } = CATEGORIES_ALL();

    const response = await fetch(url, {
      next: {
        revalidate: 0,
        tags: ['categories-get-all']
      }
    });

    const data = (await response.json()) as { categories: CategoryInterface[] };

    return data;
  } catch (error) {
    console.log('Erro ao pegar as categorias,', error);
    return { categories: [] };
  }
}
