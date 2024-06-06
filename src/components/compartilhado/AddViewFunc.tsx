'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { addViews } from '@/src/shared/api/POST';
import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddViewFunc = ({ productId }: { productId?: string }) => {
  const pathname = usePathname();
  const SetNewView = React.useCallback(async () => {
    const response = await fetch('/api/ip');
    const userToken = Cookies.get('auth_token');
    const isAdmin = Cookies.get('isAdmin');
    let sessionId = Cookies.get('sessionId');
    const userIp = await response.json();

    if (!sessionId) {
      Cookies.set('sessionId', uuidv4());
      sessionId = Cookies.get('sessionId');
    }

    const pageView = !productId ? pathname : '';

    if (!isAdmin && sessionId) {
      void addViews(userIp, sessionId, productId ?? '', pageView, userToken);
    }
  }, [pathname, productId]);

  React.useEffect(() => {
    void SetNewView();
  }, [SetNewView]);

  return <></>;
};

export default AddViewFunc;
