'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import setNewCookieSession from '@/src/actions/setCookieSession';
import { AddNewView } from '@/src/actions/add-new-view';
import getCookie from '@/src/actions/getCookie';

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
    let sessionId = await getCookie({ nameCookie: 'sessionId' });
    const userIp = data.ip;

    const productId =
      pathname.split('/')[2] === 'produto' &&
      pathname.split('/')[3].length > 20 &&
      pathname.split('/')[3];

    if (!sessionId?.value) {
      setNewCookieSession();
      sessionId = await getCookie({ nameCookie: 'sessionId' });
    }

    const pageView = pathname;

    if (sessionId?.value && !data.isBot) {
      void AddNewView({
        ipUser: userIp,
        pageView,
        productId: productId || ''
      });
    }
  }, [pathname]);

  React.useEffect(() => {
    void SetNewView();
  }, [SetNewView]);

  return <></>;
};

export default AddViewFunc;
