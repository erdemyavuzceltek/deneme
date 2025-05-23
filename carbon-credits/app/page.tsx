import { WalletDashboard } from "@/components/wallet-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-green-800 md:text-4xl">Carbon Credit Wallet</h1>
        <WalletDashboard />
      </div>
    </main>
  )
}
