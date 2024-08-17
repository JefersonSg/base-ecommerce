'use server';

import { cookies } from 'next/headers';

function removeCookie({ nameCookie }: { nameCookie: string }) {
  cookies().delete(nameCookie);
}

export default removeCookie;
