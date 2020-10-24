import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Error from './Error';
import Pagination from './Pagination';
import TableComponent from './Table';

export default function Search({
  satirlar,
  toplam,
  id,
  baslik1,
  baslik2,
  base,
  base2
}) {
  const { query } = useRouter();

  return satirlar?.length > 0 ? (
    <>
      <Head>
        <meta
          property='og:title'
          content={baslik1 === 'BAKINIZ' ? 'Bakınızlar' : 'Başlıklar'}
          key='ogtitle'
        />
        <meta
          property='og:description'
          content={
            baslik1 === 'BAKINIZ'
              ? 'En çok kullanılan bakınızları keşfedin. Metin temelli arama ile bakınızları filtreleyin.'
              : 'İçerisinde bakınız kullanılan başlıkları keşfedin. Metin temelli arama ile başlıkları filtreleyin.'
          }
          key='ogdesc'
        />

        <title>
          bknz. |{' '}
          {baslik1 === 'BAKINIZ'
            ? `Bakınız Arama: ${query?.ara}`
            : `Başlık Arama: ${query?.ara}`}
        </title>
      </Head>

      <div className='mx-8'>
        <h3 className='text-3xl font-bold'>
          <span className='text-xl font-medium'>
            {baslik1 === 'BAKINIZ' ? 'Bakınız Arama: ' : 'Başlık Arama: '}
          </span>
          {query?.ara}
        </h3>
      </div>

      <TableComponent
        baslik1={baslik1}
        baslik2={baslik2}
        satirlar={satirlar}
        base={base2}
      />
      <Pagination
        toplam={parseInt(toplam)}
        id={parseInt(id)}
        base={`${base}/${query?.ara}`}
      />
    </>
  ) : (
    <Error />
  );
}
