/* eslint-disable react-hooks/rules-of-hooks */
import { setCookie, hasCookie } from 'cookies-next/client';
import { v4 as uuidv4 } from 'uuid';

function setNewCookieSession() {
  const exist = hasCookie('sessionId');
  if (!exist) {
    const id = uuidv4();
    setCookie('sessionId', id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
    });
  }
}

export default setNewCookieSession;
