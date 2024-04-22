'use server';

import { cookies } from 'next/headers';

export async function isAdmin(id: string) {
  if (!id) {
    return;
  }
  cookies().set('isAdmin', id);
  return true;
}
