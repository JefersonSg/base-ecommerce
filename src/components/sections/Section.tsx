import Produto from '../Produto/Produto';
import { TituloSessao } from '../textos/TituloSessao';
import styles from './Section.module.css';

function Section({
  nomeSessao,
  quantidadeItens,
  IdSessao
}: {
  nomeSessao: string;
  quantidadeItens: number;
  IdSessao: string;
}) {
  return (
    <div className={styles.section}>
      <TituloSessao titulo={nomeSessao} />

      <div className={styles.produtos}>
        <Produto
          nome="Creme Hydra"
          preco="34,94"
          promocao={false}
          img={['produto1']}
        />
        <Produto
          nome="Creme Hydra"
          preco="34,94"
          promocao={false}
          img={['produto1']}
        />
        <Produto
          nome="Creme Hydra"
          preco="34,94"
          promocao={false}
          img={['produto1']}
        />
        <Produto
          nome="Creme Hydra"
          preco="34,94"
          promocao={false}
          img={['produto1']}
        />
      </div>
    </div>
  );
}

export default Section;
