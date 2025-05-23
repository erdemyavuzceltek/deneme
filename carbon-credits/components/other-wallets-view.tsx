"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Wallet, Lock, Unlock, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WalletType {
  id: string
  balance: number
  carbonCredit: number
  history: string[]
  isLocked: boolean
}

interface OtherWalletsViewProps {
  wallets: Record<string, WalletType>
}

export function OtherWalletsView({ wallets }: OtherWalletsViewProps) {
  const [searchId, setSearchId] = useState("")
  const [viewedWallet, setViewedWallet] = useState<WalletType | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleSearch = () => {
    if (!searchId.trim()) {
      setViewedWallet(null)
      return
    }

    const wallet = wallets[searchId.trim()]
    if (wallet) {
      setViewedWallet(wallet)
      setShowDetails(false)
    } else {
      setViewedWallet(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-xl text-green-800">Search Other Wallets</CardTitle>
          <CardDescription>Enter a wallet ID to view its public information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wallet-search" className="text-green-700">
                Wallet ID
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="wallet-search"
                  placeholder="Enter wallet ID (e.g., wallet_001)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-green-200"
                />
                <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {searchId && !viewedWallet && (
              <Alert variant="destructive" className="bg-red-50">
                <AlertDescription>Wallet ID "{searchId}" not found.</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Wallet IDs for reference */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">Available Wallet IDs</CardTitle>
          <CardDescription>Click on any wallet ID to search for it</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {Object.keys(wallets).map((walletId) => (
              <Button
                key={walletId}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchId(walletId)
                  setViewedWallet(wallets[walletId])
                  setShowDetails(false)
                }}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                {walletId}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wallet Details */}
      {viewedWallet && (
        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl text-green-800">Wallet: {viewedWallet.id}</CardTitle>
              <CardDescription>Public wallet information</CardDescription>
            </div>
            <Badge variant={viewedWallet.isLocked ? "destructive" : "outline"} className="ml-2">
              {viewedWallet.isLocked ? <Lock className="mr-1 h-3 w-3" /> : <Unlock className="mr-1 h-3 w-3" />}
              {viewedWallet.isLocked ? "Locked" : "Unlocked"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-4">
                  <div className="flex items-center">
                    <Wallet className="mr-2 h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Balance</span>
                  </div>
                  <div className="text-xl font-bold text-green-800">{viewedWallet.balance.toLocaleString()}</div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-4">
                  <div className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <span className="font-medium text-green-800">Carbon Credits</span>
                  </div>
                  <div className="text-xl font-bold text-green-800">{viewedWallet.carbonCredit.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Transaction History</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  {showDetails ? (
                    <>
                      <EyeOff className="mr-1 h-3 w-3" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <Eye className="mr-1 h-3 w-3" />
                      Show Details
                    </>
                  )}
                </Button>
              </div>

              {showDetails && (
                <div className="max-h-60 overflow-y-auto rounded-md border border-green-100 p-4">
                  {viewedWallet.history.length === 0 ? (
                    <p className="text-center text-muted-foreground">No transaction history</p>
                  ) : (
                    <ul className="space-y-2">
                      {viewedWallet.history
                        .slice()
                        .reverse()
                        .map((transaction, index) => (
                          <li key={index} className="rounded-lg border border-green-100 bg-green-50 p-2 text-xs">
                            {transaction}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              )}

              <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <AlertDescription>
                  This wallet is available for transfers. You can send balance or carbon credits to this wallet using
                  the Transfer tab.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
