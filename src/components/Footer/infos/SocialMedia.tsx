import Image from 'next/image';
import styles from './SocialMedia.module.css';
import Link from 'next/link';

export function SocialMedia({ img }: { img: string[] }) {
  return (
    <ul className={styles.socialMedia}>
      {img !== undefined
        ? img.map((image, index) => {
            return (
              <li key={index}>
                <Link
                  href={`${
                    (image === 'Facebook' &&
                      'https://www.facebook.com/profile.php?id=61550563994853') ||
                    (image === 'Instagram' &&
                      'https://www.instagram.com/abayomimakebeauty/') ||
                    (image === 'Tiktok' &&
                      'https://www.tiktok.com/@abayomimakebeauty')
                  }`}
                >
                  <Image
                    alt={image}
                    src={`footer/RedesSociais/${image}.svg`}
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
            );
          })
        : null}
    </ul>
  );
}
