'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import setNewCookieSession from '@/src/actions/setCookieSession';
import { AddNewView } from '@/src/actions/add-new-view';
import { useGetCookie } from 'cookies-next';

const AddViewFunc = () => {
  const pathname = usePathname();
  const getCookie = useGetCookie();
  const SetNewView = React.useCallback(async () => {
    let sessionId = getCookie('sessionId');

    const productId =
      pathname.split('/')?.[2] === 'produto' &&
      pathname.split('/')?.[3]?.length > 20 &&
      pathname.split('/')?.[3];

    if (!sessionId) {
      setNewCookieSession();
      sessionId = getCookie('sessionId');
    }

    const pageView = pathname;

    if (sessionId) {
      void AddNewView({
        pageView,
        productId: productId || ''
      });
    }
  }, [getCookie, pathname]);

  React.useEffect(() => {
    void SetNewView();
  }, [SetNewView]);

  return <></>;
};

export default AddViewFunc;
