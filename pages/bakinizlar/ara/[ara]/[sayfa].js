import { useRouter } from 'next/router';
import Search from '../../../../components/Search';
import Loading from '../../../../components/Loading';

import bakinizlarJSON from '../../../../db/bakinizlar/bakinizlar.json';

export default function BakinizArama({ bakinizlar, toplam, id }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Search
      satirlar={bakinizlar}
      toplam={toplam}
      id={id}
      baslik1={'BAKINIZ'}
      baslik2={'KULLANIM SAYISI'}
      base={'/bakinizlar/ara'}
      base2={'/bakinizlar/bakiniz'}
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

  const filtreBakinizlar = bakinizlarJSON.filter(bak =>
    bak.metin.includes(context.params.ara.toLowerCase())
  );

  const bakinizlar = filtreBakinizlar.slice((id - 1) * 10, id * 10);
  const toplam = filtreBakinizlar.length;

  return {
    props: {
      bakinizlar,
      toplam,
      id
    },
    revalidate: 86400
  };
}
