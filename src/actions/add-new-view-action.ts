'use server';

import { AddNewView } from './add-new-view';

export async function AddViewFromClient({
  productId,
  pageView
}: {
  productId: string;
  pageView: string;
}) {
  await AddNewView({ productId, pageView });
}
