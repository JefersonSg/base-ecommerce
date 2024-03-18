import Estrelas from '@/src/components/compartilhado/estrelas/Estrelas';
import Link from 'next/link';

export default async function EstrelasProduto({ stars }: { stars: number }) {
  return (
    <>
      <Link href={'#avaliacoes'} scroll={true}>
        <Estrelas stars={stars} type={1} />
      </Link>
    </>
  );
}
