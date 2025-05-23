import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TransactionHistoryProps {
  myWalletHistory: string[]
}

export function TransactionHistory({ myWalletHistory }: TransactionHistoryProps) {
  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Transaction History</CardTitle>
        <CardDescription>Your wallet transaction history</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border border-green-100 p-4">
          {myWalletHistory.length === 0 ? (
            <p className="text-center text-muted-foreground">No transaction history</p>
          ) : (
            <ul className="space-y-2">
              {myWalletHistory
                .slice()
                .reverse()
                .map((transaction, index) => (
                  <li key={index} className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm">
                    {transaction}
                  </li>
                ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
