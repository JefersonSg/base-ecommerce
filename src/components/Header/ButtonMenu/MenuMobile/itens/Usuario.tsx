import Image from 'next/image';
import styles from './Usuario.module.css';
import { TituloArea } from '@/src/components/textos/TituloArea';
import Link from 'next/link';

function Usuario() {
  return (
    <div className={styles.usuario}>
      <div className={styles.fotoUsuario}>
        <Image
          alt="Foto do usuario"
          src={'/header/Menu/usuario.svg'}
          width={40}
          height={40}
        />
      </div>
      <div className={styles.boasVindas}>
        <TituloArea titulo="Olá, visitante" />
        <p>
          <Link href={'/login'}>Entre</Link> ou{' '}
          <Link href={'/registrar'}>Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Usuario;
