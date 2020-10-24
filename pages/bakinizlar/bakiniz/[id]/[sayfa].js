import fs from 'fs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import InnerPagination from '../../../../components/InnerPagination';
import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';

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

  let dosya = '';

  if (id >= 1 && id < 4120) {
    dosya = 'bakiniz1.json';
  } else if (id >= 4120 && id < 10322) {
    dosya = 'bakiniz2.json';
  } else if (id >= 10322 && id < 21184) {
    dosya = 'bakiniz3.json';
  } else if (id >= 21184 && id < 41034) {
    dosya = 'bakiniz4.json';
  } else if (id >= 41034 && id < 95990) {
    dosya = 'bakiniz5.json';
  } else if (id >= 95990 && id < 415290) {
    dosya = 'bakiniz6.json';
  } else {
    dosya = 'bakiniz7.json';
  }

  const dizinDosya = `db/bakinizlar/bakiniz/${dosya}`;

  let sayfaSayisi = 0;
  let basliklar = [];
  let bakiniz = '';

  try {
    const basliklarTum = JSON.parse(
      fs
        .readFileSync(dizinDosya, 'utf8')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(',]', ']')
    )[id];

    sayfaSayisi = Math.ceil(basliklarTum.length / 10);

    basliklar = basliklarTum.slice((sayfa - 1) * 10, sayfa * 10);

    bakiniz = JSON.parse(
      fs
        .readFileSync(`db/bakinizlar/bakinizlar.json`, 'utf8')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(',]', ']')
    ).filter(bak => bak.id === parseInt(id))[0].metin;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      basliklar,
      bakiniz,
      sayfaSayisi
    },
    revalidate: 86400
  };
}
