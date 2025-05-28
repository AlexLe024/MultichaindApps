import WalletComponent from "./walletComponent";
import TransactionComponent from "./transactionComponent";
import TokenComponent from "./tokenComponent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <WalletComponent />
      <TransactionComponent />
      <TokenComponent />
    </main>
  );
}