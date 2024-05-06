import React from 'react';
import BotaoLi from './BotaoLi';
import styles from './UlLinksUteis.module.css';
import Cookies from 'js-cookie';

function UlLinksUteis() {
  const [isAdmin, setIsAdmin] = React.useState<string | undefined>('');
  const [auth, setAuth] = React.useState<string | undefined>('');

  React.useEffect(() => {
    setIsAdmin(Cookies.get('isAdmin'));
  }, []);

  React.useEffect(() => {
    setAuth(Cookies.get('auth_token'));
  }, []);

  return (
    <ul className={styles.linksUteis}>
      {isAdmin && (
        <BotaoLi texto="Dashboard" image="dashboard" pathname="/dashboard" />
      )}

      {/* <BotaoLi texto="Atendimento" image="chat" pathname="/atendimento" /> */}
      {/* <BotaoLi
        texto="Rastrear pedido"
        image="caminhao"
        pathname="/minha-conta/pedidos"
      /> */}
      <BotaoLi
        texto="Meus Pedidos"
        image="caixa"
        pathname="/minha-conta/pedidos"
      />
      <BotaoLi
        texto="Minha conta"
        image="usuario"
        pathname={auth ? 'minha-conta' : 'login'}
      />
    </ul>
  );
}

export default UlLinksUteis;
