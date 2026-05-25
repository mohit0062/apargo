import type { ComponentType } from 'react'

import { ArrowRightIcon, CreditCardIcon, LandmarkIcon, WalletIcon } from 'lucide-react'

import StatisticsSalesOverviewCard from '@/components/shadcn-studio/blocks/statistics-sales-overview-card'
import StatisticsActivityCard from '@/components/shadcn-studio/blocks/statistics-activity-card'
import ServicesBySalesCard from '@/components/shadcn-studio/blocks/chart-services-by-sales'
import GeneralFinanceReviewsCard from '@/components/shadcn-studio/blocks/widget-general-finance-reviews'
import TotalEarningCard from '@/components/shadcn-studio/blocks/chart-total-earning'
import TransactionsCard from '@/components/shadcn-studio/blocks/widget-transactions'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { BorderBeam } from '@/components/ui/border-beam'
import { MotionPreset } from '@/components/ui/motion-preset'

// Transactions data
const transactions = [
  {
    icon: CreditCardIcon,
    paymentMethod: 'Credit Card',
    platform: 'Digital Ocean',
    amount: '$2820',
    paymentType: 'debit'
  },
  {
    icon: LandmarkIcon,
    paymentMethod: 'Bank account',
    platform: 'Received money',
    amount: '$1,260',
    paymentType: 'credit'
  },
  {
    icon: CreditCardIcon,
    paymentMethod: 'Credit Card',
    platform: 'Netflix',
    amount: '$149',
    paymentType: 'debit'
  },
  {
    icon: WalletIcon,
    paymentMethod: 'Wallet',
    platform: 'Starbucks',
    amount: '$49',
    paymentType: 'debit'
  },
  {
    icon: LandmarkIcon,
    paymentMethod: 'Bank account',
    platform: 'Received money',
    amount: '$268',
    paymentType: 'credit'
  }
]

import { getLucideIcon } from '@/utils/icons'

type FeatureItem = {
  title: string
  description: string
  iconName?: string
  icon?: ComponentType<{ className?: string }>
}

const stats = [
  {
    className: 'bg-primary',
    label: 'Profit',
    value: '$8,042',
    change: 16,
    changeType: 'decrease'
  },
  {
    className: 'bg-primary/10',
    label: 'Sales',
    value: '42',
    change: 6,
    changeType: 'increase'
  },
  {
    className: 'bg-primary/20',
    label: 'User',
    value: '1,200',
    change: 21,
    changeType: 'increase'
  }
]

const Features = ({ features }: { features: FeatureItem[] }) => {
  return (
    <section className="relative overflow-hidden py-8 before:absolute before:inset-0 before:size-full before:bg-[url('https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-40.png')] before:bg-size-[auto_60%] before:bg-bottom-right before:bg-no-repeat before:opacity-60 sm:py-16 lg:py-24 lg:before:bg-size-[50%] lg:before:bg-bottom-right">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='relative grid items-center gap-12 sm:gap-16 lg:grid-cols-12 lg:gap-24 lg:py-21.5'>
          {/* Left content */}
          <div className='z-1 space-y-6 lg:col-span-6 xl:col-span-7'>
            <div className='space-y-4'>
              <MotionPreset fade blur slide transition={{ duration: 0.5 }}>
                <Badge variant='outline' className='bg-background relative text-sm font-normal uppercase tracking-wider'>
                  Other products and labs
                  <BorderBeam colorFrom='var(--primary)' colorTo='var(--primary)' size={35} duration={4} />
                </Badge>
              </MotionPreset>
              <MotionPreset
                component='h2'
                className='text-2xl font-semibold md:text-3xl lg:text-4xl'
                fade
                blur
                slide
                delay={0.3}
                transition={{ duration: 0.5 }}
              >
                What's cooking next
              </MotionPreset>
              <MotionPreset
                component='p'
                className='text-muted-foreground text-xl'
                fade
                blur
                slide
                delay={0.6}
                transition={{ duration: 0.5 }}
              >
                Apargo Labs builds products that solve problems we hit ourselves or see clients hit repeatedly. Some go public, some stay internal.
              </MotionPreset>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
              {features.map((feature, index) => {
                const Icon = feature.icon || (feature.iconName ? getLucideIcon(feature.iconName) : getLucideIcon('Rocket'))
                return (
                  <MotionPreset key={index} delay={0.8 + index * 0.15} fade blur slide transition={{ duration: 0.5 }}>
                    <Card className='hover:border-primary h-full rounded-md py-4 shadow-none transition-all duration-300'>
                      <CardContent className='flex flex-col gap-y-1.5'>
                        <div className='flex items-center gap-2'>
                          <Icon className='size-5 text-primary' />
                          <h5 className='text-lg font-semibold'>{feature.title}</h5>
                        </div>
                        <p className='text-muted-foreground'>{feature.description}</p>
                      </CardContent>
                    </Card>
                  </MotionPreset>
                )
              })}
            </div>


          </div>

          {/* Right content */}
          <div className='max-lg:relative max-lg:h-158 lg:absolute lg:top-[4%] lg:right-0 lg:translate-x-[158px]'>
            <div className='flex items-center gap-5 max-lg:absolute max-lg:-right-39'>
              <div className='flex flex-col items-end gap-3.5'>
                <MotionPreset className='h-25' fade blur zoom transition={{ duration: 0.5 }}>
                  <StatisticsSalesOverviewCard className='w-106 origin-top-right scale-36' />
                </MotionPreset>

                <MotionPreset className='h-44 sm:h-31' fade blur delay={0.4} zoom transition={{ duration: 0.5 }}>
                  <StatisticsActivityCard className='origin-top-right scale-53' />
                </MotionPreset>

                <MotionPreset className='h-36.5' fade blur delay={0.8} zoom transition={{ duration: 0.5 }}>
                  <ServicesBySalesCard className='w-full origin-top-right scale-33' />
                </MotionPreset>
              </div>

              <div className='flex flex-col gap-3.5'>
                <MotionPreset className='h-47' delay={0.2} fade blur zoom transition={{ duration: 0.5 }}>
                  <GeneralFinanceReviewsCard
                    title='General Finance Reviews'
                    amount='$50,232'
                    period='Last 6 months Statics'
                    progressLabel='Current Activity'
                    progressValue={25}
                    stats={stats}
                    className='w-full max-w-100 origin-top-left scale-50'
                  />
                </MotionPreset>

                <MotionPreset className='h-54' fade delay={0.6} blur zoom transition={{ duration: 0.5 }}>
                  <TotalEarningCard className='w-full max-w-100 origin-top-left scale-50' />
                </MotionPreset>

                <MotionPreset className='h-50.5' fade blur delay={1} zoom transition={{ duration: 0.5 }}>
                  <TransactionsCard
                    title='Transactions'
                    transactions={transactions}
                    className='w-full max-w-100 origin-top-left scale-50'
                  />
                </MotionPreset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
