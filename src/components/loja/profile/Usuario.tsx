import Image from 'next/image';
import BotaoRedondo from '../../compartilhado/botoes/BotaoRedondo';
import styles from './Usuario.module.css';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import Link from 'next/link';

export default async function ProfileUSuario({
  userData
}: {
  userData: UserInterface;
}) {
  return (
    <div className={styles.usuario_div}>
      <Image
        src={`${userData?.user?.image ?? '/profile/profile.svg'}`}
        alt="Foto de perfil do usuario"
        width={84}
        height={84}
      />
      <h2 className={styles.nome_usuario}>
        {userData?.user?.name
          ? `${userData?.user?.name} ${userData?.user?.surname}`
          : 'Nome do usuario'}
      </h2>
      <Link href={'/minha-conta/editar'}>
        <BotaoRedondo texto="Editar perfil" style2={true} />
      </Link>
    </div>
  );
}
