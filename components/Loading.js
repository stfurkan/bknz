import React from 'react';

export default function Loading() {
  return (
    <div className='bg-white shadow overflow-hidden rounded-lg mx-8'>
      <div className='px-3 py-3 border-b border-gray-500 mx-3'>
        <h2 className='text-4xl leading-10 font-bold text-gray-900'>
          Sayfa yükleniyor, lütfen bekleyin...
        </h2>
      </div>
      <div className='bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 px-6'>
        <span className='text-lg leading-5 font-medium text-gray-900'>
          Sayfa ilk defa yüklenirken biraz yavaş olabilir. Sayfa yüklendikten
          sonra aynı sayfa çok daha hızlı yüklenecektir.
        </span>
      </div>
    </div>
  );
}
