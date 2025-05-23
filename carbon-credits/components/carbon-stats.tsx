"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CarbonStats() {
  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="text-xl text-green-800">Carbon Statistics</CardTitle>
        <CardDescription>Your carbon footprint and offset data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-green-50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-white">
              Projects
            </TabsTrigger>
            <TabsTrigger value="impact" className="data-[state=active]:bg-white">
              Impact
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="rounded-lg border border-green-100 p-4">
              <h3 className="mb-2 font-semibold text-green-800">Carbon Footprint</h3>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Your annual emissions</span>
                <span className="font-medium text-green-800">250 tCO₂e</span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-green-100">
                <div className="h-full w-1/2 bg-green-500"></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>50% offset</span>
                <span>Goal: 100%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-green-100 p-4">
                <h3 className="mb-2 font-semibold text-green-800">Credits Purchased</h3>
                <p className="text-2xl font-bold text-green-800">325</p>
                <p className="text-xs text-muted-foreground">Total lifetime</p>
              </div>
              <div className="rounded-lg border border-green-100 p-4">
                <h3 className="mb-2 font-semibold text-green-800">Credits Used</h3>
                <p className="text-2xl font-bold text-green-800">75</p>
                <p className="text-xs text-muted-foreground">For carbon offsetting</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-4">
            <div className="space-y-4">
              <div className="rounded-lg border border-green-100 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-800">Reforestation Project</h3>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Amazon Rainforest, Brazil</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>Credits allocated: 50</span>
                  <span className="font-medium text-green-800">Impact: 50 tCO₂e</span>
                </div>
              </div>

              <div className="rounded-lg border border-green-100 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-800">Renewable Energy</h3>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Solar Farm, Nevada, USA</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>Credits allocated: 25</span>
                  <span className="font-medium text-green-800">Impact: 25 tCO₂e</span>
                </div>
              </div>

              <div className="rounded-lg border border-green-100 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-800">Ocean Conservation</h3>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    Pending
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Coral Reef Restoration, Australia</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>Credits allocated: 0</span>
                  <span className="font-medium text-green-800">Impact: 0 tCO₂e</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="mt-4">
            <div className="space-y-4">
              <div className="rounded-lg border border-green-100 p-4">
                <h3 className="mb-2 font-semibold text-green-800">Environmental Impact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>Trees planted</span>
                    <span className="font-medium text-green-800">~500 trees</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Clean energy generated</span>
                    <span className="font-medium text-green-800">~75 MWh</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Waste reduced</span>
                    <span className="font-medium text-green-800">~2 tons</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Water conserved</span>
                    <span className="font-medium text-green-800">~50,000 gallons</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-green-100 p-4">
                <h3 className="mb-2 font-semibold text-green-800">Sustainable Development Goals</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded bg-green-50 p-2 text-center">
                    <p className="text-xs font-medium text-green-800">SDG 7</p>
                    <p className="text-xs text-muted-foreground">Clean Energy</p>
                  </div>
                  <div className="rounded bg-green-50 p-2 text-center">
                    <p className="text-xs font-medium text-green-800">SDG 13</p>
                    <p className="text-xs text-muted-foreground">Climate Action</p>
                  </div>
                  <div className="rounded bg-green-50 p-2 text-center">
                    <p className="text-xs font-medium text-green-800">SDG 15</p>
                    <p className="text-xs text-muted-foreground">Life on Land</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
