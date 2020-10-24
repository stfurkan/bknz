import React, { useState } from 'react';
import Link from 'next/link';

export default function Filter({ base }) {
  const [ara, setAra] = useState('');

  return (
    <>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='align-middle inline-block min-w-full sm:px-6 lg:px-6'>
            <div className='justify-center flex flex-col sm:flex-col md:flex-row items-center sm:items-center md:items-end md:h-12 border-2 rounded-lg border-gray-300'>
              <div className='w-full h-full'>
                <form className='relative h-full text-gray-600 focus-within:text-gray-400'>
                  <Link href={`${base}/ara/${ara}/1`}>
                    <button
                      type='submit'
                      className='absolute inset-y-0 right-0 flex items-center pl-2'
                    >
                      <span className='p-1'>
                        <svg
                          fill='none'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          className='w-6 h-6'
                        >
                          <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                        </svg>
                      </span>
                    </button>
                  </Link>
                  <span className='absolute inset-y-25 left-0 flex items-center pl-2'>
                    <label
                      htmlFor='ara'
                      className='text-xs font-medium focus:outline-none focus:shadow-outline'
                    >
                      Arama
                    </label>
                  </span>
                  <input
                    type='text'
                    name='ara'
                    className='w-full h-full pb-2 pt-3 text-md bg-gray-100 rounded-md pl-2 pr-10 focus:outline-none focus:bg-gray-200 focus:text-gray-900'
                    placeholder='Ara'
                    autoComplete='off'
                    value={ara}
                    onChange={e => setAra(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
