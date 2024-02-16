import styles from './Comentario.module.css';
import InformacoesProduto from './Informacoes/InformacoesProduto';
import InformacoesUsuario from './Informacoes/InformacoesUsuario';

interface comentario {
  nome: string;
  data: string;
  estrelas: number;
  cor: string;
  tamanho: string;
  comentario: string;
  imgs: string[];
}

function Comentario({
  nome,
  data,
  estrelas,
  cor,
  tamanho,
  comentario,
  imgs
}: comentario) {
  return (
    <div className={styles.comentario_div}>
      <InformacoesUsuario nome={nome} data={data} stars={estrelas} />
      <InformacoesProduto
        cor={cor}
        tamanho={tamanho}
        comentario={comentario}
        imgs={imgs}
      />
    </div>
  );
}

export default Comentario;
