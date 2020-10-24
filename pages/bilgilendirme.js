import Head from 'next/head';

export default function Bilgilendirme() {
  return (
    <div className='bg-white rounded-lg p-4 mx-8'>
      <Head>
        <meta
          property='og:description'
          content='bknz.org sitesi hakkında bilgilendirme'
          key='ogdesc'
        />
        <title>bknz. | Bilgilendirme</title>
      </Head>
      <h2 className='font-medium text-2xl border-b-2'>Bilgilendirme</h2>
      <ul className='ml-4 pl-4 list-disc'>
        <li>
          bknz.org sitesi sadece eğitim amacıyla yapılmıştır ve kodları MIT
          lisansı ile GitHub üzerinde açık kaynak olarak paylaşılmıştır.
        </li>
        <li>
          bknz.org sitesinin Ekşi Sözlük ile herhangi bir ilişkisi
          bulunmamaktadır.
        </li>
        <li>
          Sitede bulunan içerikler değiştirilmeden Ekşi Sözlük'ten alınmıştır.
          bknz.org sitesinin, başlıkların ve bakınızların içeriği ile hiçbir
          ilgisi yoktur. Yazılar otomatik olarak bknz.org sitesine çekilmiştir.
        </li>
        <li>
          bknz.org sitesinde Ekşi Sözlük'te en az 500 kere kullanılmış olan
          bakınızlar ve içerisinde en az 500 adet bakınız olan başlıklar
          listelenmiştir.
        </li>
        <li>
          Site istatistiğini takip etmek için Google Analytics kullanılmaktadır.
          Google Analytics tarafından takip edilmek istemeyen kullanıcılar{' '}
          <a
            href='https://tools.google.com/dlpage/gaoptout?hl=tr'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-red-800'
          >
            buraya tıklayarak
          </a>{' '}
          ilgili adımları gerçekleştirebilirler.
        </li>
        <li>
          bknz.org sitesi, sitede gezinmenizden dolayı tarafınıza gelebilecek
          hiçbir zararın sorumluluğunu kabul etmememektedir.
        </li>
        <li>
          bknz.org bu sayfadaki içeriği istediği zaman değiştirme hakkını saklı
          tutar.
        </li>
        <li>
          bknz.org sitesini kullanıyorsanız, bu sayfayı okuduğunuzu ve ilgili
          şartları kabul ettiğinizi teyit etmişsiniz demektir.
        </li>
      </ul>
    </div>
  );
}
