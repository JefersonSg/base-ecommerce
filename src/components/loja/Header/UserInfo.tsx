import { getUserByToken } from '@/src/shared/api/GETS';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import Container2 from './Container2';
import MenuMobile from './MenuMobile/MenuMobile';

const UserInfo = async () => {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const userData = (await getUserByToken(token)) as UserInterface;

  return (
    <div>
      <Suspense>
        <MenuMobile userData={userData} />
      </Suspense>
      <Container2 userData={userData} />
    </div>
  );
};

export default UserInfo;
