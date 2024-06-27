'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { addViews } from '@/src/shared/api/POST';
import { usePathname } from 'next/navigation';
import setNewCookieSession from '@/src/actions/setCookieSession';

interface Response {
  isBot: boolean;
  localization: object;
  ip: string;
  userAgent: string;
}

const AddViewFunc = () => {
  const pathname = usePathname();
  const SetNewView = React.useCallback(async () => {
    const response = await fetch('/api/ip');
    const data = (await response.json()) as unknown as Response;
    const userToken = Cookies.get('auth_token');
    let sessionId = Cookies.get('sessionId');
    const userIp = data.ip;

    const productId =
      pathname.split('/')[2] === 'produto' &&
      pathname.split('/')[3].length > 20 &&
      pathname.split('/')[3];

    if (!sessionId) {
      setNewCookieSession();
      sessionId = Cookies.get('sessionId');
    }

    const pageView = pathname;

    if (sessionId && !data.isBot) {
      void addViews(userIp, sessionId, productId || '', pageView, userToken);
    }
  }, [pathname]);

  React.useEffect(() => {
    void SetNewView();
  }, [SetNewView]);

  return <></>;
};

export default AddViewFunc;
