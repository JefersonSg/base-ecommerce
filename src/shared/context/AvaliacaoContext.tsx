'use client';

import { type QueryObserverResult, useQuery } from '@tanstack/react-query';
import React, { Suspense, createContext } from 'react';
import { getAllComments } from '../api/GETS';
import { useSearchParams } from 'next/navigation';
import { type CommentInterface } from '../helpers/interfaces';

export interface CommentContextInterface {
  dataComments: { comments: CommentInterface[] } | undefined;
  productId: string;
  refetch: () => Promise<QueryObserverResult<any, Error>>;
}

const CommentContext = createContext<CommentContextInterface | null>(null);

const AvaliacoesProvider = ({ children }: { children: React.ReactNode }) => {
  const productId = useSearchParams().get('_id') ?? '';
  const { data, refetch } = useQuery<{ comments: CommentInterface[] }>({
    queryKey: ['comentarios', productId],
    queryFn: async () => {
      return await getAllComments(productId);
    },
    enabled: Boolean(productId)
  });
  const dataComments = data;

  return (
    <CommentContext.Provider value={{ dataComments, refetch, productId }}>
      <Suspense>{children}</Suspense>
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => React.useContext(CommentContext);

export { AvaliacoesProvider, CommentContext };
