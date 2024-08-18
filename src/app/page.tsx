'use client'

import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Confetti from 'react-dom-confetti'
import { useRouter } from 'next/navigation'
import LoginModal from '@/components/LoginModal'
import { useToast } from '@/components/ui/use-toast'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

const DesignPreview = () => {
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string>('default')
  const { connect, disconnect, connected, wallet, account } = useWallet()
  const { toast } = useToast()

  useEffect(() => setShowConfetti(true), [])

  const handleCheckout = async () => {
    if (connected) {
      // Logic to handle checkout after wallet is connected
      console.log('Wallet connectedc:', account?.address)
      router.push('/thank-you')
    } else {
      setIsLoginModalOpen(true)
    }

  }

  const handleWalletConnected = () => {
    // Logic to update the Navbar or global state with the wallet address
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

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <div className='flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
          <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
            <Phone
              className="max-w-[150px] md:max-w-[200px] lg:max-w-[280px]"
              imgSrc={`/images/phone-${selectedColor}.png`} // Update image based on color
              color={selectedColor}
            />
          </div>

          <div className='mt-6 sm:col-span-9 md:row-end-1'>
            <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
              Customize your <span className='text-green-600'>Dream Iphone</span> and purchase
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
                    <p className='text-gray-600'>Base price</p>
                    <p className='font-medium text-gray-900'>
                      $49.99
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

                  <div className='flex items-center justify-between py-2'>
                    <p className='font-semibold text-gray-900'>Order total</p>
                    <p className='font-semibold text-gray-900'>
                      $79.97
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8'>
                <div className='flex flex-col items-center'>
                  <p className='font-medium text-gray-700'>Select Phone Color</p>
                  <div className='mt-4 flex gap-4'>
                    {['default', 'red', 'blue', 'black'].map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full ${color === selectedColor ? 'border-2 border-black' : ''}`}
                        style={{ backgroundColor: color === 'default' ? 'green' : color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className='mt-8 flex justify-end pb-12'>
                <Button
                  onClick={handleCheckout}
                  className='px-4 sm:px-6 lg:px-8'>
                  Check out <ArrowRight className='h-4 w-4 ml-1.5 inline' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview
