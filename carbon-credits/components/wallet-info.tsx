"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WalletProps {
  wallet: {
    balance: number
    carbonCredit: number
    isLocked: boolean
  }
  title: string
  onToggleLock?: () => void
  isReadOnly?: boolean
}

export function WalletInfo({ wallet, title, onToggleLock, isReadOnly = false }: WalletProps) {
  return (
    <Card className="border-green-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-green-800">{title}</CardTitle>
        <Badge variant={wallet.isLocked ? "destructive" : "outline"} className="ml-2">
          {wallet.isLocked ? <Lock className="mr-1 h-3 w-3" /> : <Unlock className="mr-1 h-3 w-3" />}
          {wallet.isLocked ? "Locked" : "Unlocked"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-green-100 bg-green-50 p-4">
            <div className="flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Balance</span>
            </div>
            <div className="text-xl font-bold text-green-800">{wallet.balance.toLocaleString()}</div>
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
            <div className="text-xl font-bold text-green-800">{wallet.carbonCredit.toLocaleString()}</div>
          </div>

          {!isReadOnly && onToggleLock && (
            <Button
              onClick={onToggleLock}
              variant="outline"
              className="w-full border-green-200 bg-white hover:bg-green-50"
            >
              {wallet.isLocked ? (
                <>
                  <Unlock className="mr-2 h-4 w-4" />
                  Unlock Wallet
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Lock Wallet
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
