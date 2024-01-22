import { Texto } from '@/src/components/textos/Texto';
import { Titulo } from '@/src/components/textos/Titulo';
import React from 'react';

const page = () => {
  return (
    <div>
      <Titulo titulo="REGRAS FRETE GRÁTIS" />

      <Texto
        texto="- O envio por Frete Grátis é uma cortesia da loja,
                e contém algumas regras para que tenha efeito,
                seu envio é realizado por escolha da LOJA, independentemente da
                opção escolhida pelo cliente durante o momento da compra no site."
      />

      <Texto
        texto="- O envio pode ser realizado através dos Correios 
                        via PAC ou Sedex ou IS Entregas (Transportadora). "
      />

      <Texto
        texto="- Para a região de Campinas - 
                    SP e algumas regiões metropolitanas,
                     o envio pode ser realizado via motoboy. "
      />
      <Texto
        texto="- Caso o cliente opte pelo frete mais rápido, 
      o valor do envio será cobrado integralmente. "
      />
    </div>
  );
};

export default page;
