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
import { useSearchParams } from 'next/navigation';

interface comentario {
  commentId: string;
  userId: string;
  nome: string;
  dataTime: string;
  estrelas: number;
  cor: string;
  tamanho: string;
  comentario: string;
  imgs: string[];
}
interface User {
  user: {
    _id: string;
  };
}
function Comentario({
  commentId,
  userId,
  nome,
  dataTime,
  estrelas,
  cor,
  tamanho,
  comentario,
  imgs
}: comentario) {
  const { data } = useQuery<User>({
    queryKey: ['user']
  });

  const { refetch } = useCommentContext() as CommentContextInterface;
  const [modalDelte, setModalDelete] = React.useState(false)
  const productId = useSearchParams()?.toString()?.split('=')?.[1]

  const isAdmin = Cookies.get('isAdmin');
  const myComment = userId === data?.user?._id;

  return (
    <>
    <div className={styles.comentario_div}>
      <InformacoesUsuario nome={nome} data={dataTime} stars={estrelas} />
      <InformacoesProduto
        cor={cor}
        tamanho={tamanho}
        comentario={comentario}
        imgs={imgs}
      />
      { isAdmin ?? myComment ?
          <div className={styles.changes_comment}>
            <p>Editar</p>
            <p onClick={()=>{
              setModalDelete(true)
            }}>Excluir</p>
          </div>
        : <></>}
        {modalDelte  ? (
          <BackgoundClick setState1={setModalDelete}/>
        ) : (
          <></>
        )}    
        {modalDelte &&           <ModalDelete 
          id1={productId}
          id2={commentId}
          setState={setModalDelete} 
          text='Deseja mesmo deletar esse comentário?' 
          funcDelete={deleteComment}
          refetch={refetch}
          />}
        </div>

    </>
  );
}

export default Comentario;
