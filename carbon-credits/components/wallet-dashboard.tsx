"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletInfo } from "@/components/wallet-info"
import { TransactionHistory } from "@/components/transaction-history"
import { WalletActions } from "@/components/wallet-actions"
import { TransferForm } from "@/components/transfer-form"
import { CarbonCreditActions } from "@/components/carbon-credit-actions"
import { OtherWalletsView } from "@/components/other-wallets-view"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, X } from "lucide-react"

// Simulating the Rust Wallet struct
interface Wallet {
  id: string
  balance: number
  carbonCredit: number
  history: string[]
  isLocked: boolean
}

// Simulated database of wallets
const walletsDatabase: Record<string, Wallet> = {
  wallet_001: {
    id: "wallet_001",
    balance: 5000,
    carbonCredit: 3,
    history: ["Wallet created with 5000 balance and 3 carbon credits"],
    isLocked: false,
  },
  wallet_002: {
    id: "wallet_002",
    balance: 15000,
    carbonCredit: 8,
    history: ["Wallet created with 15000 balance and 8 carbon credits"],
    isLocked: true,
  },
  wallet_003: {
    id: "wallet_003",
    balance: 2500,
    carbonCredit: 12,
    history: ["Wallet created with 2500 balance and 12 carbon credits"],
    isLocked: false,
  },
  wallet_004: {
    id: "wallet_004",
    balance: 8000,
    carbonCredit: 1,
    history: ["Wallet created with 8000 balance and 1 carbon credit"],
    isLocked: false,
  },
}

export function WalletDashboard() {
  const [myWallet, setMyWallet] = useState<Wallet>({
    id: "my_wallet",
    balance: 10000,
    carbonCredit: 5,
    history: ["Wallet created with 10000 balance and 5 carbon credits"],
    isLocked: false,
  })

  const [otherWallets, setOtherWallets] = useState<Record<string, Wallet>>(walletsDatabase)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Clear messages after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null)
      setSuccess(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [error, success])

  // Wallet operations
  const mint = (amount: number) => {
    if (myWallet.isLocked) {
      setError("Wallet is locked.")
      return
    }

    const updatedWallet = {
      ...myWallet,
      balance: myWallet.balance + amount,
      history: [...myWallet.history, `Minted ${amount} to wallet. Current balance: ${myWallet.balance + amount}`],
    }

    setMyWallet(updatedWallet)
    setSuccess(`Successfully minted ${amount} to your wallet.`)
  }

  const burn = (amount: number) => {
    if (myWallet.isLocked) {
      setError("Wallet is locked. Cannot burn.")
      return
    }

    if (myWallet.balance < amount) {
      setError("Not enough balance to burn.")
      return
    }

    const updatedWallet = {
      ...myWallet,
      balance: myWallet.balance - amount,
      history: [...myWallet.history, `Burned ${amount} from wallet. Current balance: ${myWallet.balance - amount}`],
    }

    setMyWallet(updatedWallet)
    setSuccess(`Successfully burned ${amount} from your wallet.`)
  }

  const toggleLock = () => {
    if (myWallet.isLocked) {
      const updatedWallet = {
        ...myWallet,
        isLocked: false,
        history: [...myWallet.history, "Wallet unlocked."],
      }
      setMyWallet(updatedWallet)
      setSuccess("Wallet unlocked successfully.")
    } else {
      const updatedWallet = {
        ...myWallet,
        isLocked: true,
        history: [...myWallet.history, "Wallet locked."],
      }
      setMyWallet(updatedWallet)
      setSuccess("Wallet locked successfully.")
    }
  }

  const transfer = (targetWalletId: string, amount: number) => {
    const targetWallet = otherWallets[targetWalletId]
    if (!targetWallet) {
      setError("Target wallet not found.")
      return
    }

    if (myWallet.isLocked || targetWallet.isLocked) {
      setError("One or both wallets are locked. Cannot make transfer.")
      return
    }

    if (myWallet.balance < amount) {
      setError("Not enough balance to transfer.")
      return
    }

    if (myWallet.carbonCredit < 1 || targetWallet.carbonCredit < 1) {
      setError("Not enough carbon credit to make transfer.")
      return
    }

    const updatedMyWallet = {
      ...myWallet,
      balance: myWallet.balance - amount,
      carbonCredit: myWallet.carbonCredit - 1,
      history: [
        ...myWallet.history,
        `Transferred ${amount} to wallet ${targetWalletId}. Current balance: ${myWallet.balance - amount}`,
      ],
    }

    const updatedTargetWallet = {
      ...targetWallet,
      balance: targetWallet.balance + amount,
      carbonCredit: targetWallet.carbonCredit - 1,
      history: [
        ...targetWallet.history,
        `Received ${amount} from wallet ${myWallet.id}. Current balance: ${targetWallet.balance + amount}`,
      ],
    }

    setMyWallet(updatedMyWallet)
    setOtherWallets((prev) => ({
      ...prev,
      [targetWalletId]: updatedTargetWallet,
    }))
    setSuccess(`Successfully transferred ${amount} to wallet ${targetWalletId}.`)
  }

  const transferCarbonCredit = (targetWalletId: string, amount: number) => {
    const targetWallet = otherWallets[targetWalletId]
    if (!targetWallet) {
      setError("Target wallet not found.")
      return
    }

    if (myWallet.isLocked || targetWallet.isLocked) {
      setError("One or both wallets are locked. Cannot make transfer.")
      return
    }

    if (myWallet.carbonCredit < amount) {
      setError("Not enough carbon credit to transfer.")
      return
    }

    const updatedMyWallet = {
      ...myWallet,
      carbonCredit: myWallet.carbonCredit - amount,
      history: [
        ...myWallet.history,
        `Transferred ${amount} carbon credits to wallet ${targetWalletId}. Current carbon credits: ${myWallet.carbonCredit - amount}`,
      ],
    }

    const updatedTargetWallet = {
      ...targetWallet,
      carbonCredit: targetWallet.carbonCredit + amount,
      history: [
        ...targetWallet.history,
        `Received ${amount} carbon credits from wallet ${myWallet.id}. Current carbon credits: ${targetWallet.carbonCredit + amount}`,
      ],
    }

    setMyWallet(updatedMyWallet)
    setOtherWallets((prev) => ({
      ...prev,
      [targetWalletId]: updatedTargetWallet,
    }))
    setSuccess(`Successfully transferred ${amount} carbon credits to wallet ${targetWalletId}.`)
  }

  const buyCarbonCredit = (amount: number) => {
    if (myWallet.isLocked) {
      setError("Wallet is locked.")
      return
    }

    const cost = amount * 1000
    if (cost > myWallet.balance) {
      setError("Not enough balance to buy carbon credits.")
      return
    }

    const updatedWallet = {
      ...myWallet,
      balance: myWallet.balance - cost,
      carbonCredit: myWallet.carbonCredit + amount,
      history: [
        ...myWallet.history,
        `Bought ${amount} carbon credits for ${cost}. Current balance: ${myWallet.balance - cost}, Carbon credits: ${myWallet.carbonCredit + amount}`,
      ],
    }

    setMyWallet(updatedWallet)
    setSuccess(`Successfully bought ${amount} carbon credits.`)
  }

  const sellCarbonCredit = (amount: number) => {
    if (myWallet.isLocked) {
      setError("Wallet is locked.")
      return
    }

    if (amount > myWallet.carbonCredit) {
      setError("Not enough carbon credits to sell.")
      return
    }

    const earnings = amount * 1000
    const updatedWallet = {
      ...myWallet,
      balance: myWallet.balance + earnings,
      carbonCredit: myWallet.carbonCredit - amount,
      history: [
        ...myWallet.history,
        `Sold ${amount} carbon credits for ${earnings}. Current balance: ${myWallet.balance + earnings}, Carbon credits: ${myWallet.carbonCredit - amount}`,
      ],
    }

    setMyWallet(updatedWallet)
    setSuccess(`Successfully sold ${amount} carbon credits for ${earnings}.`)
  }

  const burnCarbonCredit = (amount: number) => {
    if (myWallet.isLocked) {
      setError("Wallet is locked. Cannot burn carbon credits.")
      return
    }

    if (myWallet.carbonCredit < amount) {
      setError("Not enough carbon credits to burn.")
      return
    }

    const updatedWallet = {
      ...myWallet,
      carbonCredit: myWallet.carbonCredit - amount,
      history: [
        ...myWallet.history,
        `Burned ${amount} carbon credits. Current carbon credits: ${myWallet.carbonCredit - amount}`,
      ],
    }

    setMyWallet(updatedWallet)
    setSuccess(`Successfully burned ${amount} carbon credits.`)
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
          <X className="ml-auto h-4 w-4 cursor-pointer" onClick={() => setError(null)} />
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <AlertDescription>{success}</AlertDescription>
          <X className="ml-auto h-4 w-4 cursor-pointer" onClick={() => setSuccess(null)} />
        </Alert>
      )}

      <WalletInfo wallet={myWallet} title="Your Wallet" onToggleLock={toggleLock} />

      <Tabs defaultValue="actions" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-green-50">
          <TabsTrigger value="actions" className="data-[state=active]:bg-white">
            Wallet Actions
          </TabsTrigger>
          <TabsTrigger value="transfer" className="data-[state=active]:bg-white">
            Transfer
          </TabsTrigger>
          <TabsTrigger value="carbon" className="data-[state=active]:bg-white">
            Carbon Credits
          </TabsTrigger>
          <TabsTrigger value="other-wallets" className="data-[state=active]:bg-white">
            Other Wallets
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actions" className="mt-4">
          <WalletActions onMint={mint} onBurn={burn} isLocked={myWallet.isLocked} />
        </TabsContent>

        <TabsContent value="transfer" className="mt-4">
          <TransferForm
            onTransfer={transfer}
            onTransferCarbonCredit={transferCarbonCredit}
            wallet={myWallet}
            availableWallets={Object.keys(otherWallets)}
          />
        </TabsContent>

        <TabsContent value="carbon" className="mt-4">
          <CarbonCreditActions
            onBuy={buyCarbonCredit}
            onSell={sellCarbonCredit}
            onBurn={burnCarbonCredit}
            wallet={myWallet}
          />
        </TabsContent>

        <TabsContent value="other-wallets" className="mt-4">
          <OtherWalletsView wallets={otherWallets} />
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <TransactionHistory myWalletHistory={myWallet.history} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
