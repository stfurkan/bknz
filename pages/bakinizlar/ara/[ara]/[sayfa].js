import fs from 'fs';
import { useRouter } from 'next/router';
import Search from '../../../../components/Search';
import Loading from '../../../../components/Loading';

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

  let bakinizlar = [];
  let toplam = 0;

  try {
    const tumBakinizlar = JSON.parse(
      fs
        .readFileSync(`db/bakinizlar/bakinizlar.json`, 'utf8')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(',]', ']')
    );

    const filtreBakinizlar = tumBakinizlar.filter(bak =>
      bak.metin.includes(context.params.ara.toLowerCase())
    );

    bakinizlar = filtreBakinizlar.slice((id - 1) * 10, id * 10);

    toplam = filtreBakinizlar.length;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      bakinizlar,
      toplam,
      id
    },
    revalidate: 86400
  };
}
