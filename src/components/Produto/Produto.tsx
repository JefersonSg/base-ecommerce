import Image from 'next/image';
import styles from './Produto.module.css';
import Favotiro from './itens/Favotiro';

interface produto {
  img?: string[];
  nome: string;
  preco: string;
  promocao: boolean;
}

function Produto({ img, nome, preco, promocao }: produto) {
  return (
    <div className={styles.produto}>
      <Favotiro />
      <div className={styles.imagemDiv}>
        {img && (
          <Image
            className={styles.imagem}
            alt="Imagem do produto"
            src={`/produto/${img[0]}.png`}
            width={144}
            height={206}
          />
        )}
      </div>
      <div className={styles.infos}>
        <p className={styles.nomeProduto}>{nome}</p>
        <span className={styles.preco}>R$ {preco}</span>
      </div>
    </div>
  );
}

export default Produto;
