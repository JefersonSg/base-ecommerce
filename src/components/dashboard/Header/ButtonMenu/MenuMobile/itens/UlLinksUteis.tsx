import React from 'react';
import BotaoLi from './BotaoLi';
import styles from './UlLinksUteis.module.css';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';

function UlLinksUteis() {
  // const [isAdmin, setIsAdmin] = React.useState<string | undefined>('');
  // const router = useRouter();

  // const isFalseAdmin = React.useCallback(() => {
  //   if (!isAdmin) {
  //     router.push('/');
  //   }
  // }, [isAdmin, router]);

  // React.useEffect(() => {
  //   setIsAdmin(Cookies.get('isAdmin'));
  //   isFalseAdmin();
  // }, [isFalseAdmin]);
  return (
    <ul className={styles.linksUteis}>
      <BotaoLi texto="Home dashboard" image="dashboard" />
      <BotaoLi texto="Retornar a loja" image="home" />
      <BotaoLi texto="Produtos" image="produtosdois" />
      <BotaoLi texto="Pedidos" image="pedidosDashboard" />
      <BotaoLi texto="Categorias" image="categorias" />
      <BotaoLi texto="Sub-categorias" image="subcategorias" />
      <BotaoLi texto="Estatisticas" image="estatistica" />
    </ul>
  );
}

export default UlLinksUteis;
