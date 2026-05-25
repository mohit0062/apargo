import type { ComponentType } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { cn } from '@/lib/utils'

// Statistics card data type
type StatisticsCardProps = {
  icon: ComponentType
  title: string
  time: string
  value: string
  changePercentage: number
  className?: string
  iconClassName?: string
}

const StatisticsCard = ({
  icon: Icon,
  title,
  time,
  value,
  changePercentage,
  className,
  iconClassName
}: StatisticsCardProps) => {
  return (
    <Card className={cn('justify-between gap-4', className)}>
      <CardHeader>
        <Avatar className='size-10 rounded-md'>
          <AvatarFallback
            className={cn('bg-primary/10 text-primary size-10 shrink-0 rounded-md [&>svg]:size-5', iconClassName)}
          >
            <Icon />
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col justify-around gap-4'>
        <p className='flex flex-col gap-1'>
          <span className='font-semibold'>{title}</span>
          <span className='text-muted-foreground text-sm'>{time}</span>
          <span className='font-medium'>{value}</span>
        </p>
        <Badge
          className={cn('rounded-sm', {
            'bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400': changePercentage > 0,
            'bg-destructive/10 text-destructive': changePercentage < 0
          })}
        >
          {changePercentage > 0 ? '+' : ''}
          {changePercentage}%
        </Badge>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
