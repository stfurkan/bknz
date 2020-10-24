import fs from 'fs';
import { useRouter } from 'next/router';
import Page from '../../components/Page';
import Loading from '../../components/Loading';

import basliklarJSON from '../../db/basliklar/basliklar.json';

export default function Basliklar({ basliklar, toplam, id }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Page
      satirlar={basliklar}
      toplam={toplam}
      id={id}
      baslik1={'BAŞLIK'}
      baslik2={'BAKINIZ SAYISI'}
      base={'/basliklar'}
      base2={'/basliklar/baslik'}
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

  const basliklar = basliklarJSON.slice((id - 1) * 10, id * 10);
  const toplam = basliklarJSON.length;

  return {
    props: {
      basliklar,
      toplam,
      id
    },
    revalidate: 86400
  };
}
