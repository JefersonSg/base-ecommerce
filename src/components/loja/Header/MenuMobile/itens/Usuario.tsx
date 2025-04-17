import React from 'react';
import Image from 'next/image';
import styles from './Usuario.module.css';
import Link from 'next/link';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import { useUserContext } from '@/src/shared/context';

function Usuario({
  userData,
  ativo,
  setAtivo
}: {
  userData: UserInterface;
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { logout } = useUserContext();
  return (
    <div className={styles.usuario}>
      <div className={styles.fotoUsuario}>
        <Image
          alt="Foto do usuario"
          src={userData?.user?.image ?? '/header/Menu/usuario.svg'}
          width={40}
          height={40}
          quality={50}
        />
      </div>
      <div className={styles.boasVindas}>
        <h3 className="titulo_area">
          Olá,{' '}
          {userData?.user
            ? `${
                userData?.user?.name?.split(' ')[0] +
                ' ' +
                userData?.user?.surname?.split(' ')[0]
              }`
            : 'Visitante'}
        </h3>
        {!userData?.user ? (
          <p>
            <Link
              onClick={() => {
                setAtivo(!ativo);
              }}
              href={'/login'}
            >
              Entre
            </Link>{' '}
            ou{' '}
            <Link
              onClick={() => {
                setAtivo(!ativo);
              }}
              href={'/registrar'}
            >
              Cadastre-se
            </Link>
          </p>
        ) : (
          <div className={styles.acoes_usuario}>
            <p>
              <Link
                onClick={() => {
                  setAtivo(!ativo);
                }}
                href={'/minha-conta'}
              >
                Ver meu perfil
              </Link>{' '}
            </p>
            <p
              className={styles.sair}
              onClick={() => {
                void logout();
              }}
            >
              Sair
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Usuario;
