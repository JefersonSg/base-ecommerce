import Image from 'next/image';
import styles from './SocialMedia.module.css';
import Link from 'next/link';

export function SocialMedia({ img }: { img: string[] }) {
  return (
    <ul className={styles.social_media}>
      {img !== undefined
        ? img.map((image, index) => {
            return (
              <li key={index}>
                <Link
                  href={`${
                    (image === 'Facebook.svg' &&
                      'https://www.facebook.com/profile.php?id=100087962664815') ||
                    (image === 'Instagram.svg' &&
                      'https://www.instagram.com/lojamayse/') ||
                    (image === 'Tiktok.svg' &&
                      'https://www.tiktok.com/@loja.mayse') ||
                    (image === 'Whatsapp.svg' &&
                      'https://api.whatsapp.com/send/?phone=5522998092154&text=Ol%C3%A1%2C+gostaria+de+tirar+uma+duvida&type=phone_number&app_absent=0')
                  }`}
                >
                  <Image
                    alt={image}
                    src={`/footer/RedesSociais/${image}`}
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
