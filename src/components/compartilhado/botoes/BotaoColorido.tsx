import Image from 'next/image';
import styles from './BotaoColorido.module.css';

interface Botao {
  texto: string;
  img?: string;
  alt?: string;
  caps?: boolean;
  isLoading?: boolean;
}

function BotaoColorido({ texto, img, caps, alt, isLoading }: Botao) {
  return (
    <button
      className={`${styles.botaoColorido} ${isLoading ? styles.loading : ''}`}
    >
      {img && (
        <Image alt={`${alt}`} src={`/produto/${img}`} width={23} height={24} />
      )}
      {caps ? texto.toUpperCase() : texto}
    </button>
  );
}

export default BotaoColorido;
