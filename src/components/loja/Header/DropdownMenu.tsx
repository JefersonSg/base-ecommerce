import React from 'react';
import styles from './DropdownMenu.module.css';
import Link from 'next/link';
import { useUserContext } from '@/src/shared/context';

const DropdownMenu = ({ nomeUser }: { nomeUser: string }) => {
  const { logout } = useUserContext();

  return (
    <div className={styles.dropdownMenu}>
      <span className={styles.triangulo}></span>
      <p className={styles.saudacao}>Bem-Vindo(a)</p>
      <span className={styles.nome_user}>Olá {nomeUser?.split(' ')?.[0]}</span>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href={'/minha-conta/pedidos'}>Meus Pedidos</Link>
          </li>
          <li>
            <Link href={'/minha-conta'}>Minha Conta</Link>
          </li>
          <span
            className={styles.btn_sair}
            onClick={() => {
              void logout();
            }}
          >
            Sair
          </span>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;
