'use server';

import { SUBCATEGORIES } from '../shared/functions/api_urls';
import { type subcategoryInterface } from '../shared/helpers/interfaces';

export default async function subcategoriesGetAll() {
  try {
    const { url } = SUBCATEGORIES();

    const response = await fetch(url, {
      next: {
        revalidate: 3600,
        tags: ['subcategories']
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar as subcategorias.');

    const data = (await response.json()) as {
      subcategories: subcategoryInterface[];
    };

    return data;
  } catch (error) {
    console.log('Erro ao pegar as subcategorias,', error);
    return { subcategories: [] };
  }
}
