import React from 'react';
import styles from './visitantes.module.css';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/src/shared/api/GETS';
import { type UserInterface } from '@/src/shared/helpers/interfaces';
import Image from 'next/image';
import ProdutosVisitados from './produtos-visitados';

const VisitantesViews = ({
  ip,
  userId,
  views,
  products
}: {
  ip: string;
  userId?: string | null;
  views: number;
  products: [{ productId: string; count: number }];
}) => {
  const [ativo, setAtivo] = React.useState(false);

  const { data } = useQuery<UserInterface>({
    queryKey: ['user-by-id-', userId],
    queryFn: async () => {
      if (userId) {
        return await getUserById(userId);
      }
      return [];
    }
  });
  const [totalProductViews, setTotalProductViews] = React.useState(0);
  // const [totalClicksInProducts, setTotalClicksInProducts] = React.useState(0);

  React.useEffect(() => {
    if (products) {
      let i = 0;
      products.forEach((product) => {
        if (product) {
          i++;
          setTotalProductViews(i);
        }
      });
    }
  }, [products]);

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
            src={
              data?.user
                ? (data?.user?.image ?? '/profile/profile.svg')
                : '/dashboard/home/anonimo.svg'
            }
            width={data?.user ? 40 : 30}
            height={data?.user ? 40 : 30}
            alt="imagem do usuário"
            unoptimized
          />

          <div>
            <p className={styles.nome}>
              {data?.user?.name?.split(' ')?.[0] ?? 'Anonimo'}
            </p>
          </div>
        </div>
        <div className={styles.views}>
          <p>{views} paginas visitadas</p>
          <p>{totalProductViews} produtos visitados</p>
        </div>
        <Image
          className={styles.seta}
          alt="seta para baixo"
          src={'/setaBaixo.svg'}
          width={10}
          height={14}
          unoptimized
        />
      </div>
      {ativo && (
        <div className={styles.produtos_view_container}>
          {products?.map((product, index) => {
            return (
              <ProdutosVisitados
                key={product.productId + index + product.count}
                productId={product.productId}
                views={product.count}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VisitantesViews;
