'use server';

import { cookies } from 'next/headers';

export async function isAdmin(id: string) {
  if (!id) {
    return null;
  }
  cookies().set('isAdmin', id);
}
