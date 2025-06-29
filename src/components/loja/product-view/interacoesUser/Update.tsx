import Image from 'next/image';
import styles from './Update.module.css';
import { cookies } from 'next/headers';
import Link from 'next/link';

function Update({ id }: { id: string }) {
  const isAdmin = cookies().get('isAdmin')?.value;

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
              unoptimized
            />
          </Link>
        </div>
      )}
    </>
  );
}

export default Update;
