import Image from 'next/image';
import styles from './Estrelas.module.css';

function Estrelas() {
  const avaliacao = 5;

  const estrelas = [];

  for (let i = 0; i < avaliacao; i++) {
    estrelas.push(i);
  }

  return (
    <div className={styles.avaliacoes}>
      {estrelas.map((estrela, index) => {
        const avaliacao = 5;

        const estrelas = [];

        for (let i = 0; i < avaliacao; i++) {
          estrelas.push(i);
        }
        return (
          <Image
            key={index}
            alt="Estrela de avaliacao"
            src={'/produto/pagina/estrelaCheia.svg'}
            width={16}
            height={16}
          />
        );
      })}
    </div>
  );
}

export default Estrelas;
