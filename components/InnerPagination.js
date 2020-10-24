import React from 'react';
import Link from 'next/link';

export default function InnerPagination({ aktifSayfa, toplamSayfa, base }) {
  return (
    toplamSayfa > 1 && (
      <div className='flex-1 flex justify-around mt-1'>
        <Link href={`${base}/${aktifSayfa - 1}`}>
          <button
            type='button'
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-${
              aktifSayfa === 1 ? '200' : '700'
            } bg-white hover:text-gray-${
              aktifSayfa === 1 ? '100' : '500'
            } focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
              aktifSayfa === 1 && 'pointer-events-none'
            }`}
          >
            Önceki
          </button>
        </Link>

        <div>
          {aktifSayfa} / {toplamSayfa}
        </div>

        <Link href={`${base}/${aktifSayfa + 1}`}>
          <button
            type='button'
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-${
              aktifSayfa === toplamSayfa ? '200' : '700'
            } bg-white hover:text-gray-${
              aktifSayfa === toplamSayfa ? '100' : '500'
            } focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
              aktifSayfa === toplamSayfa && 'pointer-events-none'
            }`}
          >
            Sonraki
          </button>
        </Link>
      </div>
    )
  );
}
