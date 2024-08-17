'use server';

import { cookies } from 'next/headers';

function setNewCookie({
  nameCookie,
  valueCookie,
  duracaoDias
}: {
  nameCookie: string;
  valueCookie: string;
  duracaoDias: number;
}) {
  cookies().set(nameCookie, valueCookie, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * duracaoDias, // 1 week in seconds
    expires: new Date(Date.now() + 60 * 60 * 24 * duracaoDias * 1000)
  });
}

export default setNewCookie;
