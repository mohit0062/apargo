'use client'

import { Area, AreaChart } from 'recharts'

import { Card, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const chartData = [
  { date: '2024-06-14', sales: 280 },
  { date: '2024-06-15', sales: 270 },
  { date: '2024-06-16', sales: 350 },
  { date: '2024-06-17', sales: 290 },
  { date: '2024-06-18', sales: 400 },
  { date: '2024-06-19', sales: 570 },
  { date: '2024-06-20', sales: 500 },
  { date: '2024-06-22', sales: 380 },
  { date: '2024-06-21', sales: 480 },
  { date: '2024-06-23', sales: 470 },
  { date: '2024-06-24', sales: 420 },
  { date: '2024-06-25', sales: 380 }
]

const chartConfig = {
  sales: {
    label: 'Sales'
  }
} satisfies ChartConfig

const TotalRevenue = () => {
  return (
    <Card className='gap-4 py-4'>
      {/* Area Chart */}
      <ChartContainer config={chartConfig} className='h-28.75 w-full'>
        <AreaChart
          data={chartData}
          margin={{
            left: 0,
            right: 0
          }}
          className='stroke-2'
        >
          <defs>
            <linearGradient id='fillSales' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='10%' stopColor='var(--primary)' stopOpacity={0.4} />
              <stop offset='90%' stopColor='var(--primary)' stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Area dataKey='sales' type='natural' fill='url(#fillSales)' stroke='var(--primary)' stackId='a' />
        </AreaChart>
      </ChartContainer>

      {/* Card Footer */}
      <CardFooter className='justify-between'>
        <span className='text-2xl font-semibold'>$12K</span>
        <span className='text-primary'>-18%</span>
      </CardFooter>
    </Card>
  )
}

export default TotalRevenue
