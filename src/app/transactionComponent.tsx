"use client";

import { useState } from "react";
import { parseGwei } from "viem";
import { ConnectWalletClient } from "./client";

export default function TransactionComponent() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);

  async function handleClick() {
    try {
      const walletClient = ConnectWalletClient();
      const [address] = await walletClient.getAddresses();

      // Validate and format the recipient address
      if (!recipient.startsWith('0x')) {
        throw new Error('Recipient address must start with 0x');
      }
      if (recipient.length !== 42) {
        throw new Error('Invalid recipient address length');
      }

      const hash = await walletClient.sendTransaction({
        account: address,
        to: recipient as `0x${string}`,
        value: parseGwei(amount), // GWei
      });

      alert(`Transaction successful. Transaction Hash: ${hash}`);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <div className="card">
      <label>
        Amount (GWei):
        <input
          placeholder="e.g. 100"
          value={amount}
          onChange={setValue(setAmount)}
        />
      </label>
      <br />
      <label>
        Recipient:
        <input
          placeholder="0x..."
          value={recipient}
          onChange={setValue(setRecipient)}
        />
      </label>
      <br />
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center"
        onClick={handleClick}
      >
        Send Transaction
      </button>
    </div>
  );
}