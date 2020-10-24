import Head from 'next/head';
import Link from 'next/link';

export default function Home({ tarih }) {
  return (
    <div>
      <Head>
        <title>bknz. | Anasayfa</title>
      </Head>

      <main className='px-8'>
        <div className='py-12 bg-white rounded-lg'>
          <div className='px-8'>
            <div className='text-center'>
              <h3 className='text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10'>
                bknz.
              </h3>
              <p className='mt-4 text-xl leading-7 text-gray-600 mx-auto'>
                <a
                  href='https://eksisozluk.com'
                  className='hover:text-gray-900'
                >
                  ekşi sözlük
                </a>{' '}
                sitesindeki bakınızlardan ve bakınızların kullanıldığı
                başlıklardan oluşan açık kaynak kodlu bir proje
              </p>
            </div>

            <div className='mt-10'>
              <ul className='md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
                <li>
                  <Link href='/bakinizlar/1'>
                    <a>
                      <div className='flex'>
                        <div className='flex-shrink-0'>
                          <div className='flex items-center justify-center h-12 w-12 rounded-md bg-gray-800 text-white'>
                            <svg
                              className='h-6 w-6'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M7 20l4-16m2 16l4-16M6 9h14M4 15h14'
                              />
                            </svg>
                          </div>
                        </div>
                        <div className='ml-4'>
                          <h4 className='text-2xl leading-6 font-medium text-gray-900'>
                            Bakınızlar
                          </h4>
                          <p className='mt-2 text-base leading-6 text-gray-600'>
                            En çok kullanılan bakınızları keşfedin. Metin
                            temelli arama ile bakınızları filtreleyin.
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
                <li className='mt-10 md:mt-0'>
                  <Link href='/basliklar/1'>
                    <a>
                      <div className='flex'>
                        <div className='flex-shrink-0'>
                          <div className='flex items-center justify-center h-12 w-12 rounded-md bg-gray-800 text-white'>
                            <svg
                              className='h-6 w-6'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                              />
                            </svg>
                          </div>
                        </div>
                        <div className='ml-4'>
                          <h4 className='text-2xl leading-6 font-medium text-gray-900'>
                            Başlıklar
                          </h4>
                          <p className='mt-2 text-base leading-6 text-gray-600'>
                            İçerisinde bakınız kullanılan başlıkları keşfedin.
                            Metin temelli arama ile başlıkları filtreleyin.
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div
              className='bg-gray-800 border-t-4 border-gray-600 rounded-b text-white px-4 py-3 shadow-md mt-10'
              role='alert'
            >
              <div className='flex'>
                <div className='py-1'>
                  <svg
                    className='fill-current h-8 w-8 text-white mr-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
                  </svg>
                </div>
                <Link href='/bilgilendirme'>
                  <a className='hover:text-gray-400'>
                    <p className='text-xl font-bold'>Uyarı</p>
                    <p className='text-md'>
                      Lütfen siteyi kullanmaya başlamadan önce buraya tıklayarak
                      bilgilendirme sayfamızı okuyun!
                    </p>
                  </a>
                </Link>
              </div>
            </div>

            <div className='pt-5 text-center'>
              Sitedeki verilerin son güncellenme tarihi:{' '}
              <span className='font-medium'>
                {new Date(tarih).toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      tarih: '2020-10-12'
    }
  };
}
