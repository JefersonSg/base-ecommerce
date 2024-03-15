/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import React from 'react';
import styles from './FormComment.module.css';
import Estrelas from '../../../../../compartilhado/estrelas/Estrelas';
import BotaoRedondo from '@/src/components/compartilhado/botoes/BotaoRedondo';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import { validationComment } from './ValidationComment';
import Image from 'next/image';
import {
  type CommentContextInterface,
  useCommentContext
} from '@/src/shared/context/AvaliacaoContext';
import { updateComment } from '@/src/shared/api/UPDATES';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';

const FormEditComment = ({
  setModalForm,
  commentData,
  setTextPopUp,
  setTypePopUp
}: {
  commentData: CommentInterface;
  setModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTextPopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const [stars, setStars] = React.useState(+commentData?.stars);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationComment),
    defaultValues: {
      comment: commentData?.comment
    }
  });

  const [imageUrl, setImageUrl] = React.useState<string | ArrayBuffer | null>(
    commentData?.image?.[0] ?? ''
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
    const newcommentData = {
      commentId: commentData._id,
      userId: commentData._id,
      comment: data?.comment,
      stars,
      image: watchImage
    };
    try {
      const response = await updateComment(newcommentData);

      if (response) {
        router.refresh();
        await refetch();
        setModalForm(false);
        setTextPopUp('Comentario Editado');
        setTypePopUp('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (errors.comment?.message) {
      setTextPopUp(errors?.comment?.message);
      setTypePopUp('error');

      const timeout = setTimeout(() => {
        setTextPopUp('');
        setTypePopUp('');
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
    if (errors?.images?.message) {
      setTextPopUp(errors?.images?.message);
      setTypePopUp('error');

      const timeout = setTimeout(() => {
        setTextPopUp('');
        setTypePopUp('');
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errors, setTextPopUp, setTypePopUp]);

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
            <Estrelas stars={stars} type={0} />
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
        <p className="error">
          {errors?.comment?.message ?? errors?.images?.message ?? ''}
        </p>
        <div onClick={() => handleSubmit(onSubmit)}>
          <BotaoRedondo texto="enviar" />
        </div>
      </form>
    </div>
  );
};

export default FormEditComment;
