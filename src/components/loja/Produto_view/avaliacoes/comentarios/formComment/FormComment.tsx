/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import styles from './FormComment.module.css';
import Estrelas from '../../Estrelas';
import BotaoRedondo from '@/src/components/compartilhado/botoes/BotaoRedondo';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { createComment } from '@/src/shared/api/CREATE';
import { validationComment } from './ValidationComment';

// interface CommentInterface {
//   comment: string;
//   stars: number;
//   images: any;
// }

const FormComment = () => {
  const [stars, setStars] = React.useState(1);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationComment)
  });
  const pathname = window?.location?.href?.split('=');
  const idProduct = pathname ? pathname[1] : '';

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const dataComment = {
      idProduct,
      comment: data.comment,
      stars,
      images: data.images
    };
    try {
      const response = await createComment(dataComment);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.form_comment_container}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="stars">Avalie o produto</label>
          <div className={styles.stars}>
            <input
              type="radio"
              name="stars"
              value={1}
              onClick={() => {
                setStars(1);
              }}
            />
            <input
              type="radio"
              name="stars"
              value={2}
              onClick={() => {
                setStars(2);
              }}
            />
            <input
              type="radio"
              name="stars"
              value={3}
              onClick={() => {
                setStars(3);
              }}
            />
            <input
              type="radio"
              name="stars"
              value={4}
              onClick={() => {
                setStars(4);
              }}
            />
            <input
              type="radio"
              name="stars"
              value={5}
              onClick={() => {
                setStars(5);
              }}
            />
            <Estrelas stars={stars} />
          </div>
        </div>
        <div>
          <label htmlFor="comment">Escreva um comentário</label>
          <textarea
            className={styles.textoArea}
            id="comment"
            cols={30}
            rows={10}
            {...register('comment')}
          ></textarea>
        </div>
        <div>
          <label htmlFor="images" className={styles.label_foto}>
            Escolha uma foto
          </label>
          <input
            type="file"
            id="images"
            style={{ display: 'none' }}
            {...register('images')}
          />
        </div>
        <BotaoRedondo texto="enviar" />
      </form>
    </div>
  );
};

export default FormComment;
