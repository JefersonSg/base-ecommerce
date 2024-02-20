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
      {isAdmin && (
        <BotaoLi texto="Dashboard" image="dashboard" pathname="/dashboard" />
      )}

      <BotaoLi texto="Atendimento" image="chat" pathname="/atendimento" />
      <BotaoLi
        texto="Rastrear pedido"
        image="caminhao"
        pathname="/rastrear-pedido"
      />
      <BotaoLi texto="Meus Pedidos" image="caixa" pathname="meus-pedidos" />
      <BotaoLi texto="Minha conta" image="usuario" pathname="minha-conta" />
    </ul>
  );
}

export default UlLinksUteis;
