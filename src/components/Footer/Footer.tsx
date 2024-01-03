import styles from './Footer.module.css';
import { Botoes } from './Botoes/Botoes';

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Botoes />
      </footer>
    </>
  );
}
