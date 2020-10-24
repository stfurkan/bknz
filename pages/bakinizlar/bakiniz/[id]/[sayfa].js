import Head from 'next/head';
import { useRouter } from 'next/router';
import InnerPagination from '../../../../components/InnerPagination';
import Error from '../../../../components/Error';
import Loading from '../../../../components/Loading';

import bakinizlarJSON from '../../../../db/bakinizlar/bakinizlar.json';

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

  if (id >= 1 && id < 1276) {
    dosya = 'bakiniz1.json';
  } else if (id >= 1276 && id < 2836) {
    dosya = 'bakiniz2.json';
  } else if (id >= 2836 && id < 4351) {
    dosya = 'bakiniz3.json';
  } else if (id >= 4351 && id < 6499) {
    dosya = 'bakiniz4.json';
  } else if (id >= 6499 && id < 8653) {
    dosya = 'bakiniz5.json';
  } else if (id >= 8653 && id < 11198) {
    dosya = 'bakiniz6.json';
  } else if (id >= 11198 && id < 14759) {
    dosya = 'bakiniz7.json';
  } else if (id >= 14759 && id < 18446) {
    dosya = 'bakiniz8.json';
  } else if (id >= 18446 && id < 23595) {
    dosya = 'bakiniz9.json';
  } else if (id >= 23595 && id < 30160) {
    dosya = 'bakiniz10.json';
  } else if (id >= 30160 && id < 37035) {
    dosya = 'bakiniz11.json';
  } else if (id >= 37035 && id < 47779) {
    dosya = 'bakiniz12.json';
  } else if (id >= 47779 && id < 61706) {
    dosya = 'bakiniz13.json';
  } else if (id >= 61706 && id < 86548) {
    dosya = 'bakiniz14.json';
  } else if (id >= 86548 && id < 136718) {
    dosya = 'bakiniz15.json';
  } else if (id >= 136718 && id < 282354) {
    dosya = 'bakiniz16.json';
  } else if (id >= 282354 && id < 414594) {
    dosya = 'bakiniz17.json';
  } else if (id >= 414594 && id < 426004) {
    dosya = 'bakiniz18.json';
  } else if (id >= 426004 && id < 488214) {
    dosya = 'bakiniz19.json';
  } else {
    dosya = 'bakiniz20.json';
  }

  const basliklarJSON = await import(
    `../../../../db/bakinizlar/bakiniz/${dosya}`
  );

  const basliklarTum = basliklarJSON[id];
  const sayfaSayisi = Math.ceil(basliklarTum.length / 10);
  const basliklar = basliklarTum.slice((sayfa - 1) * 10, sayfa * 10);
  const bakiniz = bakinizlarJSON.filter(bak => bak.id === parseInt(id))[0]
    .metin;

  return {
    props: {
      basliklar,
      bakiniz,
      sayfaSayisi
    },
    revalidate: 86400
  };
}
