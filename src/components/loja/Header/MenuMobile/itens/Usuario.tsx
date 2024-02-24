import React from 'react';
import Image from 'next/image';
import styles from './Usuario.module.css';
import Link from 'next/link';
import { getUserByToken } from '@/src/shared/api/GETS';
import { useQuery } from '@tanstack/react-query';
import { type UserInterface } from '@/src/shared/helpers/interfaces';

function Usuario({
  ativo,
  setAtivo
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data } = useQuery<{ user: UserInterface; isAdmin: boolean }>({
    queryKey: ['user'],
    queryFn: getUserByToken
  });

  return (
    <div className={styles.usuario}>
      <div className={styles.fotoUsuario}>
        <Image
          alt="Foto do usuario"
          src={'/header/Menu/usuario.svg'}
          width={40}
          height={40}
        />
      </div>
      <div className={styles.boasVindas}>
        <h3 className="titulo_area">
          Olá,{' '}
          {data
            ? `${data?.user?.name + ' ' + data?.user?.surname?.split(' ')[0]}`
            : 'Visitante'}
        </h3>
        {!data ? (
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
        )}
      </div>
    </div>
  );
}

export default Usuario;
