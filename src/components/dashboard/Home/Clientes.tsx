'use client';

import React from 'react';
import { getAllUsers } from '@/src/shared/api/GETS';
import { type AllUserInterface } from '@/src/shared/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import styles from './clientes.module.css';

const Clientes = () => {
  const { data } = useQuery<{ users: AllUserInterface[] }>({
    queryKey: ['all_users'],
    queryFn: getAllUsers
  });

  return (
    <div className={styles.container_clientes}>
      <div className={styles.clientes_container}>
        <h3>Clientes Registrados</h3>
        {data?.users?.map((user) => {
          return (
            <div key={user._id} className={styles.profile_container}>
              <div>
                <Image
                  className={styles.foto_perfil}
                  src={user.image ?? '/profile/profile.svg'}
                  width={40}
                  height={40}
                  alt="imagem do usuário"
                  unoptimized
                />
              </div>
              <div className={styles.data}>
                <p className={styles.nome}>
                  {user?.name} {user.surname}
                </p>
                <p>
                  {user?.createdAt?.slice(0, 10)?.split('-')?.[2]}/
                  {user?.createdAt?.slice(0, 10)?.split('-')?.[1]}/
                  {user?.createdAt?.slice(0, 10)?.split('-')?.[0]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Clientes;
