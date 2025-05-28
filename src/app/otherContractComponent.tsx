"use client";

import { useState } from "react";
import { getContract, Address } from "viem";
import { abi2 } from "./abi2";
import { ConnectPublicClient } from "./client";

export default function OtherContractComponent() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [output, setOutput] = useState("");

  const setValue = (setter: any) => (e: any) => setter(e.target.value);

  async function handleClick() {
    try {
      const address = contractAddress as Address;
      const publicClient = ConnectPublicClient();

      const contract = getContract({
        address,
        abi: abi2,
        client: publicClient,
      });

      const name = await contract.read.name();
      const symbol = await contract.read.symbol();
      const total = (await contract.read.totalSupply()) as bigint;

      let owner = "";
      let uri = "";
      if (tokenId) {
        owner = (await contract.read.ownerOf([BigInt(tokenId)])) as string;
        uri = (await contract.read.tokenURI([BigInt(tokenId)])) as string;
      }

      setOutput(
        `Name: ${name}\nSymbol: ${symbol}\nTotal Supply: ${total.toString()}\n` +
        (tokenId
          ? `Token #${tokenId}\nOwner: ${owner}\nURI: ${uri}`
          : "")
      );
    } catch (err) {
      alert("Ошибка: " + err);
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
        Token ID (optional):
        <input
          placeholder="1"
          value={tokenId}
          onChange={setValue(setTokenId)}
        />
      </label>
      <br />
      <button
        className="px-8 py-2 rounded-md bg-blue-600 text-white"
        onClick={handleClick}
      >
        Read Contract
      </button>
      <pre className="mt-4 whitespace-pre-wrap">{output}</pre>
    </div>
  );
}