import fs from 'fs';
import { useRouter } from 'next/router';
import Page from '../../components/Page';
import Loading from '../../components/Loading';

export default function Bakinizlar({ bakinizlar, toplam, id }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Page
      satirlar={bakinizlar}
      toplam={toplam}
      id={id}
      baslik1={'BAKINIZ'}
      baslik2={'KULLANIM SAYISI'}
      base={'/bakinizlar'}
      base2={'/bakinizlar/bakiniz'}
    />
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
      { params: { id: '4' } },
      { params: { id: '5' } },
      { params: { id: '6' } },
      { params: { id: '7' } },
      { params: { id: '8' } },
      { params: { id: '9' } },
      { params: { id: '10' } }
    ],
    fallback: true
  };
}

export async function getStaticProps(context) {
  const id = parseInt(context?.params?.id) || 1;

  let bakinizlar = [];
  let toplam = 0;

  try {
    const tumBakinizlar = JSON.parse(
      fs
        .readFileSync(`./db/bakinizlar/bakinizlar.json`, 'utf8')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(',]', ']')
    );

    bakinizlar = tumBakinizlar.slice((id - 1) * 10, id * 10);

    toplam = tumBakinizlar.length;
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
