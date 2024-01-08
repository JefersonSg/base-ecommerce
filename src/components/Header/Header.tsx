import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu/ButtonMenu';
import { InfosDestaques } from './InfosDestaques';
import Image from 'next/image';

export function Header() {
  return (
    <>
      <InfosDestaques />
      <header className={styles.header}>
        <div className={styles.container1}>
          <ButtonMenu />

          <Image
            alt="Lupa"
            src={'header/icons/lupa.svg'}
            width={24}
            height={24}
          />
        </div>
        <div className={styles.logo}>
          <Image alt="Logo" src={'/header/Logo.svg'} width={60} height={42} />
        </div>
        <div className={styles.container2}>
          <Image
            alt="Imagem de coração"
            src={'header/icons/coracao.svg'}
            width={24}
            height={24}
          />
          <Image
            alt="Imagem de carrinho"
            src={'header/icons/carrinho.svg'}
            width={24}
            height={24}
          />
        </div>
      </header>
    </>
  );
}
