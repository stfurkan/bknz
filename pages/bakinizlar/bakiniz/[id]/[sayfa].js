import Head from 'next/head';
import { useRouter } from 'next/router';
import InnerPagination from '../../../../components/InnerPagination';
import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';

import basliklarJSON from '../../../../db/basliklar/basliklar.json';

const qry = useRouter().query;
const inId = qry?.id || 1;

let bakinizJSON = [];

if (inId >= 1 && inId < 4120) {
  bakinizJSON = require('../../../../db/bakinizlar/bakiniz/bakiniz1.json');
} else if (inId >= 4120 && inId < 10322) {
  bakinizJSON = require('../../../../db/bakinizlar/bakiniz/bakiniz2.json');
} else if (inId >= 10322 && inId < 21184) {
  bakinizJSON = require('../../../../db/bakinizlar/bakiniz/bakiniz3.json');
} else if (inId >= 21184 && inId < 41034) {
  bakinizJSON = require('../../../../db/bakinizlar/bakiniz/bakiniz4.json');
} else if (inId >= 41034 && inId < 95990) {
  bakinizJSON = require('../../../../db/bakinizlar/bakiniz/bakiniz5.json');
} else if (inId >= 95990 && inId < 415290) {
  bakinizJSON = require('../../../../db/bakinizlar/bakiniz/bakiniz6.json');
} else {
  bakinizJSON = require('../../../../db/bakinizlar/bakiniz/bakiniz7.json');
}

export default function Bakiniz({ bakiniz, basliklar, sayfaSayisi }) {
  const router = useRouter();
  const { query } = router;

  if (router.isFallback) {
    return <Loading />;
  }

  return bakiniz ? (
    <>
      <Head>
        <meta property='og:description' content={bakiniz} key='ogdesc' />

        <title>bknz. | {bakiniz}</title>
      </Head>

      <div className='bg-white shadow overflow-hidden rounded-lg mx-8'>
        <div className='px-3 py-3 border-b border-gray-500 mx-3'>
          <h2 className='text-3xl leading-6 font-medium text-gray-900'>
            <span className='text-xl font-semibold text-gray-800 italic'>
              Bknz:
            </span>{' '}
            <a
              href={`https://eksisozluk.com/?q=${bakiniz}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {bakiniz}
            </a>
          </h2>
          <p className='mt-1 max-w-2xl text-sm leading-5 text-gray-700'>
            Bakınız ifadesinin geçtiği başlıklar ve kullanım sayıları
          </p>
        </div>
        <div>
          {basliklar.map((baslik, i) => (
            <a
              key={`${baslik.id}-${i}`}
              className='bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 px-6 hover:bg-gray-300'
              href={`https://eksisozluk.com/?q=${baslik.metin}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='text-lg leading-5 font-medium text-gray-900'>
                {baslik.metin} ({baslik.toplam})
              </span>
            </a>
          ))}
        </div>
      </div>

      <InnerPagination
        aktifSayfa={parseInt(query?.sayfa)}
        toplamSayfa={sayfaSayisi}
        base={`/bakinizlar/bakiniz/${query?.id}`}
      />
    </>
  ) : (
    <Error />
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps(context) {
  const id = context?.params?.id;
  const sayfa = context?.params?.sayfa || 1;

  const bakinizlar = bakinizJSON[id];
  const sayfaSayisi = Math.ceil(bakinizlar.length / 10);
  const basliklar = bakinizlar.slice((sayfa - 1) * 10, sayfa * 10);
  const bakiniz = basliklarJSON.filter(bak => bak.id === parseInt(id))[0].metin;

  return {
    props: {
      basliklar,
      bakiniz,
      sayfaSayisi
    },
    revalidate: 86400
  };
}
