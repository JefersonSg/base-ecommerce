'use client';

import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Comentario from './Comentario';
import styles from './Comentarios.module.css';

import FormComment from './formComment/FormComment';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import PopUpMessage from '@/src/components/compartilhado/messages/PopUpMessage';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import { useParams } from 'next/navigation';
import { getAllComments } from '@/src/shared/api/GETS';
import LoadingAnimation from '@/src/components/compartilhado/loading/loadingAnimation';

interface User {
  user: {
    _id: string;
  };
}
export interface PageParams {
  id: string;
}

function Comentarios() {
  const pathname = useParams() as unknown as PageParams;
  const [modalForm, setModalForm] = React.useState(false);
  const { data } = useQuery<User>({
    queryKey: ['user']
  });
  const dataComments = useQuery<{ comments: CommentInterface[] }>({
    queryKey: ['comments-id-' + pathname?.id],
    queryFn: async () => {
      return await getAllComments(pathname?.id);
    }
  });

  const [Commented, setCommented] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messagePopUp, setMessagePopUp] = React.useState('');
  const [typePopUp, setTypePopUp] = React.useState('');

  React.useEffect(() => {
    setCommented(false);
    dataComments.data?.comments?.forEach((comment) => {
      if (comment?.userId === data?.user?._id) {
        setCommented(true);
      }
    });
  }, [data, dataComments]);

  return (
    <>
      <div className={styles.comentarios_container}>
        {!Commented && data?.user && (
          <div className={styles.botao_comentar}>
            <div
              onClick={() => {
                setModalForm(!modalForm);
              }}
            >
              <BotaoColorido texto={modalForm ? 'Cancelar' : 'Comentar'} />
            </div>
            {modalForm && data && (
              <FormComment
                dataUser={data}
                refetch={dataComments.refetch}
                setModalForm={setModalForm}
                setMessagePopUp={setMessagePopUp}
                setTypePopUp={setTypePopUp}
              />
            )}
          </div>
        )}
        {dataComments.data?.comments[0] && (
          <h3 className={`titulo_sessao ${styles.titulo_comentario}`}>
            Commentários
          </h3>
        )}
        {dataComments?.data?.comments?.map((comment, index) => {
          return (
            <Comentario
              setIsLoading={setIsLoading}
              key={index}
              commentData={comment}
              setMessagePopUp={setMessagePopUp}
              setTypePopUp={setTypePopUp}
            />
          );
        })}
      </div>
      {messagePopUp && (
        <PopUpMessage
          text={messagePopUp}
          typePopUp={typePopUp}
          setTypePopUp={setTypePopUp}
          setMessagePopUp={setMessagePopUp}
        />
      )}
      {isLoading && <LoadingAnimation />}
    </>
  );
}

export default Comentarios;
