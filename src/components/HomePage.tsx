// src/app/home/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const iphones = [
  { name: 'iPhone 15', slug: 'iphone-15', imgSrc: '/iphone 15.png' },
  { name: 'iPhone 14', slug: 'iphone-14', imgSrc: '/iphone 14.png' },
  { name: 'iPhone 13', slug: 'iphone-13', imgSrc: '/iphone 13.png' },
  { name: 'iPhone 12', slug: 'iphone-12', imgSrc: '/iphone 12.png' },
  { name: 'iPhone 11', slug: 'iphone-11', imgSrc: '/iphone 11.png' },
  { name: 'iPhone X', slug: 'iphone-x', imgSrc: '/iphone x.png' },
  
  
  
];

const Home = () => {
  const router = useRouter();

  const handleCardClick = (slug: string) => {
    router.push(`/designpreview/${slug}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className='bg-green-800 text-white py-10 text-center'>
        <h1 className='text-4xl font-bold'>Welcome to Nine Commerce</h1>
        <p className='mt-2 text-xl'>Explore our range of iPhones</p>
      </div>
        <div className="mb-3 mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {iphones.map((iphone) => (
            <div
              key={iphone.slug}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-2xl transition-shadow "
              onClick={() => handleCardClick(iphone.slug)}
            >
              <Image
                src={iphone.imgSrc}
                alt={iphone.name}
                width={500}
                height={500}
              />
              <h2 className="text-2xl font-semibold text-center mt-4">{iphone.name}</h2>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Home;
