"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart"

export function OsDataChart(data:any) {


const chartData = data.data.map((item: any) => ({
  os: item.name,
  visitors: item.count,
    fill: `var(--color-${item.name === 'Windows' ? 'windows' : item.name})`

}));



const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  windows: {
    label: "Windows",
    color: "hsl(var(--chart-1))",
  },
  iOS: {
    label: "iOS",
    color: "hsl(var(--chart-2))",
  },
  macOS: {
    label: "macOS",
    color: "hsl(var(--chart-3))",
  },
  android: {
    label: "Android",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc:any, curr:any) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col border-none shadow-none min-h-[200px] min-w-[300px] ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl text-center">Operating System data</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="os"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}


