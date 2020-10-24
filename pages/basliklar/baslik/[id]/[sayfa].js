import Head from 'next/head';
import { useRouter } from 'next/router';
import InnerPagination from '../../../../components/InnerPagination';
import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';

import basliklarJSON from '../../../../db/basliklar/basliklar.json';

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

  let dosya = '';

  if (id >= 1 && id < 43721) {
    dosya = 'baslik1.json';
  } else if (id >= 43721 && id < 75468) {
    dosya = 'baslik2.json';
  } else if (id >= 75468 && id < 164522) {
    dosya = 'baslik3.json';
  } else if (id >= 164522 && id < 435159) {
    dosya = 'baslik4.json';
  } else if (id >= 435159 && id < 970011) {
    dosya = 'baslik5.json';
  } else if (id >= 970011 && id < 1580776) {
    dosya = 'baslik6.json';
  } else if (id >= 1580776 && id < 2163075) {
    dosya = 'baslik7.json';
  } else if (id >= 2163075 && id < 2678109) {
    dosya = 'baslik8.json';
  } else if (id >= 2678109 && id < 3414342) {
    dosya = 'baslik9.json';
  } else if (id >= 3414342 && id < 4018218) {
    dosya = 'baslik10.json';
  } else if (id >= 4018218 && id < 4576528) {
    dosya = 'baslik11.json';
  } else if (id >= 4576528 && id < 4943914) {
    dosya = 'baslik12.json';
  } else if (id >= 4943914 && id < 5276224) {
    dosya = 'baslik13.json';
  } else if (id >= 5276224 && id < 5577753) {
    dosya = 'baslik14.json';
  } else if (id >= 5577753 && id < 5792893) {
    dosya = 'baslik15.json';
  } else if (id >= 5792893 && id < 6004253) {
    dosya = 'baslik16.json';
  } else if (id >= 6004253 && id < 6179727) {
    dosya = 'baslik17.json';
  } else if (id >= 6179727 && id < 6366895) {
    dosya = 'baslik18.json';
  } else if (id >= 6366895 && id < 6533627) {
    dosya = 'baslik19.json';
  } else {
    dosya = 'baslik20.json';
  }

  const bakinizlarJSON = await import(
    `../../../../db/basliklar/baslik/${dosya}`
  );

  const bakinizlarTum = bakinizlarJSON[id];
  const sayfaSayisi = Math.ceil(bakinizlarTum.length / 10);
  const bakinizlar = bakinizlarTum.slice((sayfa - 1) * 10, sayfa * 10);
  const baslik = basliklarJSON.filter(bas => bas.id === parseInt(id))[0].metin;

  return {
    props: {
      bakinizlar,
      baslik,
      sayfaSayisi
    },
    revalidate: 86400
  };
}
