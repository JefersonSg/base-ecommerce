import React from 'react';
import styles from './visitantes.module.css';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/src/shared/api/GETS';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import Image from 'next/image';
import ProdutosVisitados from './produtos-visitados';

const VisitantesViews = ({
  ip,
  user,
  views,
  products
}: {
  ip: string;
  user: Array<string | null>;
  views: number;
  products: string[];
}) => {
  const [ativo, setAtivo] = React.useState(false);

  const [userId, setUserId] = React.useState('');
  const { data } = useQuery<UserInterface>({
    queryKey: ['user-by-id-', userId],
    queryFn: async () => {
      if (userId) {
        return await getUserById(userId);
      }
      return [];
    }
  });

  React.useEffect(() => {
    if (user) {
      user.forEach((item) => {
        if (item !== null) {
          setUserId(item);
        }
      });
    }
  }, [user]);

  return (
    <div
      className={`${styles.visitante_container} ${ativo ? styles.ativo : ''}`}
      onClick={() => {
        setAtivo(!ativo);
      }}
    >
      <div className={styles.container1}>
        <div className={styles.informacao_user}>
          <Image
            className={styles.foto_perfil}
            src={data?.user?.image ?? '/dashboard/home/anonimo.svg'}
            width={40}
            height={40}
            alt="imagem do usuário"
          />
          <div>
            <p className={styles.nome}>
              {data?.user?.name?.split(' ')?.[0] ?? 'Anonimo'}
            </p>
          </div>
        </div>
        <div className={styles.views}>
          <p>{views} clicks</p>
          <p>{products.length} produtos diferentes</p>
        </div>
        <Image
          className={styles.seta}
          alt="seta para baixo"
          src={'/setaBaixo.svg'}
          width={10}
          height={14}
        />
      </div>
      {ativo && (
        <div className={styles.produtos_view_container}>
          {products?.map((product) => {
            return (
              <ProdutosVisitados key={product} productId={product} views={0} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VisitantesViews;
