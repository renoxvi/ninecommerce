import { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import Image from 'next/image'
import { buttonVariants } from './ui/button'

const LoginModal = ({
  isOpen,
  setIsOpen,
  onWalletConnected,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onWalletConnected: (address: string, publicKey: string) => void
}) => {
  
  const handleConnectWallet = async () => {
    try {
      const response = await window.okxwallet.aptos.connect()
      const { address, publicKey } = response

      console.log('Wallet response:', response)
      
      if (address && publicKey) {
        localStorage.setItem('walletAddress', address)
        localStorage.setItem('publicKey', publicKey)
        onWalletConnected(address, publicKey)
        setIsOpen(false)
      } else {
        console.error('Failed to get address or publicKey')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className='absolute z-[9999999]'>
        <DialogHeader>
          <div className='relative mx-auto w-24 h-24 mb-2'>
            <Image
              src='/snake-1.png'
              alt='snake image'
              className='object-contain'
              fill
            />
          </div>
          <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900'>
            Connect wallet to continue
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            <span className='font-medium text-zinc-900'>
              Your configuration was saved!
            </span>{' '}
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-1 gap-6'>
          <button
            className={buttonVariants({ variant: 'outline' })}
            onClick={handleConnectWallet}
          >
            Connect OKX Wallet
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
