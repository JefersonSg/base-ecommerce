import React from 'react';

const Formulario = () => {
  return (
    <form action="">
      <input type="text" placeholder="Cidade" />
      <input type="text" placeholder="Rua" />
      <input type="text" placeholder="Bairro" />
      <input type="text" placeholder="CEP" />

      <div>
        <input type="text" placeholder="Casa" />
        <input type="text" placeholder="Numero" />
      </div>
    </form>
  );
};

export default Formulario;
