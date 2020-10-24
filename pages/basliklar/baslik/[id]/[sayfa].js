import fs from 'fs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import InnerPagination from '../../../../components/InnerPagination';
import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';

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

  if (id >= 1 && id < 147159) {
    dosya = 'baslik1.json';
  } else if (id >= 147159 && id < 1409045) {
    dosya = 'baslik2.json';
  } else if (id >= 1409045 && id < 3125290) {
    dosya = 'baslik3.json';
  } else if (id >= 3125290 && id < 4731438) {
    dosya = 'baslik4.json';
  } else if (id >= 4731438 && id < 5638603) {
    dosya = 'baslik5.json';
  } else if (id >= 5638603 && id < 6210173) {
    dosya = 'baslik6.json';
  } else {
    dosya = 'baslik7.json';
  }

  const dizinDosya = `db/basliklar/baslik/${dosya}`;

  let sayfaSayisi = 0;
  let bakinizlar = [];
  let baslik = '';

  try {
    const bakinizlarTum = JSON.parse(
      fs
        .readFileSync(dizinDosya, 'utf8')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(',]', ']')
    )[id];

    sayfaSayisi = Math.ceil(bakinizlarTum.length / 10);

    bakinizlar = bakinizlarTum.slice((sayfa - 1) * 10, sayfa * 10);

    baslik = JSON.parse(
      fs
        .readFileSync(`db/basliklar/basliklar.json`, 'utf8')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(',]', ']')
    ).filter(bas => bas.id === parseInt(id))[0].metin;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      bakinizlar,
      baslik,
      sayfaSayisi
    },
    revalidate: 86400
  };
}
