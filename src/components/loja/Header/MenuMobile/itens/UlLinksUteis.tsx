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
        <BotaoLi texto="Dashboard" image="dashboard" link="dashboard" />
      )}
      <BotaoLi texto="Atendimento" image="chat" link="atendimento" />
      <BotaoLi
        texto="Rastrear pedido"
        image="caminhao"
        link="rastrear-pedido"
      />
      <BotaoLi texto="Meus Pedidos" image="caixa" link="meus-pedidos" />
      <BotaoLi texto="Minha conta" image="usuario" link="minha-conta" />
    </ul>
  );
}

export default UlLinksUteis;
