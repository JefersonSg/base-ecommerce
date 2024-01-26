import Caracteristicas from './Caracteristicas';
import Composicao from './Composicao';
import Descricao from './Descricao';
import Entrega from './Entrega';

function Sections() {
  return (
    <div>
      <Entrega />
      <Descricao />
      <Composicao />
      <Caracteristicas />
    </div>
  );
}

export default Sections;
