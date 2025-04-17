'use server';

import { SUBCATEGORIES_BY_CATEGORY_ID } from '../shared/functions/api_urls';
import { type subcategoryInterface } from '../shared/helpers/interfaces';

export default async function subcategorieByCategoryIdGet({
  categoryId
}: {
  categoryId: string;
}) {
  try {
    const { url } = SUBCATEGORIES_BY_CATEGORY_ID({ categoryId });

    const response = await fetch(url, {
      next: {
        revalidate: 3600,
        tags: [`subcategories-by-category-id-${categoryId}`]
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
