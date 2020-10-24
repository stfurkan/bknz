import fs from 'fs';
import { useRouter } from 'next/router';
import Search from '../../../../components/Search';
import Loading from '../../../../components/Loading';

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

  let basliklar = [];
  let toplam = 0;

  try {
    const tumBasliklar = JSON.parse(
      fs
        .readFileSync(`db/basliklar/basliklar.json`, 'utf8')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(',]', ']')
    );

    const filtreBasliklar = tumBasliklar.filter(bas =>
      bas.metin.includes(context.params.ara.toLowerCase())
    );

    basliklar = filtreBasliklar.slice((id - 1) * 10, id * 10);

    toplam = filtreBasliklar.length;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      basliklar,
      toplam,
      id
    },
    revalidate: 86400
  };
}
