"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



export function LocationChart(data:any) {
  const chartData = data.data.map((item: any) => ({
  location: item.name,
  count: item.count,
}))

const chartConfig = {
  count: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

  return (
    <Card className=" p-0 border-none shadow-none min-h-[200px] min-w-[300px] ">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Location vs Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
           barSize={80}
            margin={{ left: 10 }}
          >
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="location"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
             className="font-bold" 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="hsl(var(--chart-3))" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}




