"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightIcon } from "lucide-react"

interface TransferFormProps {
  onTransfer: (targetWalletId: string, amount: number) => void
  onTransferCarbonCredit: (targetWalletId: string, amount: number) => void
  wallet: {
    balance: number
    carbonCredit: number
    isLocked: boolean
  }
  availableWallets: string[]
}

export function TransferForm({ onTransfer, onTransferCarbonCredit, wallet, availableWallets }: TransferFormProps) {
  const [transferAmount, setTransferAmount] = useState("")
  const [carbonCreditAmount, setCarbonCreditAmount] = useState("")
  const [selectedWallet, setSelectedWallet] = useState("")
  const [selectedCarbonWallet, setSelectedCarbonWallet] = useState("")

  const handleTransfer = () => {
    const amount = Number.parseFloat(transferAmount)
    if (!isNaN(amount) && amount > 0 && selectedWallet) {
      onTransfer(selectedWallet, amount)
      setTransferAmount("")
      setSelectedWallet("")
    }
  }

  const handleTransferCarbonCredit = () => {
    const amount = Number.parseFloat(carbonCreditAmount)
    if (!isNaN(amount) && amount > 0 && selectedCarbonWallet) {
      onTransferCarbonCredit(selectedCarbonWallet, amount)
      setCarbonCreditAmount("")
      setSelectedCarbonWallet("")
    }
  }

  return (
    <Tabs defaultValue="balance" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-green-50">
        <TabsTrigger value="balance" className="data-[state=active]:bg-white">
          Transfer Balance
        </TabsTrigger>
        <TabsTrigger value="carbon" className="data-[state=active]:bg-white">
          Transfer Carbon Credits
        </TabsTrigger>
      </TabsList>

      <TabsContent value="balance" className="mt-4">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">Transfer Balance</CardTitle>
            <CardDescription>Send balance to another wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-wallet" className="text-green-700">
                  Target Wallet
                </Label>
                <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                  <SelectTrigger id="target-wallet" className="border-green-200">
                    <SelectValue placeholder="Select target wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableWallets.map((walletId) => (
                      <SelectItem key={walletId} value={walletId}>
                        {walletId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transfer-amount" className="text-green-700">
                  Amount
                </Label>
                <Input
                  id="transfer-amount"
                  type="number"
                  placeholder="Enter amount to transfer"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="border-green-200"
                  min="0"
                  max={wallet.balance.toString()}
                  disabled={wallet.isLocked}
                />
                <p className="text-xs text-green-600">Available balance: {wallet.balance} units</p>
                <p className="text-xs text-amber-600">Note: Transfers require 1 carbon credit from both wallets</p>
              </div>
              <Button
                onClick={handleTransfer}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={
                  wallet.isLocked ||
                  !transferAmount ||
                  !selectedWallet ||
                  Number.parseFloat(transferAmount) <= 0 ||
                  Number.parseFloat(transferAmount) > wallet.balance ||
                  wallet.carbonCredit < 1
                }
              >
                Transfer Balance
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              {wallet.isLocked && (
                <p className="text-center text-sm text-red-500">Wallet is locked. Unlock to transfer.</p>
              )}
              {wallet.carbonCredit < 1 && (
                <p className="text-center text-sm text-red-500">Not enough carbon credits for transfer.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="carbon" className="mt-4">
        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-xl text-green-800">Transfer Carbon Credits</CardTitle>
            <CardDescription>Send carbon credits to another wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-carbon-wallet" className="text-green-700">
                  Target Wallet
                </Label>
                <Select value={selectedCarbonWallet} onValueChange={setSelectedCarbonWallet}>
                  <SelectTrigger id="target-carbon-wallet" className="border-green-200">
                    <SelectValue placeholder="Select target wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableWallets.map((walletId) => (
                      <SelectItem key={walletId} value={walletId}>
                        {walletId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbon-credit-amount" className="text-green-700">
                  Amount
                </Label>
                <Input
                  id="carbon-credit-amount"
                  type="number"
                  placeholder="Enter carbon credits to transfer"
                  value={carbonCreditAmount}
                  onChange={(e) => setCarbonCreditAmount(e.target.value)}
                  className="border-green-200"
                  min="0"
                  max={wallet.carbonCredit.toString()}
                  disabled={wallet.isLocked}
                />
                <p className="text-xs text-green-600">Available carbon credits: {wallet.carbonCredit} credits</p>
              </div>
              <Button
                onClick={handleTransferCarbonCredit}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={
                  wallet.isLocked ||
                  !carbonCreditAmount ||
                  !selectedCarbonWallet ||
                  Number.parseFloat(carbonCreditAmount) <= 0 ||
                  Number.parseFloat(carbonCreditAmount) > wallet.carbonCredit
                }
              >
                Transfer Carbon Credits
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
              {wallet.isLocked && (
                <p className="text-center text-sm text-red-500">Wallet is locked. Unlock to transfer.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
