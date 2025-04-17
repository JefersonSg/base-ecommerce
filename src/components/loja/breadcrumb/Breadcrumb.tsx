'use client';

import Link from 'next/link';
import styles from './Breadcrumb.module.css';

function Breadcrumb({
  texto1,
  texto2,
  texto3,
  texto4,
  texto5,
  link1,
  link2,
  link3,
  link4,
  link5
}: {
  texto1: string;
  texto2?: string;
  texto3?: string;
  texto4?: string;
  texto5?: string;
  link1?: string;
  link2?: string;
  link3?: string;
  link4?: string;
  link5?: string;
}) {
  return (
    <div className={styles.breadcrumb}>
      {<Link href={'/'}>Home </Link>}
      {texto1 ? (
        link1 ? (
          <Link href={link1}>
            {'>'} {texto1}
          </Link>
        ) : (
          <p>
            {'>'} {texto1}
          </p>
        )
      ) : (
        ''
      )}
      {texto2 ? (
        link2 ? (
          <Link href={link2}>
            {'>'} {texto2}
          </Link>
        ) : (
          <p>
            {'>'} {texto2}
          </p>
        )
      ) : (
        ''
      )}
      {texto3 ? (
        link3 ? (
          <Link href={link3}>
            {'>'} {texto3}
          </Link>
        ) : (
          <p>
            {'>'} {texto3}
          </p>
        )
      ) : (
        ''
      )}
      {texto4 ? (
        link4 ? (
          <Link href={link4}>
            {'>'} {texto4}
          </Link>
        ) : (
          <p>
            {'>'} {texto4}
          </p>
        )
      ) : (
        ''
      )}
      {texto5 ? (
        link5 ? (
          <Link href={link5}>
            {'>'} {texto5}
          </Link>
        ) : (
          <p>
            {'>'} {texto5}
          </p>
        )
      ) : (
        ''
      )}
    </div>
  );
}

export default Breadcrumb;
