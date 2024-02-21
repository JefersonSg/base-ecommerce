'use client';

import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Comentario from './Comentario';
import styles from './Comentarios.module.css';

import FormComment from './formComment/FormComment';
import React, { Suspense } from 'react';
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
  const [Commented, setCommented] = React.useState(true);

  React.useEffect(() => {
    setCommented(false);
    dataComments?.comments?.forEach((comment) => {
      if (comment?.userId === data?.user?._id) {
        setCommented(true);
      }
    });
  }, [data, dataComments]);

  return (
    <Suspense>
      <div className={styles.comentarios_container}>
        {!Commented && (
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
        )}
        <h3 className={`titulo_sessao ${styles.titulo_comentario}`}>
          Commentários
        </h3>
        {dataComments?.comments?.map((comment, index) => {
          return <Comentario key={index} commentData={comment} />;
        })}
      </div>
    </Suspense>
  );
}

export default Comentarios;
