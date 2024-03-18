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

function UlLinksUteis({
  setAtivo
}: {
  setAtivo?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <ul className={styles.linksUteis}>
      <h2 className={'titulo_sideBar'}>Main</h2>

      <BtnHome texto="Retornar a loja" link="/" setAtivo={setAtivo} />
      <BtnDashboard
        texto="Home dashboard"
        link="/dashboard"
        setAtivo={setAtivo}
      />
      <BtnPedidos
        texto="Pedidos"
        link={'/dashboard/pedidos'}
        setAtivo={setAtivo}
      />
      <BtnProdutos
        texto="Produtos"
        link="/dashboard/produtos"
        setAtivo={setAtivo}
      />
      <BtnCategoria
        texto="Categorias"
        link="/dashboard/categorias"
        setAtivo={setAtivo}
      />
      <BtnSubcategoria
        texto="Subcategorias"
        link="/dashboard/subcategorias"
        setAtivo={setAtivo}
      />
      <BtnEstatistica
        texto="Estatísticas"
        link="/dashboard/estatisticas"
        setAtivo={setAtivo}
      />
    </ul>
  );
}

export default UlLinksUteis;
