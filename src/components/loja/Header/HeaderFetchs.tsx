import { Header } from './Header';
import { getUserByToken } from '@/src/shared/api/GETS';
import { cookies } from 'next/headers';
import { type UserInterface } from '@/src/shared/helpers/interfaces';

export default async function HeaderFetchs() {
  const token = cookies().get('auth_token')?.value;
  const userData = (await getUserByToken(token)) as UserInterface;

  return <Header userData={userData} />;
}
