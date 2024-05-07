import React, { Suspense } from 'react';
import HeaderFetchs from './header-fetchs';

const HeaderContainer = () => {
  return (
    <Suspense>
      <HeaderFetchs />
    </Suspense>
  );
};

export default HeaderContainer;
