import Image from 'next/image';
import styles from './SocialMedia.module.css';

export function SocialMedia({ img }: { img: string[] }) {
  return (
    <div className={styles.socialMedia}>
      {img !== undefined
        ? img.map((image) => {
            return (
              <>
                <Image
                  alt={image}
                  src={`footer/RedesSociais/${image}.svg`}
                  width={24}
                  height={24}
                />
              </>
            );
          })
        : null}
    </div>
  );
}
