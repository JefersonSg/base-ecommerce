'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import setNewCookieSession from '@/src/actions/setCookieSession';
import getCookie from '@/src/actions/getCookie';
import { AddViewFromClient } from '@/src/actions/add-new-view-action';

const AddViewFunc = () => {
  const pathname = usePathname();

  React.useEffect(() => {
    const SetNewView = async () => {
      let sessionId = await getCookie({ nameCookie: 'sessionId' });

      const productId =
        pathname.split('/')?.[2] === 'produto' &&
        pathname.split('/')?.[3]?.length > 20 &&
        pathname.split('/')?.[3];

      if (!sessionId?.value) {
        await setNewCookieSession();
        sessionId = await getCookie({ nameCookie: 'sessionId' });
      }

      if (sessionId?.value && productId) {
        await AddViewFromClient({
          productId,
          pageView: pathname
        });
      }
    };

    void SetNewView();
  }, [pathname]);

  return null;
};

export default AddViewFunc;
