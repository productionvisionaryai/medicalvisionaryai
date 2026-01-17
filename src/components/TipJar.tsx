"use client";
import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const TipJar = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState<string>("0.1"); // Default tip amount

    const sendTip = async () => {
        if (!publicKey) return alert("Please connect your wallet first!");
        
        try {
            // YOUR WALLET ADDRESS: Replace this with your actual public key
            const destination = new PublicKey("YOUR_RECEIVING_WALLET_ADDRESS");
            
            // Convert the user's string input to a number of Lamports
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: destination,
                    lamports: lamports,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');
            alert(`Tip of ${amount} SOL sent! Elena thanks you.`);
        } catch (error) {
            console.error("Tip failed:", error);
            alert("Transaction failed. Check your balance.");
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-pink-100 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold text-slate-800">Support Elena's Work</h3>
            <p className="text-sm text-slate-500">Send a tip to unlock premium health tips!</p>
            
            {!publicKey ? (
                <WalletMultiButton />
            ) : (
                <div className="flex flex-col gap-3 w-full">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="p-2 border rounded-md text-center font-mono"
                        placeholder="Amount in SOL"
                    />
                    <button 
                        onClick={sendTip}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-md font-bold hover:opacity-90 transition-all"
                    >
                        Send {amount} SOL Tip
                    </button>
                </div>
            )}
        </div>
    );
};