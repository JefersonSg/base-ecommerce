'use client';

import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Comentario from './Comentario';
import styles from './Comentarios.module.css';

import { type ProductApi } from '@/src/shared/helpers/interfaces';
import FormComment from './formComment/FormComment';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface User {
  user: {
    _id: string;
  };
}

function Comentarios({ dataComments }: { dataComments: ProductApi }) {
  const [modalForm, setModalForm] = React.useState(false);
  const { data } = useQuery<User>({
    queryKey: ['user']
  });

  console.log(data?.user?._id);
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
          <>
            <p>{comment.userId}</p>
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
          </>
        );
      })}
    </div>
  );
}

export default Comentarios;
