'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

function setNewCookieSession() {
  if (!cookies().get('sessionId')?.value) {
    const id = uuidv4();
    cookies().set('sessionId', id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
    });
  }
}

export default setNewCookieSession;
