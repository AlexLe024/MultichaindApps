"use client";

import { useState } from "react";
import { ConnectWalletClient, ConnectPublicClient } from "./client";

export default function WalletComponent() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<bigint>(BigInt(0));

  async function handleConnect() {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      const walletClient = ConnectWalletClient();
      const publicClient = ConnectPublicClient();
  
      const [userAddress] = await (window.ethereum.request({
        method: "eth_requestAccounts",
      }) as Promise<string[]>);
  
      const userBalance = await publicClient.getBalance({
        address: userAddress as `0x${string}`,
      });
  
      setAddress(userAddress);
      setBalance(userBalance);
    } catch (error) {
      alert(`Ошибка подключения: ${error}`);
    }
  }

  function handleDisconnect() {
    setAddress(null);
    setBalance(BigInt(0));
  }

  return (
    <div className="card">
      <Status address={address} balance={balance} />
      {!address ? (
        <button
          className="px-8 py-2 rounded-md flex flex-row items-center justify-center"
          onClick={handleConnect}
        >
          <h1 className="mx-auto">Connect Wallet</h1>
        </button>
      ) : (
        <button
          className="px-8 py-2 mt-2 rounded-md flex flex-row items-center justify-center bg-red-500 text-white"
          onClick={handleDisconnect}
        >
          <h1 className="mx-auto">Disconnect Wallet</h1>
        </button>
      )}
    </div>
  );
}

function Status({
  address,
  balance,
}: {
  address: string | null;
  balance: bigint;
}) {
  if (!address) {
    return (
      <div className="flex items-center mb-4">
        <div className="border bg-red-600 border-red-600 rounded-full w-3 h-3 mr-2"></div>
        <div>Disconnected</div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full mb-4">
      <div className="border bg-green-500 border-green-500 rounded-full w-3 h-3 mr-2"></div>
      <div className="text-sm">
        {address} <br />
        <b>Balance:</b> {balance.toString()} <b>Wei</b>
      </div>
    </div>
  );
}