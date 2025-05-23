"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, MinusCircle } from "lucide-react"

interface WalletActionsProps {
  onMint: (amount: number) => void
  onBurn: (amount: number) => void
  isLocked: boolean
}

export function WalletActions({ onMint, onBurn, isLocked }: WalletActionsProps) {
  const [mintAmount, setMintAmount] = useState("")
  const [burnAmount, setBurnAmount] = useState("")

  const handleMint = () => {
    const amount = Number.parseFloat(mintAmount)
    if (!isNaN(amount) && amount > 0) {
      onMint(amount)
      setMintAmount("")
    }
  }

  const handleBurn = () => {
    const amount = Number.parseFloat(burnAmount)
    if (!isNaN(amount) && amount > 0) {
      onBurn(amount)
      setBurnAmount("")
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-xl text-green-800">Mint Balance</CardTitle>
          <CardDescription>Add funds to your wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mint-amount" className="text-green-700">
                Amount
              </Label>
              <Input
                id="mint-amount"
                type="number"
                placeholder="Enter amount to mint"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                className="border-green-200"
                min="0"
                disabled={isLocked}
              />
            </div>
            <Button
              onClick={handleMint}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLocked || !mintAmount || Number.parseFloat(mintAmount) <= 0}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Mint Balance
            </Button>
            {isLocked && <p className="text-center text-sm text-red-500">Wallet is locked. Unlock to mint.</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-xl text-green-800">Burn Balance</CardTitle>
          <CardDescription>Remove funds from your wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="burn-amount" className="text-green-700">
                Amount
              </Label>
              <Input
                id="burn-amount"
                type="number"
                placeholder="Enter amount to burn"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
                className="border-green-200"
                min="0"
                disabled={isLocked}
              />
            </div>
            <Button
              onClick={handleBurn}
              variant="destructive"
              className="w-full"
              disabled={isLocked || !burnAmount || Number.parseFloat(burnAmount) <= 0}
            >
              <MinusCircle className="mr-2 h-4 w-4" />
              Burn Balance
            </Button>
            {isLocked && <p className="text-center text-sm text-red-500">Wallet is locked. Unlock to burn.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
