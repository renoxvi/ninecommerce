'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import NineSdk from 'nine-sdk'

const ThankYouPage = () => {
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const { toast } = useToast()
  
  
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve wallet address from localStorage
    const storedAddress = localStorage.getItem('walletAddress')
    if (storedAddress) {
      setWalletAddress(storedAddress)
    }
  }, [])

  const handlePayment = async () => {
    if (walletAddress) {
      console.log('Wallet connected:', walletAddress)
    } else {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet before proceeding with the payment.',
        variant: 'error',
      })
      return
    }

    setPaymentStatus('pending')

    try {
      // Initialize the SDK
      const sdk = new NineSdk({
        baseUrl: 'https://nine-ad9w.onrender.com', 
      })

      // Create the payment request
      const paymentResponse = await sdk.createRequest({
        requestInfo: {
          expectedAmount: 1, // Amount in cents (e.g., $79.97)
          payeeAddress: process.env.NEXT_PUBLIC_PAYEE_ADDRESS, 
          payerAddress: walletAddress,
          timestamp: new Date().toISOString(),
        },
        contentData: {
          reason: 'Order Payment',
          dueDate: new Date().toISOString(),
        },
        signerAddress: walletAddress,
      })

      if (paymentResponse) {
        setPaymentStatus('success')
        toast({
          title: 'Payment Successful',
          description: 'Thank you for your purchase! Your payment has been processed.',
          variant: 'success',
        })
        // Redirect to receipt page if needed
        router.push('/receipt')
      } else {
        setPaymentStatus('error')
        toast({
          title: 'Payment Failed',
          description: 'There was an issue processing your payment. Please try again.',
          variant: 'error',
        })
      }
    } catch (error) {
      setPaymentStatus('error')
      toast({
        title: 'Payment Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'error',
      })
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Thank You for Your Order!</h1>
      <p className='text-lg mb-6'>
        We’re processing your payment. Please review your order details below and complete the payment.
      </p>

      <div className='bg-gray-50 p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-semibold mb-4'>Order Summary</h2>
        <div className='flex justify-between mb-2'>
          <span className='font-medium'>Base price:</span>
          <span>$49.99</span>
        </div>
        <div className='flex justify-between mb-2'>
          <span className='font-medium'>Textured finish:</span>
          <span>$9.99</span>
        </div>
        <div className='flex justify-between mb-2'>
          <span className='font-medium'>Soft polycarbonate material:</span>
          <span>$19.99</span>
        </div>
        <div className='my-2 h-px bg-gray-200' />
        <div className='flex justify-between font-semibold'>
          <span>Order Total:</span>
          <span>$79.97</span>
        </div>
      </div>

      {/* Display Wallet Address */}
      {walletAddress && (
        <div className='text-center mb-4'>
          <p className='text-lg font-medium'>Connected Wallet:</p>
          <p className='text-gray-700'>{walletAddress}</p>
        </div>
      )}

      <div className='flex justify-center'>
        <Button
          onClick={handlePayment}
          className='px-6 py-3 bg-green-600 text-white hover:bg-green-700'>
          {paymentStatus === 'pending' ? 'Processing...' : 'Complete Payment'}
          <ArrowRight className='h-4 w-4 ml-2 inline' />
        </Button>
      </div>
    </div>
  )
}

export default ThankYouPage
