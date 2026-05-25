import type { ComponentType } from 'react'

import { ArrowRightIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { NumberTicker } from '@/components/ui/number-ticker'
import { getLucideIcon } from '@/utils/icons'

type Plan = {
  name: string
  icon?: ComponentType<{ className?: string }>
  iconName?: string
  price: number
  description: string
  features: string[]
  isHighlighted?: boolean
}

const Pricing = ({ plans }: { plans: Plan[] }) => {
  return (
    <div className='bg-[#fafaf9] py-8 sm:py-16 lg:py-24' id='pricing'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:gap-24 lg:space-y-24 lg:px-8'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <p className='text-primary text-sm font-medium tracking-wide uppercase font-semibold'>Pricing snapshot</p>
          <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>Choose the right plan for you</h2>
          <p className='text-muted-foreground text-xl max-w-2xl mx-auto'>
            Note: This is a snapshot. See full details and additional API costs at{' '}
            <a href='https://aigreentick.com/pricing' className='text-primary hover:underline'>
              aigreentick.com/pricing
            </a>
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-0 space-y-8 lg:flex-row'>
          {plans.map((plan, index) => {
            const Icon = plan.icon || (plan.iconName ? getLucideIcon(plan.iconName) : getLucideIcon('Sparkles'))
            return (
              <div className='max-w-lg flex-1' key={index}>
                <Card
                  key={index}
                  className={cn('border-none py-8 shadow-md', {
                    'bg-primary shadow-none, border-none': plan.isHighlighted,
                    'lg:rounded-r-none': index === 0, // Remove right border radius for the right card
                    'lg:rounded-l-none': index === 2 // Remove left border radius for the left card
                  })}
                >
                  <CardContent className='flex flex-col gap-8 px-8'>
                    <div className='flex flex-col gap-4'>
                      <div
                        className={cn('bg-background flex size-14 items-center justify-center rounded-full p-1', {
                          'bg-primary/10': !plan.isHighlighted
                        })}
                      >
                        <Icon className='size-6 text-primary' />
                      </div>

                      <Badge className='w-fit uppercase' variant={plan.isHighlighted ? 'secondary' : 'default'}>
                        {plan.name}
                      </Badge>

                      <div className='flex gap-1.5'>
                        <span className={cn('text-lg font-medium', { 'text-primary-foreground': plan.isHighlighted })}>
                          $
                        </span>
                        <span className={cn('text-5xl font-semibold', { 'text-primary-foreground': plan.isHighlighted })}>
                          <NumberTicker startValue={0} value={plan.price} />
                        </span>
                      </div>

                      <p className={cn('text-muted-foreground', { 'text-primary-foreground': plan.isHighlighted })}>
                        {plan.description}
                      </p>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                      {plan.features.map((feature, i) => (
                        <div key={i} className='flex items-center gap-2 py-1'>
                          <div
                            className={cn('bg-primary flex size-4.5 items-center justify-center rounded-full p-0.5', {
                              'bg-background': plan.isHighlighted
                            })}
                          >
                            <ArrowRightIcon
                              className={cn('text-primary-foreground size-3', {
                                'text-foreground': plan.isHighlighted
                              })}
                            />
                          </div>
                          <span className={cn({ 'text-primary-foreground': plan.isHighlighted })}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button size='lg' className='rounded-full' variant={plan.isHighlighted ? 'secondary' : 'outline'}>
                      Get started
                      <ArrowRightIcon />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Pricing
