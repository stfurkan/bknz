import React from 'react';
import Link from 'next/link';

export default function Pagination({ toplam, id, base }) {
  const eleman = 10;
  const toplamSayfa = Math.ceil(toplam / eleman);
  const oncekiSayfa = id - 1;
  const sonrakiSayfa = id + 1;
  const sonrakiVarMi = sonrakiSayfa <= toplamSayfa;
  const oncekiVarMi = id === 1;

  return (
    <div className='px-4 py-3 flex items-center justify-between border-t border-gray-300 sm:px-6'>
      <div className='flex-1 flex justify-between sm:hidden'>
        <Link href={`${base}/${oncekiSayfa}`}>
          <a
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-${
              oncekiVarMi ? '200' : '700'
            } bg-white hover:text-gray-${
              oncekiVarMi ? '100' : '500'
            } focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
              oncekiVarMi && 'pointer-events-none'
            }`}
          >
            Önceki
          </a>
        </Link>

        <Link href={`${base}/${sonrakiSayfa}`}>
          <a
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-${
              !sonrakiVarMi ? '200' : '700'
            } bg-white hover:text-gray-${
              !sonrakiVarMi ? '100' : '500'
            } focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
              !sonrakiVarMi && 'pointer-events-none'
            }`}
          >
            Sonraki
          </a>
        </Link>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm leading-5 text-gray-700'>
            Toplam{' '}
            <span className='font-medium'>
              {toplam.toLocaleString('tr-TR')}
            </span>{' '}
            sonucun <span className='font-medium'>{(id - 1) * eleman + 1}</span>{' '}
            ile{' '}
            <span className='font-medium'>
              {id * eleman >= toplam ? toplam : id * eleman}
            </span>{' '}
            arası gösteriliyor.
          </p>
        </div>
        <div>
          <nav className='relative z-0 inline-flex shadow-sm'>
            <Link href={`${base}/${oncekiSayfa}`}>
              <a
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-${
                  oncekiVarMi ? '200' : '500'
                } hover:text-gray-${
                  oncekiVarMi ? '100' : '400'
                } focus:z-10 focus:outline-none active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
                  oncekiVarMi && 'pointer-events-none'
                }`}
                aria-label='Önceki'
              >
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </Link>

            {Array.from({ length: 5 }).map((_, i) => {
              if (id + i - 2 > 0 && id + i - 2 <= toplamSayfa) {
                return (
                  <Link key={i} href={`${base}/${id + i - 2}`}>
                    <a
                      className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
                        id === id + i - 2 && 'bg-gray-200 pointer-events-none'
                      }`}
                    >
                      {id + i - 2}
                    </a>
                  </Link>
                );
              }
            })}

            <Link href={`${base}/${sonrakiSayfa}`}>
              <a
                className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-${
                  !sonrakiVarMi ? '200' : '500'
                } hover:text-gray-${
                  !sonrakiVarMi ? '100' : '400'
                } focus:z-10 focus:outline-none active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${
                  !sonrakiVarMi && 'pointer-events-none'
                }`}
                aria-label='Sonraki'
              >
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
