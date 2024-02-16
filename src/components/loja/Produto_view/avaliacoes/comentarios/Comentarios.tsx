'use client';

import BotaoColorido from '@/src/components/compartilhado/botoes/BotaoColorido';
import Comentario from './Comentario';
import styles from './Comentarios.module.css';

import { type ProductApi } from '@/src/shared/helpers/interfaces';

function Comentarios({ data }: { data: ProductApi }) {
  return (
    <div className={styles.comentarios_container}>
      <div className={styles.botao_comentar}>
        <BotaoColorido texto="Comentar" />
      </div>
      {data?.comments?.map((comment) => {
        return (
          <Comentario
            key={comment._id}
            data={comment.date}
            nome={'Ludimila'}
            estrelas={comment.stars}
            imgs={comment.images}
            tamanho="300ml"
            cor="Branco"
            comentario={comment.comment}
          />
        );
      })}
    </div>
  );
}

export default Comentarios;
