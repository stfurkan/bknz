import { useRouter } from 'next/router';
import Search from '../../../../components/Search';
import Loading from '../../../../components/Loading';

import basliklarJSON from '../../../../db/basliklar/basliklar.json';

export default function BaslikArama({ basliklar, toplam, id }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Search
      satirlar={basliklar}
      toplam={toplam}
      id={id}
      baslik1={'BAŞLIK'}
      baslik2={'BAKINIZ SAYISI'}
      base={'/basliklar/ara'}
      base2={'/basliklar/baslik'}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps(context) {
  const id = parseInt(context?.params?.sayfa) || 1;

  const filtreBasliklar = basliklarJSON.filter(bas =>
    bas.metin.includes(context.params.ara.toLowerCase())
  );

  const basliklar = filtreBasliklar.slice((id - 1) * 10, id * 10);
  const toplam = filtreBasliklar.length;

  return {
    props: {
      basliklar,
      toplam,
      id
    },
    revalidate: 86400
  };
}
