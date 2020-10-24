import Head from 'next/head';
import { useRouter } from 'next/router';
import InnerPagination from '../../../../components/InnerPagination';
import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';

import bakinizlarJSON from '../../../../db/bakinizlar/bakinizlar.json';

const qry = useRouter().query;
const inId = qry?.id || 1;

let baslikJSON = [];

if (inId >= 1 && inId < 147159) {
  baslikJSON = require('../../../../db/basliklar/baslik/baslik1.json');
} else if (inId >= 147159 && inId < 1409045) {
  baslikJSON = require('../../../../db/basliklar/baslik/baslik2.json');
} else if (inId >= 1409045 && inId < 3125290) {
  baslikJSON = require('../../../../db/basliklar/baslik/baslik3.json');
} else if (inId >= 3125290 && inId < 4731438) {
  baslikJSON = require('../../../../db/basliklar/baslik/baslik4.json');
} else if (inId >= 4731438 && inId < 5638603) {
  baslikJSON = require('../../../../db/basliklar/baslik/baslik5.json');
} else if (inId >= 5638603 && inId < 6210173) {
  baslikJSON = require('../../../../db/basliklar/baslik/baslik6.json');
} else {
  baslikJSON = require('../../../../db/basliklar/baslik/baslik7.json');
}

export default function Baslik({ baslik, bakinizlar, sayfaSayisi }) {
  const router = useRouter();
  const { query } = router;

  if (router.isFallback) {
    return <Loading />;
  }

  return baslik ? (
    <>
      <Head>
        <meta property='og:description' content={baslik} key='ogdesc' />

        <title>bknz. | {baslik}</title>
      </Head>

      <div className='bg-white shadow overflow-hidden rounded-lg mx-8'>
        <div className='px-3 py-3 border-b border-gray-500 mx-3'>
          <h2 className='text-3xl leading-6 font-medium text-gray-900'>
            <span className='text-xl font-semibold text-gray-800 italic'>
              Başlık:
            </span>{' '}
            <a
              href={`https://eksisozluk.com/?q=${baslik}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {baslik}
            </a>
          </h2>
          <p className='mt-1 max-w-2xl text-sm leading-5 text-gray-700'>
            Başlıkta bulunan bakınızlar ve sayıları
          </p>
        </div>
        <div>
          {bakinizlar.map((bknz, i) => (
            <a
              key={`${bknz.id}-${i}`}
              className='bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 px-6 hover:bg-gray-300'
              href={`https://eksisozluk.com/?q=${bknz.metin}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='text-lg leading-5 font-medium text-gray-900'>
                {bknz.metin} ({bknz.toplam})
              </span>
            </a>
          ))}
        </div>
      </div>

      <InnerPagination
        aktifSayfa={parseInt(query?.sayfa)}
        toplamSayfa={sayfaSayisi}
        base={`/basliklar/baslik/${query?.id}`}
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

  const basliklar = baslikJSON[id];
  const sayfaSayisi = Math.ceil(basliklar.length / 10);
  const bakinizlar = basliklar.slice((sayfa - 1) * 10, sayfa * 10);
  const baslik = bakinizlarJSON.filter(bas => bas.id === parseInt(id))[0].metin;

  return {
    props: {
      bakinizlar,
      baslik,
      sayfaSayisi
    },
    revalidate: 86400
  };
}
