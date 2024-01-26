import React from 'react';
import Image from 'next/image';
import styles from './Usuario.module.css';
import Link from 'next/link';

function Usuario({
  ativo,
  setAtivo
}: {
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
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
        <h3 className="titulo_area">Olá, visitante</h3>
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
      </div>
    </div>
  );
}

export default Usuario;
