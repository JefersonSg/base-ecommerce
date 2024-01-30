/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect } from 'react';

import { redirect } from 'next/navigation';
import { UserContext } from '../context';

export default function isAuth(Component: any) {
  const { authenticated } = React.useContext(UserContext);
  return function IsAuth(props: any) {
    const auth = authenticated;
    useEffect(() => {
      if (!auth) {
        return redirect('/');
      }
    }, [auth]);
    if (!auth) {
      return null;
    }
    return <Component {...props} />;
  };
}
