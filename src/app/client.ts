import { createWalletClient, createPublicClient, custom, http } from "viem";
import { sepolia } from "viem/chains";
import "viem/window";

export function ConnectPublicClient() {
  let transport;

  if (typeof window !== "undefined" && window.ethereum) {
    transport = custom(window.ethereum);
  } else {
    transport = http(); // fallback
  }

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: transport,
  });

  return publicClient;
}

export function ConnectWalletClient() {
  if (typeof window === "undefined" || !window.ethereum) {
    const errorMessage = "Web3 wallet is not installed. Please install Metamask.";
    throw new Error(errorMessage);
  }

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  });

  return walletClient;
}