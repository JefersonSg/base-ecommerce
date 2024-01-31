import React from 'react';
import BotaoLi from './BotaoLi';
import styles from './UlLinksUteis.module.css';
import Cookies from 'js-cookie';

function UlLinksUteis() {
  const [isAdmin, setIsAdmin] = React.useState<string | undefined>('');

  React.useEffect(() => {
    setIsAdmin(Cookies.get('isAdmin'));
  }, []);
  return (
    <ul className={styles.linksUteis}>
      {isAdmin && <BotaoLi texto="Dashboard" image="dashboard" />}
      <BotaoLi texto="Atendimento" image="chat" />
      <BotaoLi texto="Rastrear pedido" image="caminhao" />
      <BotaoLi texto="Meus Pedidos" image="caixa" />
      <BotaoLi texto="Minha conta" image="usuario" />
    </ul>
  );
}

export default UlLinksUteis;
