import React from 'react';
import Cards from '@/src/components/dashboard/Home/Cards';
import Clientes from '@/src/components/dashboard/Home/Clientes';

const page = async () => {
  return (
    <div className={`container_dashboard`}>
      <div>
        <Cards />
      </div>
      <div>
        <Clientes />
      </div>
    </div>
  );
};

export default page;
