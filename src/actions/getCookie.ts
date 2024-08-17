'use server';

import { cookies } from 'next/headers';

async function getCookie({ nameCookie }: { nameCookie: string }) {
  const cookie = cookies().get(nameCookie)?.value;

  return cookie;
}

export default getCookie;
