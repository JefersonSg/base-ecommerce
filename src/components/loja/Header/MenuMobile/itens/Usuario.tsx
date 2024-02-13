import React from 'react';
import Image from 'next/image';
import styles from './Usuario.module.css';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
}

function Usuario({
  ativo,
  setAtivo,
  userData
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  userData: { user: User } | null;
}) {
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
          {userData
            ? `${
                userData?.user.name +
                ' ' +
                userData?.user.surname?.split(' ')[0]
              }`
            : 'Visitante'}
        </h3>
        {!userData ? (
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
