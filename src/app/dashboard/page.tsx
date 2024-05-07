import React from 'react';
import Cards from '@/src/components/dashboard/Home/Cards';
import ProdutosMaisVendidos from '@/src/components/dashboard/Home/Cards/ProdutosMaisVendidos';
import PedidosRecentes from '@/src/components/dashboard/Home/PedidosRecentes';
import Clientes from '@/src/components/dashboard/Home/Clientes';

const page = () => {
  return (
    <div className={`container_dashboard`}>
      <div>
        <Cards />
        <ProdutosMaisVendidos />
      </div>
      <div>
        <PedidosRecentes />
        <Clientes />
      </div>
    </div>
  );
};

export default page;
