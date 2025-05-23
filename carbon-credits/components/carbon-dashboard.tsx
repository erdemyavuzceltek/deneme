"use client"

import { useState } from "react"
import { ArrowLeftRight, BarChart3, Clock, Leaf, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarbonStats } from "@/components/carbon-stats"
import { TransactionHistory } from "@/components/transaction-history"
import { TransferForm } from "@/components/transfer-form"

export function CarbonDashboard() {
  const [balance, setBalance] = useState(250)
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-05-20", amount: 50, type: "Purchase", from: "Carbon Market", to: "Your Account" },
    { id: 2, date: "2025-05-15", amount: 25, type: "Transfer", from: "Your Account", to: "Green Initiative Co." },
    { id: 3, date: "2025-05-10", amount: 100, type: "Purchase", from: "Carbon Market", to: "Your Account" },
    { id: 4, date: "2025-05-05", amount: 75, type: "Offset", from: "Your Account", to: "Reforestation Project" },
  ])

  const handleTransfer = (recipient: string, amount: number) => {
    if (amount <= 0 || amount > balance) return false

    // Update balance
    setBalance((prev) => prev - amount)

    // Add new transaction
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split("T")[0],
      amount: amount,
      type: "Transfer",
      from: "Your Account",
      to: recipient,
    }

    setTransactions((prev) => [newTransaction, ...prev])
    return true
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-green-800">{balance} Credits</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Carbon Offset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-green-800">125 tCO₂e</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Market Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-green-800">${(balance * 15).toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Last Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-green-600" />
              <div className="text-2xl font-bold text-green-800">3 days ago</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transfer" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-green-50">
          <TabsTrigger value="transfer" className="data-[state=active]:bg-white">
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            Transfer Credits
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white">
            <Clock className="mr-2 h-4 w-4" />
            Transaction History
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-white">
            <BarChart3 className="mr-2 h-4 w-4" />
            Carbon Stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transfer" className="mt-4">
          <TransferForm onTransfer={handleTransfer} maxAmount={balance} />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <TransactionHistory transactions={transactions} />
        </TabsContent>
        <TabsContent value="stats" className="mt-4">
          <CarbonStats />
        </TabsContent>
      </Tabs>
    </div>
  )
}
