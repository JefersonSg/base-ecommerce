'use server';

import { cookies } from 'next/headers';

interface bag {
  productId: string;
  color: string;
  size: string;
  amount: number;
  codeColor: string;
}

export async function addItemCardNoAccount({
  productId,
  color,
  size,
  codeColor
}: bag) {
  const cartItemsCookie = cookies().get('cart_items')?.value as string;

  const newItem = {
    size,
    color,
    productId,
    codeColor,
    amount: 1
  };

  const bag = cartItemsCookie ? JSON?.parse(cartItemsCookie) : [];

  bag.push(newItem);
  cookies().set('cart_items', JSON.stringify(bag));

  return bag;
}
