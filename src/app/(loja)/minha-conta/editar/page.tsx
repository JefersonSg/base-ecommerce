import ProfileContainerEdit from '@/src/components/loja/profile/editar/Profile_container_edit';
import { getUserByToken } from '@/src/shared/api/GETS';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import { cookies } from 'next/headers';

export default async function EditarPage() {
  const token = cookies().get('auth_token')?.value;
  const user = (await getUserByToken(token)) as UserInterface;

  return (
    <main>
      <ProfileContainerEdit userData={user} />
    </main>
  );
}
