/* eslint-disable react/jsx-key */
import React from 'react';
import styles from './UlLinksUteis.module.css';

import BtnDashboard from './Botoes/BtnDashboard';
import BtnCategoria from './Botoes/BtnCategoria';
import BtnPedidos from './Botoes/BtnPedidos';
import BtnProdutos from './Botoes/BtnProdutos';
import BtnSubcategoria from './Botoes/BtnSubcategoria';
import BtnHome from './Botoes/BtnHome';
import BtnEstatistica from './Botoes/BtnEstatistica';

function UlLinksUteis() {
  return (
    <ul className={styles.linksUteis}>
      <h2 className={styles.titulo_sideBar}>Main</h2>
      <BtnDashboard texto="Home dashboard" link="/dashboard" />
      <BtnHome texto="Retornar a loja" link="/" />
      <BtnPedidos texto="Pedidos" link={'/dashboard/pedidos'} />
      <BtnProdutos texto="Produtos" link="/dashboard/produtos" />
      <BtnCategoria texto="Categorias" link="/dashboard/categorias" />
      <BtnSubcategoria texto="Subcategorias" link="/dashboard/subcategorias" />
      <BtnEstatistica texto="Estatísticas" link="/dashboard/estatisticas" />
    </ul>
  );
}

export default UlLinksUteis;
