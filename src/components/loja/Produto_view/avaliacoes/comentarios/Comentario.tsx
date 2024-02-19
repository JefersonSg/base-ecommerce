/* eslint-disable prettier/prettier */
import { useQuery } from '@tanstack/react-query';
import styles from './Comentario.module.css';
import InformacoesProduto from './Informacoes/InformacoesProduto';
import InformacoesUsuario from './Informacoes/InformacoesUsuario';
import {
  type CommentContextInterface,
  useCommentContext
} from '@/src/shared/context/AvaliacaoContext';
import React, { Suspense } from 'react';
import Cookies from 'js-cookie';
import { deleteComment } from '@/src/shared/api/DELETE';
import BackgoundClick from '@/src/components/compartilhado/backgrounds/BackgoundClick';
import ModalDelete from '@/src/components/compartilhado/modals/ModalDelete';
import { useSearchParams } from 'next/navigation';
import ModalEdit from '@/src/components/compartilhado/modals/ModalEdit';
import { getUserById } from '@/src/shared/api/GETS';

interface Comment {
  commentId: string;
  userId: string;
  dataTime: string;
  stars: number;
  color: string;
  size: string;
  comment: string;
  images: string[];
}
interface User {
  user: {
    _id: string;
    name: string;
  };
}

function ModalDeleteSearsh({commentId, setModalDelete, refetch}:{commentId: string, setModalDelete: any, refetch: any}){
  const searchParams = useSearchParams()
  const productId = searchParams?.toString()?.split('=')?.[1]

  return <ModalDelete 
    id1={productId}
    id2={commentId}
    setState={setModalDelete} 
    text='Deseja mesmo deletar esse comentário?' 
    funcDelete={deleteComment}
    refetch={refetch}
/>

}

function Comentario({
  commentId,
  userId,
  dataTime,
  stars,
  color,
  size,
  comment,
  images
}: Comment) {
  const { data } = useQuery<User>({
    queryKey: ['user']
  });

  const dataUserComment = useQuery<User>({
    queryKey: [userId],
    queryFn: async ()=> {
      return await getUserById(userId)
    }
  });
  console.log(userId)
  const { refetch } = useCommentContext() as CommentContextInterface;
  const [modalDelte, setModalDelete] = React.useState(false)
  const [modalEdit, setModalEdit] = React.useState(false)

  const isAdmin = Cookies.get('isAdmin');
  const myComment = userId === data?.user?._id;
  const dataComment = {
    commentId,
    userId,
    name: dataUserComment?.data?.user.name ?? 'Usuário não encontrado',
    dataTime,
    stars,
    color,
    size,
    comment,
    images
  }
  return (
    <>
    <div className={styles.comentario_div}>
      <InformacoesUsuario nome={dataComment?.name} data={dataTime} stars={stars} />
      <InformacoesProduto
        cor={color}
        tamanho={size}
        comentario={comment}
        imgs={images}
      />
      { isAdmin ?? myComment ?
          <div className={styles.changes_comment}>
            <p
            onClick={()=>{
              setModalEdit(true)
            }}>Editar</p>
            <p onClick={()=>{
              setModalDelete(true)
            }}>Excluir</p>
          </div>
        : <></>}
        {modalDelte || modalEdit ? (
          <BackgoundClick setState1={setModalDelete}  setState2={setModalEdit}/>
        ) : (
          <></>
        )} 
        {modalDelte &&  data &&
          <Suspense>
            <ModalDeleteSearsh commentId={commentId} refetch={refetch} setModalDelete={setModalDelete}/>
          </Suspense>
        }
          {modalEdit && <ModalEdit setState={setModalEdit} id1='' 
            dataUser={userId} dataComment={dataComment}
        />}
        </div>

    </>
  );
}

export default Comentario;
