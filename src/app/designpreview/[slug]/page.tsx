"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import Confetti from 'react-dom-confetti'
import LoginModal from '@/components/LoginModal'
import { useToast } from '@/components/ui/use-toast'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import Image from 'next/image'

const iPhoneDetails = {
  'iphone-x': { name: 'iPhone X', imgSrc: '/iphone x.png' },
  'iphone-11': { name: 'iPhone 11', imgSrc: '/iphone 11.png' },
  'iphone-12': { name: 'iPhone 12', imgSrc: '/iphone 12.png' },
  'iphone-13': { name: 'iPhone 13', imgSrc: '/iphone 13.png' },
  'iphone-14': { name: 'iPhone 14', imgSrc: '/iphone 14.png' },
  'iphone-15': { name: 'iPhone 15', imgSrc: '/iphone 15.png' },
};

const DesignPreview = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string>('default')
  const { connect, disconnect, connected, wallet, account } = useWallet()
  const { toast } = useToast()

  const iPhone = iPhoneDetails[params.slug];

  useEffect(() => setShowConfetti(true), []);

  const handleCheckout = async () => {
    if (connected) {
      console.log('Wallet connected:', account?.address)
      router.push('/thank-you')
    } else {
      setIsLoginModalOpen(true)
    }
  };
  const handlePaypal = () => {
    router.push('/paypal')
  }
  const handleWalletConnected = () => {
    router.push('/thank-you')
  }

  return (
    <>
      <div
        aria-hidden='true'
        className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        setIsOpen={setIsLoginModalOpen}
        onWalletConnected={handleWalletConnected}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-1'>
        <div className='flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
          <div className='md:col-span-4 lg:col-span-5 md:row-span-2 md:row-end-2'>
          <Image
                src={iPhone.imgSrc}
                alt={iPhone.name}
                width={500}
                height={900}
                className="object-cover w-full"
              />
          </div>

          <div className='mt-6 sm:col-span-9 md:row-end-1'>
            <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
              Customize your <span className='text-green-600'>{iPhone.name}</span> and purchase
            </h3>
            <div className='mt-3 flex items-center gap-1.5 text-base'>
              <Check className='h-4 w-4 text-green-500' />
              In stock and ready to ship
            </div>
          </div>

          <div className='sm:col-span-12 md:col-span-9 text-base'>
            <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
              <div>
                <p className='font-medium text-zinc-950'>Highlights</p>
                <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                  <li>Wireless charging compatible</li>
                  <li>TPU shock absorption</li>
                  <li>Packaging made from recycled materials</li>
                  <li>5 year print warranty</li>
                </ol>
              </div>
              <div>
                <p className='font-medium text-zinc-950'>Materials</p>
                <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                  <li>High-quality, durable material</li>
                  <li>Scratch- and fingerprint resistant coating</li>
                </ol>
              </div>
            </div>

            <div className='mt-8'>
              <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
                <div className='flow-root text-sm'>
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-gray-600'>Price</p>
                    <p className='font-medium text-gray-900'>
                      $999.99
                    </p>
                  </div>

                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-gray-600'>Textured finish</p>
                    <p className='font-medium text-gray-900'>
                      $9.99
                    </p>
                  </div>

                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-gray-600'>Soft polycarbonate material</p>
                    <p className='font-medium text-gray-900'>
                      $19.99
                    </p>
                  </div>

                  <div className='my-2 h-px bg-gray-200' />

                  <div className='flex items-center text-base justify-between py-2'>
                    <p className='font-semibold text-gray-900'>Order total</p>
                    <p className='font-semibold text-gray-900'>
                    $1029.97
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
  <div className='flex flex-col'>
    <p className='font-medium text-gray-700'>Select Phone Color</p>
    <div className='mt-4 flex justify-between items-center'>
      <div className='flex gap-4'>
        {['default', 'red', 'blue', 'black'].map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-10 h-10 rounded-full ${color === selectedColor ? 'border-2 border-black' : ''}`}
            style={{ backgroundColor: color === 'default' ? 'green' : color }}
          />
        ))}
      </div>
      <div className='flex gap-4'>
        <Button
          onClick={handleCheckout}
          className='ml-4 px-5 sm:px-7 lg:px-9 text-lg hover:bg-slate-500'>
          Check out with Nine Pay <ArrowRight className='h-4 w-4 ml-1.5 inline' />
        </Button>
        <Button
          onClick={handlePaypal}
          className='px-5 sm:px-7 lg:px-9 bg-blue-500 hover:bg-gray-400 text-lg'>
          Check out with PayPal <ArrowRight className='h-4 w-4 ml-1.5 inline' />
        </Button>
      </div>
    </div>
  </div>
</div>


              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview
