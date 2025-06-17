import Image from 'next/image';
import styles from './Update.module.css';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getCookie } from 'cookies-next/server';

async function Update({ id }: { id: string }) {
  const isAdmin = await getCookie('isAdmin', { cookies });

  return (
    <>
      {isAdmin && (
        <div className={styles.update}>
          <Link href={`/dashboard/produtos/${id}`}>
            <Image
              alt="Foto de coração para favoritar o produto"
              src={'/dashboard/edit.svg'}
              width={18}
              height={16}
            />
          </Link>
        </div>
      )}
    </>
  );
}

export default Update;
