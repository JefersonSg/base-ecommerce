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

import { updateComment } from '@/src/shared/api/UPDATES';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import { revalidatePathAction } from '@/src/actions/revalidates';

const FormEditComment = ({
  setModalForm,
  commentData,
  setMessagePopUp,
  setTypePopUp,
  refetch
}: {
  commentData: CommentInterface;
  setModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  refetch: any;
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

  const [isLoading, setIsloading] = React.useState(false);
  const watchImage: File[] = watch('images') as File[];

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
      image: watchImage,
      productId: commentData.productId
    };
    if (!isLoading) {
      setIsloading(true);
      try {
        const response = await updateComment(newcommentData);

        if (response) {
          await revalidatePathAction(`/produto?_id=${commentData.productId}`);
          router.refresh();
          await refetch();
          setModalForm(false);
          setMessagePopUp('Comentario Editado');
          setTypePopUp('');
        }
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        console.log(error);
        setTypePopUp('error');
        setMessagePopUp('Erro ao atualizar o comentario');
      }
    }
  };

  React.useEffect(() => {
    if (errors.comment?.message) {
      setTypePopUp('error');
      setMessagePopUp(errors?.comment?.message);
    }
    if (errors?.images?.message) {
      setTypePopUp('error');
      setMessagePopUp(errors?.images?.message);
    }
  }, [errors, setMessagePopUp, setTypePopUp]);

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
          <BotaoRedondo disabled={isLoading} texto="enviar" />
        </div>
      </form>
    </div>
  );
};

export default FormEditComment;
