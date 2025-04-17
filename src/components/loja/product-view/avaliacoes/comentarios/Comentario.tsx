'use client';

/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import styles from './Comentario.module.css';
import InformacoesProduto from './Informacoes/InformacoesProduto';
import InformacoesUsuario from './Informacoes/InformacoesUsuario';

import React from 'react';
import Cookies from 'js-cookie';
import { deleteComment } from '@/src/shared/api/DELETE';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import ModalEdit from '@/src/components/compartilhado/modals/ModalEdit';
import { type CommentInterface } from '@/src/shared/helpers/interfaces';
import { getAllComments, getUserById } from '@/src/shared/api/GETS';
import { useParams } from 'next/navigation';
import { type PageParams } from './Comentarios';

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
  refetch,
  setIsLoading,
  setMessagePopUp,
  setTypePopUp
}: {
  productId: string;
  commentId: string;
  setModalDelete: any;
  refetch: any;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <ModalDelete
      id1={commentId}
      id2={productId}
      text="Deseja mesmo deletar esse comentário?"
      messageToErrorPopUp="Erro ao remover comentario"
      messageToPopUp="Comentario removido"
      setIsLoading={setIsLoading}
      setMessagePopUp={setMessagePopUp}
      setTypePopUp={setTypePopUp}
      setState={setModalDelete}
      funcDelete={deleteComment}
      refetch={refetch}
    />
  );
}

function Comentario({
  commentData,
  setMessagePopUp,
  setTypePopUp,
  setIsLoading
}: {
  commentData: CommentInterface;
  setMessagePopUp: React.Dispatch<React.SetStateAction<string>>;
  setTypePopUp: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = useParams() as unknown as PageParams;

  const { data } = useQuery<User>({
    queryKey: ['user']
  });

  const dataUserComment = useQuery<User>({
    queryKey: ['user', commentData.userId],
    queryFn: async () => {
      return await getUserById(commentData.userId);
    }
  });

  const [modalDelte, setModalDelete] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);

  const isAdmin = Cookies.get('isAdmin');
  const myComment = commentData?.userId === data?.user?._id;

  const { refetch } = useQuery<{ comments: CommentInterface[] }>({
    queryKey: ['comments-id-' + pathname.id],
    queryFn: async () => {
      return await getAllComments(pathname.id);
    }
  });

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
        {(isAdmin ?? myComment) ? (
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
            setIsLoading={setIsLoading}
            setMessagePopUp={setMessagePopUp}
            setTypePopUp={setTypePopUp}
            productId={pathname.id}
            commentId={commentData._id}
            refetch={refetch}
            setModalDelete={setModalDelete}
          />
        )}
        {modalEdit && (
          <ModalEdit
            setState={setModalEdit}
            commentData={commentData}
            setMessagePopUp={setMessagePopUp}
            setTypePopUp={setTypePopUp}
            refetch={refetch}
          />
        )}
      </div>
    </>
  );
}

export default Comentario;
