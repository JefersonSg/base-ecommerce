/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import styles from './FormComment.module.css';
import Estrelas from '../../Estrelas';
import BotaoRedondo from '@/src/components/compartilhado/botoes/BotaoRedondo';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';

import { validationComment } from './ValidationComment';
import Image from 'next/image';
import {
  type CommentContextInterface,
  useCommentContext
} from '@/src/shared/context/AvaliacaoContext';
import { updateComment } from '@/src/shared/api/UPDATES';

interface Comment {
  commentId: string;
  userId: string;
  name: string;
  dataTime: string;
  stars: number;
  color: string;
  size: string;
  comment: string;
  images: string[];
}

const FormEditComment = ({
  setModalForm,
  dataUser,
  dataComment
}: {
  dataComment: Comment;
  dataUser: string;
  setModalForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [stars, setStars] = React.useState(+dataComment?.stars);
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(validationComment),
    defaultValues: {
      comment: dataComment?.comment
    }
  });

  const searshParams = useSearchParams();
  const pathname = searshParams?.toString()?.split('=');
  const idProduct = pathname ? pathname[1] : '';
  const [imageUrl, setImageUrl] = React.useState<string | ArrayBuffer | null>(
    dataComment.images[0]
  );
  const watchImage: File[] = watch('images') as File[];

  const { refetch } = useCommentContext() as CommentContextInterface;

  const handleChange = React.useCallback(() => {
    const reader = new FileReader();

    if (watchImage?.length && typeof watchImage?.[0] === 'object') {
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };

      reader?.readAsDataURL(watchImage?.[0]);
    }
  }, [watchImage]);

  React.useEffect(() => {
    handleChange();
  }, [handleChange, watchImage]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const newDataComment = {
      commentId: dataComment?.commentId,
      idProduct,
      userId: dataUser,
      comment: data.comment,
      stars,
      images: data?.images
    };

    try {
      const response = await updateComment(newDataComment);

      if (response) {
        router.refresh();
        await refetch();
        console.log(response);
        setModalForm(false);
      }
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
          <div>
            {imageUrl && typeof imageUrl === 'string' && (
              <Image
                alt="Imagem upload"
                src={imageUrl ?? ''}
                width={50}
                height={50}
              />
            )}
          </div>
          <input
            type="file"
            id="images"
            style={{ display: 'none' }}
            {...register('images')}
          />
        </div>
        <div onClick={() => handleSubmit(onSubmit)}>
          <BotaoRedondo texto="enviar" />
        </div>
      </form>
    </div>
  );
};

export default FormEditComment;
