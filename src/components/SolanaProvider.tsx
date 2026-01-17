"use client"; // CRITICAL: This allows the browser to talk to Phantom/Solana

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Import the visual styles for the wallet modal
import "@solana/wallet-adapter-react-ui/styles.css";

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Set the network to 'devnet' for testing Elena's payments
  // Switch to 'mainnet-beta' when you are ready for real SOL
  const network = WalletAdapterNetwork.Devnet;

  // 2. The endpoint is the 'phone line' to the blockchain
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // 3. Define which wallets your users can use to pay Elena
  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* This renders your Landing Page and Elena's Chat inside the Solana context */}
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};