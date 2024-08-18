"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedAddress = localStorage.getItem('walletAddress')
    const storedPublicKey = localStorage.getItem('publicKey')
    if (storedAddress && storedPublicKey) {
      setWalletAddress(storedAddress)
      setPublicKey(storedPublicKey)
    }
  }, [])

  const handleWalletConnected = (address: string, publicKey: string) => {
    console.log('Wallet connected:', { address, publicKey })
    setWalletAddress(address)
    setPublicKey(publicKey)
  }

  if (!isClient) return null

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold'>
            Nine<span className='text-green-600'>Commerce</span>
          </Link>

          <div className='ml-5 h-full flex items-center space-x-4'>
            {walletAddress && (
              <span className='text-sm text-gray-700'>
                Wallet: {walletAddress}
              </span>
            )}
            {publicKey && (
              <span className='text-sm text-gray-700'>
                Public Key: {publicKey}
              </span>
            )}
            <Link
              href='/'
              className={buttonVariants({
                size: 'sm',
                className: 'hidden sm:flex items-center gap-1',
              })}
            >
              Purchase your Customized iPhone today!
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
