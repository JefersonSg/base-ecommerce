import { Titulo } from '@/src/components/compartilhado/textos/Titulo';
import { getOrderByUserId, getUserByToken } from '@/src/shared/api/GETS';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import { cookies } from 'next/headers';
import PedidosContainer from './PedidosContainer';

export default async function PedidosFetch() {
  const token = cookies().get('auth_token')?.value;
  const user = (await getUserByToken(token)) as UserInterface;
  const data = user.user && (await getOrderByUserId(user?.user?._id));

  return (
    <main>
      <Titulo titulo="Pedidos" />
      <PedidosContainer data={data} />
    </main>
  );
}
