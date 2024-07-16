'use server';

import { cookies } from 'next/headers';

async function getCookie({ nameCookie }: { nameCookie: string }) {
  const cokie = cookies().get(nameCookie);

  return cokie;
}

export default getCookie;
