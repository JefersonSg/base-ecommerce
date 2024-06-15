import React from 'react';
import styles from './DicaImagem.module.css';
import Image from 'next/image';

const DicaImagem = () => {
  return (
    <div className={styles.dica_modal_container}>
      <h1>Envie boas fotos e melhore seu anuncio</h1>
      <div className={styles.lista}>
        <ul>
          <li>
            {' '}
            <Image
              alt="imagem de seta"
              src={'/dashboard/home/seta_check_blue.svg'}
              width={13}
              height={13}
            />
            Use um editor de fotos para criar um fundo totalmente branco para a
            capa
          </li>
          <li>
            {' '}
            <Image
              alt="imagem de seta"
              src={'/dashboard/home/seta_check_blue.svg'}
              width={13}
              height={13}
            />
            Se precisar mostrar o produto em contexto, faça isso a partir da 2ª
            foto.
          </li>
          <li>
            {' '}
            <Image
              alt="imagem de seta"
              src={'/dashboard/home/seta_check_blue.svg'}
              width={13}
              height={13}
            />
            Evite usar fotos que mostrem uma parede ou outros elementos ao
            fundo.
          </li>
          <li>
            {' '}
            <Image
              alt="imagem de seta"
              src={'/dashboard/home/seta_check_blue.svg'}
              width={13}
              height={13}
            />
            {`Não inclua bordas, logos, marcas d'água, banners nem textos promocionais
        ou links.`}
          </li>
          <li>
            {' '}
            <Image
              alt="imagem de seta"
              src={'/dashboard/home/seta_check_blue.svg'}
              width={13}
              height={13}
            />
            Tire fotos grandes e de diferentes ângulos.
          </li>
          <li>
            {' '}
            <Image
              alt="imagem de seta"
              src={'/dashboard/home/seta_check_blue.svg'}
              width={13}
              height={13}
            />
            Caso você use imagens que encontrou na internet, certifique-se de
            ter autorização expressa do titular de direitos.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DicaImagem;
