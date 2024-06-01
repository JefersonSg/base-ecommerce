'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

function setNewCookieSession() {
  if (!cookies().get('sessionId')?.value) {
    const teste = uuidv4();
    cookies().set('sessionId', teste);
  }
}

export default setNewCookieSession;
