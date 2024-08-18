'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { Network } from '@aptos-labs/ts-sdk';
import { PetraWallet } from "petra-plugin-wallet-adapter";

const client = new QueryClient()


const Providers = ({ children }: { children: ReactNode }) => {
  
  const wallets = [
    // new BitgetWallet(),
    // new FewchaWallet(),
    // new MartianWallet(),
    // new MSafeWalletAdapter(),
    // new PontemWallet(),
    // new TrustWallet(),
    new PetraWallet()
  ];
  return <QueryClientProvider client={client}>
    <AptosWalletAdapterProvider
  plugins={wallets}
  autoConnect={true}
  dappConfig={{ network: Network.TESTNET }}
  onError={(error) => {
    console.log("error", error);
  }}
>{children}
</AptosWalletAdapterProvider>
    </QueryClientProvider>
}

export default Providers
