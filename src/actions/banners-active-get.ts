'use server';

import { BANNERS_ACTIVE } from '../shared/functions/api_urls';
import { type BannerType } from '../shared/helpers/interfaces';

export default async function bannersActiveGet() {
  try {
    const { url } = BANNERS_ACTIVE();

    const response = await fetch(url, {
      next: {
        revalidate: 3600,
        tags: ['all-active-banners']
      }
    });

    if (!response.ok) throw new Error('Erro ao pegar os banners ativos.');

    const data = (await response.json()) as { banners: BannerType[] };

    return data;
  } catch (error) {
    console.log('Erro ao pegar os banners ativos,', error);
    return { banners: [] };
  }
}
