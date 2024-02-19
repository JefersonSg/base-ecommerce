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
