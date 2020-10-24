import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className='flex flex-col text-white bg-gray-800 text-center'>
      <div className='m-2 text-sm sm:text-base'>
        <Link href='/'>
          <a className='hover:text-gray-400'>Anasayfa</a>
        </Link>{' '}
        -{' '}
        <Link href='/bakinizlar/1'>
          <a className='hover:text-gray-400'>Bakınızlar</a>
        </Link>{' '}
        -{' '}
        <Link href='/basliklar/1'>
          <a className='hover:text-gray-400'>Başlıklar</a>
        </Link>{' '}
        -{' '}
        <Link href='/bilgilendirme'>
          <a className='hover:text-gray-400'>Bilgilendirme</a>
        </Link>
      </div>
      <div className='mb-2'>bknz.org © 2020</div>
    </div>
  );
}
