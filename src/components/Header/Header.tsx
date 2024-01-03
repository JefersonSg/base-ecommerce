import styles from './Header.module.css';
import { ButtonMenu } from './ButtonMenu';
import { InfosDestaques } from './InfosDestaques';

export function Header() {
  return (
    <>
      <InfosDestaques />
      <header className={styles.header}>
        <ButtonMenu />
        <div>okokok</div>
      </header>
    </>
  );
}
