'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { addViews } from '@/src/shared/api/POST';

const AddViewFunc = ({ productId }: { productId?: string }) => {
  const teste = React.useCallback(async () => {
    const teste = await fetch('/api/ip');
    const userToken = Cookies.get('auth_token');
    const isAdmin = Cookies.get('isAdmin');

    const userIp = await teste.json();

    if (!isAdmin) {
      void addViews(userIp, productId, userToken);
    }
  }, [productId]);

  React.useEffect(() => {
    void teste();
  }, [teste]);

  return <div></div>;
};

export default AddViewFunc;
