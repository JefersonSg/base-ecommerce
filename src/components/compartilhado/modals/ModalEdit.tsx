/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import styles from './ModalEdit.module.css';

import {
  type QueryObserverResult,
  type RefetchOptions
} from '@tanstack/react-query';
import FormEditComment from '../../loja/Produto_view/avaliacoes/comentarios/formComment/FormEditComment';

interface Comment {
  commentId: string;
  userId: string;
  name: string;
  dataTime: string;
  stars: number;
  color: string;
  size: string;
  comment: string;
  images: string[];
}
const ModalEdit = ({
  dataUser,
  id1,
  dataComment,
  setState,
  id2,
  funcDelete,
  refetch
}: {
  dataComment: Comment;
  dataUser: string;
  id1: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  id2?: string;
  funcDelete?: (id: string, id2?: string) => Promise<any>;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  // async function handleDelete() {
  //   try {
  //     if (!funcDelete) return;

  //     if (id1) {
  //       await funcDelete(id1);
  //     }
  //     if (id1 && id2) {
  //       await funcDelete(id1, id2);
  //     }
  //     if (refetch) {
  //       await refetch();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className={styles.delete_categoria}>
      <FormEditComment
        dataUser={dataUser}
        setModalForm={setState}
        dataComment={dataComment}
      />
    </div>
  );
};

export default ModalEdit;
