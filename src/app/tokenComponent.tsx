"use client";

import { useState } from "react";
import { getContract, Address } from "viem";
import { contractAbi } from "./abi";
import { ConnectWalletClient } from "./client";

export default function TokenComponent() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [result, setResult] = useState("");

  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);
  const walletClient = ConnectWalletClient();

  async function buttonClick() {
    try {
      const address = contractAddress as Address;

      const contract = getContract({
        address: address,
        abi: contractAbi,
        client: walletClient,
      });

      const symbol = await contract.read.symbol();
      const name = await contract.read.name();
      const owner = await contract.read.ownerOf([BigInt(tokenId)]);

      setResult(`Symbol: ${symbol}, Name: ${name}, Owner: ${owner}`);
    } catch (error) {
      alert("Ошибка при получении данных: " + error);
    }
  }

  return (
    <div className="card">
      <label>
        Contract address:
        <input
          placeholder="0x..."
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        />
      </label>
      <br />
      <label>
        Token ID:
        <input
          placeholder="1"
          value={tokenId}
          onChange={setValue(setTokenId)}
        />
      </label>
      <br />
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center"
        onClick={buttonClick}
      >
        <h1 className="text-center">Token Info</h1>
      </button>
      <div className="mt-4">{result}</div>
    </div>
  );
}