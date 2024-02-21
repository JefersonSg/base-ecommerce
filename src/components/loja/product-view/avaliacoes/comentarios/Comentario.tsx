'use client';

/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import styles from './Comentario.module.css';
import InformacoesProduto from './Informacoes/InformacoesProduto';
import InformacoesUsuario from './Informacoes/InformacoesUsuario';
import {
  type CommentContextInterface,
  useCommentContext
} from '@/src/shared/context/AvaliacaoContext';
import React from 'react';
import Cookies from 'js-cookie';
import { deleteComment } from '@/src/shared/api/DELETE';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import ModalEdit from '@/src/components/compartilhado/modals/ModalEdit';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import { getUserById } from '@/src/shared/api/GETS';

interface User {
  user: {
    _id: string;
    name: string;
  };
}

function ModalDeleteSearsh({
  productId,
  commentId,
  setModalDelete,
  refetch
}: {
  productId: string;
  commentId: string;
  setModalDelete: any;
  refetch: any;
}) {
  return (
    <ModalDelete
      id1={commentId}
      setState={setModalDelete}
      text="Deseja mesmo deletar esse comentário?"
      funcDelete={deleteComment}
      refetch={refetch}
    />
  );
}

function Comentario({ commentData }: { commentData: CommentInterface }) {
  const { data } = useQuery<User>({
    queryKey: ['user']
  });

  const dataUserComment = useQuery<User>({
    queryKey: ['user', commentData.userId],
    queryFn: async () => {
      return await getUserById(commentData.userId);
    }
  });

  const { refetch, productId } = useCommentContext() as CommentContextInterface;
  const [modalDelte, setModalDelete] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);

  const isAdmin = Cookies.get('isAdmin');
  const myComment = commentData?.userId === data?.user?._id;

  return (
    <>
      <div className={styles.comentario_div}>
        <InformacoesUsuario
          nome={dataUserComment.data?.user?.name ?? ''}
          data={''}
          stars={commentData.stars}
        />
        <InformacoesProduto
          cor={''}
          tamanho={'size'}
          comentario={commentData.comment}
          imgs={commentData.image}
        />
        {isAdmin ?? myComment ? (
          <div className={styles.changes_comment}>
            <p
              onClick={() => {
                setModalEdit(true);
              }}
            >
              Editar
            </p>
            <p
              onClick={() => {
                setModalDelete(true);
              }}
            >
              Excluir
            </p>
          </div>
        ) : (
          <></>
        )}
        {modalDelte || modalEdit ? (
          <BackgoundClick setState1={setModalDelete} setState2={setModalEdit} />
        ) : (
          <></>
        )}
        {modalDelte && data && (
          <ModalDeleteSearsh
            productId={productId}
            commentId={commentData._id}
            refetch={refetch}
            setModalDelete={setModalDelete}
          />
        )}
        {modalEdit && (
          <ModalEdit setState={setModalEdit} commentData={commentData} />
        )}
      </div>
    </>
  );
}

export default Comentario;
