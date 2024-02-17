import { type QueryObserverResult, useQuery } from '@tanstack/react-query';
import React, { createContext } from 'react';
import { getAllComments } from '../api/GETS';
import { useSearchParams } from 'next/navigation';
import { type CommentInterface } from '../helpers/interfaces';

export interface CommentContextInterface {
  dataComments: { comments: CommentInterface[] } | undefined;
  refetch: () => Promise<QueryObserverResult<any, Error>>;
}

const CommentContext = createContext<CommentContextInterface | null>(null);

const AvaliacoesProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams().toString();
  const id = searchParams?.split('=')?.[1];
  const { data, refetch } = useQuery<{ comments: CommentInterface[] }>({
    queryKey: ['comentarios', id],
    queryFn: async () => {
      return await getAllComments(id);
    },
    enabled: Boolean(id)
  });
  const dataComments = data;

  return (
    <CommentContext.Provider value={{ dataComments, refetch }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => React.useContext(CommentContext);

export { AvaliacoesProvider, CommentContext };
