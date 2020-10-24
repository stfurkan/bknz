import React from 'react';
import Link from 'next/link';

export default function TableComponent({ baslik1, baslik2, satirlar, base }) {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-6'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-800'>
                <tr>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider'>
                    {baslik1}
                  </th>
                  <th className='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider'>
                    {baslik2}
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {satirlar.map(satir => (
                  <Link key={satir.id} href={`${base}/${satir.id}/1`}>
                    <tr className='hover:bg-gray-200 cursor-pointer'>
                      <td className='px-6 py-4'>
                        <div className='text-base leading-5 font-medium text-gray-900'>
                          {satir.metin}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-base leading-5 text-gray-900'>
                          {satir.toplam.toLocaleString('tr-TR')}
                        </div>
                      </td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
