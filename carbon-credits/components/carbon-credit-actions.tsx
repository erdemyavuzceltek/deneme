"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, DollarSign, Flame } from "lucide-react"

interface CarbonCreditActionsProps {
  onBuy: (amount: number) => void
  onSell: (amount: number) => void
  onBurn: (amount: number) => void
  wallet: {
    balance: number
    carbonCredit: number
    isLocked: boolean
  }
}

export function CarbonCreditActions({ onBuy, onSell, onBurn, wallet }: CarbonCreditActionsProps) {
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [burnAmount, setBurnAmount] = useState("")

  const handleBuy = () => {
    const amount = Number.parseFloat(buyAmount)
    if (!isNaN(amount) && amount > 0) {
      onBuy(amount)
      setBuyAmount("")
    }
  }

  const handleSell = () => {
    const amount = Number.parseFloat(sellAmount)
    if (!isNaN(amount) && amount > 0) {
      onSell(amount)
      setSellAmount("")
    }
  }

  const handleBurn = () => {
    const amount = Number.parseFloat(burnAmount)
    if (!isNaN(amount) && amount > 0) {
      onBurn(amount)
      setBurnAmount("")
    }
  }

  const calculateBuyCost = (amount: string) => {
    const numAmount = Number.parseFloat(amount)
    if (!isNaN(numAmount) && numAmount > 0) {
      return numAmount * 1000
    }
    return 0
  }

  const calculateSellValue = (amount: string) => {
    const numAmount = Number.parseFloat(amount)
    if (!isNaN(numAmount) && numAmount > 0) {
      return numAmount * 1000
    }
    return 0
  }

  return (
    <Tabs defaultValue="buy" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-green-50">
        <TabsTrigger value="buy" className="data-[state=active]:bg-white">
          Buy Credits
        </TabsTrigger>
        <TabsTrigger value="sell" className="data-[state=active]:bg-white">
          Sell Credits
        </TabsTrigger>
        <TabsTrigger value="burn" className="data-[state=active]:bg-white">
          Burn Credits
        </TabsTrigger>
      </TabsList>

      <TabsContent value="buy" className="mt-4">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">Buy Carbon Credits</CardTitle>
            <CardDescription>Purchase carbon credits with your balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buy-amount" className="text-green-700">
                  Amount
                </Label>
                <Input
                  id="buy-amount"
                  type="number"
                  placeholder="Enter credits to buy"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="border-green-200"
                  min="0"
                  disabled={wallet.isLocked}
                />
                <p className="text-xs text-green-600">Available balance: {wallet.balance} units</p>
                <p className="text-xs text-amber-600">Cost: {calculateBuyCost(buyAmount)} units (1000 per credit)</p>
              </div>
              <Button
                onClick={handleBuy}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={
                  wallet.isLocked ||
                  !buyAmount ||
                  Number.parseFloat(buyAmount) <= 0 ||
                  calculateBuyCost(buyAmount) > wallet.balance
                }
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Carbon Credits
              </Button>
              {wallet.isLocked && <p className="text-center text-sm text-red-500">Wallet is locked. Unlock to buy.</p>}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sell" className="mt-4">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">Sell Carbon Credits</CardTitle>
            <CardDescription>Convert carbon credits to balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sell-amount" className="text-green-700">
                  Amount
                </Label>
                <Input
                  id="sell-amount"
                  type="number"
                  placeholder="Enter credits to sell"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  className="border-green-200"
                  min="0"
                  max={wallet.carbonCredit.toString()}
                  disabled={wallet.isLocked}
                />
                <p className="text-xs text-green-600">Available credits: {wallet.carbonCredit} credits</p>
                <p className="text-xs text-amber-600">
                  Value: {calculateSellValue(sellAmount)} units (1000 per credit)
                </p>
              </div>
              <Button
                onClick={handleSell}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={
                  wallet.isLocked ||
                  !sellAmount ||
                  Number.parseFloat(sellAmount) <= 0 ||
                  Number.parseFloat(sellAmount) > wallet.carbonCredit
                }
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Sell Carbon Credits
              </Button>
              {wallet.isLocked && <p className="text-center text-sm text-red-500">Wallet is locked. Unlock to sell.</p>}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="burn" className="mt-4">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">Burn Carbon Credits</CardTitle>
            <CardDescription>Remove carbon credits from your wallet</CardDescription>
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
                  placeholder="Enter credits to burn"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="border-green-200"
                  min="0"
                  max={wallet.carbonCredit.toString()}
                  disabled={wallet.isLocked}
                />
                <p className="text-xs text-green-600">Available credits: {wallet.carbonCredit} credits</p>
              </div>
              <Button
                onClick={handleBurn}
                variant="destructive"
                className="w-full"
                disabled={
                  wallet.isLocked ||
                  !burnAmount ||
                  Number.parseFloat(burnAmount) <= 0 ||
                  Number.parseFloat(burnAmount) > wallet.carbonCredit
                }
              >
                <Flame className="mr-2 h-4 w-4" />
                Burn Carbon Credits
              </Button>
              {wallet.isLocked && <p className="text-center text-sm text-red-500">Wallet is locked. Unlock to burn.</p>}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
