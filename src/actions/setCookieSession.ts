'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

async function setNewCookieSession() {
  const cookieStore = cookies();
  const existing = cookieStore.get('sessionId');

  if (!existing?.value) {
    const id = uuidv4();
    cookieStore.set('sessionId', id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
    });
  }
}

export default setNewCookieSession;
