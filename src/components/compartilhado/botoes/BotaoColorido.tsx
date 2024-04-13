import Image from 'next/image';
import styles from './BotaoColorido.module.css';

interface Botao {
  texto: string;
  img?: string;
  alt?: string;
  caps?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

function BotaoColorido({ texto, img, caps, alt, isLoading, disabled }: Botao) {
  return (
    <button
      className={`${styles.botaoColorido} ${isLoading ? styles.loading : ''} ${
        disabled ? styles.disabled : ''
      }`}
      disabled={disabled}
    >
      {img && (
        <Image alt={`${alt}`} src={`/produto/${img}`} width={23} height={24} />
      )}
      {caps ? texto.toUpperCase() : texto}
    </button>
  );
}

export default BotaoColorido;
