'use server';

import { cookies } from 'next/headers';

export async function isAdmin() {
  cookies().set('isAdmin', 'true');
}
