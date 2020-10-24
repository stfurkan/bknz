import Head from 'next/head';
import React from 'react';
import Error from './Error';
import Filter from './Filter';
import Pagination from './Pagination';
import TableComponent from './Table';

export default function Page({
  satirlar,
  toplam,
  id,
  baslik1,
  baslik2,
  base,
  base2
}) {
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
          bknz. | {baslik1 === 'BAKINIZ' ? 'Bakınızlar' : 'Başlıklar'}
        </title>
      </Head>
      <Filter base={base} />
      <TableComponent
        baslik1={baslik1}
        baslik2={baslik2}
        satirlar={satirlar}
        base={base2}
      />
      <Pagination toplam={parseInt(toplam)} id={parseInt(id)} base={base} />
    </>
  ) : (
    <Error />
  );
}
