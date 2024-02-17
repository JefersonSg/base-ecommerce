'use client';

import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Comentario from './Comentario';
import styles from './Comentarios.module.css';

import FormComment from './formComment/FormComment';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  type CommentContextInterface,
  useCommentContext
} from '@/src/shared/context/AvaliacaoContext';

interface User {
  user: {
    _id: string;
  };
}

function Comentarios() {
  const [modalForm, setModalForm] = React.useState(false);
  const { data } = useQuery<User>({
    queryKey: ['user']
  });
  const { dataComments } = useCommentContext() as CommentContextInterface;

  React.useEffect(() => {
    dataComments?.comments?.forEach((comment) => {
      if (comment?.userId === data?.user?._id) console.log('existe');
    });
  }, [data, dataComments]);
  return (
    <div className={styles.comentarios_container}>
      <div className={styles.botao_comentar}>
        <div
          onClick={() => {
            setModalForm(!modalForm);
          }}
        >
          <BotaoColorido texto="Comentar" />
        </div>
        {modalForm && data && (
          <FormComment dataUser={data} setModalForm={setModalForm} />
        )}
      </div>
      {dataComments?.comments?.map((comment, index) => {
        return (
          <Comentario
            key={index}
            data={comment?.date}
            nome={'Ludimila'}
            estrelas={comment?.stars}
            imgs={comment?.images}
            tamanho="300ml"
            cor="Branco"
            comentario={comment?.comment}
          />
        );
      })}
    </div>
  );
}

export default Comentarios;
