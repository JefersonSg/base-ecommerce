import Image from 'next/image';
import styles from './NavButtons.module.css';

export default async function ProfileNAvBUttons() {
  return (
    <nav className={styles.botoes_navegacao}>
      <ul>
        <li>
          <Image
            alt="Imagem de caixa ilustrando compras"
            src={'/profile/compras.svg'}
            width={24}
            height={24}
          />
          <p>Compras</p>
        </li>
        <li>
          <Image
            alt="Imagem ilustrativa de informacoes do usuario"
            src={'/profile/informacoes.svg'}
            width={24}
            height={24}
          />
          <p>Informações</p>
        </li>
      </ul>
    </nav>
  );
}
