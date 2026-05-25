import { DollarSignIcon, ShoppingCartIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import CustomerRatings from '@/components/shadcn-studio/blocks/chart-customer-ratings'
import GeneralFinanceReviewsCard from '@/components/shadcn-studio/blocks/widget-general-finance-reviews'
import TotalRevenue from '@/components/shadcn-studio/blocks/bento-grid-06/total-revenue'

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

const BentoGrid = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8'>
        {/* Column 1 */}
        <div className='flex flex-col gap-6'>
          {/* Total Payments Card */}
          <MotionPreset fade blur zoom={{ initialScale: 0.9 }} delay={0.1} transition={{ duration: 0.5 }}>
            <Card className='bg-muted border-0'>
              <CardContent className='flex flex-col justify-between gap-6'>
                <div className='bg-card rounded-md border p-1 shadow-md'>
                  <div className='px-2 py-1.5 text-sm font-medium'>Chat List</div>

                  <ul>
                    <li className='flex h-12.5 items-center gap-2 px-2 py-1.5'>
                      <Avatar>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
                          alt='Phillip George'
                        />
                        <AvatarFallback className='text-xs'>PG</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-1 flex-col'>
                        <span className='text-popover-foreground'>Phillip George</span>
                      </div>
                      <div className='flex flex-col items-end gap-1'>
                        <span className='text-muted-foreground text-xs'>9:00AM</span>
                        <Badge className='h-5 min-w-5 bg-green-600 px-1 dark:bg-green-400/60'>1</Badge>
                      </div>
                    </li>

                    <li className='flex h-12.5 items-center gap-2 px-2 py-1.5'>
                      <Avatar>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png'
                          alt='Jaylon Donin'
                        />
                        <AvatarFallback className='text-xs'>JD</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-1 flex-col'>
                        <span className='text-popover-foreground'>Jaylon Donin</span>
                      </div>
                      <div className='flex flex-col items-end gap-1'>
                        <span className='text-muted-foreground text-xs'>10:00PM</span>
                        <Badge className='h-5 min-w-5 bg-green-600 px-1 dark:bg-green-400/60'>3</Badge>
                      </div>
                    </li>

                    <li className='flex h-12.5 items-center gap-2 px-2 py-1.5'>
                      <Avatar>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png'
                          alt='Tiana Curtis'
                        />
                        <AvatarFallback className='text-xs'>TC</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-1 flex-col'>
                        <span className='text-popover-foreground'>Tiana Curtis</span>
                      </div>
                      <span className='text-muted-foreground text-xs'>8:30AM</span>
                    </li>

                    <li className='flex h-12.5 items-center gap-2 px-2 py-1.5'>
                      <Avatar>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png'
                          alt='Zaire Vetrovs'
                        />
                        <AvatarFallback className='text-xs'>ZV</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-1 flex-col'>
                        <span className='text-popover-foreground'>Zaire Vetrovs</span>
                      </div>
                      <div className='flex flex-col items-end gap-1'>
                        <span className='text-muted-foreground text-xs'>5:50AM</span>
                        <Badge className='h-5 min-w-5 bg-green-600 px-1 dark:bg-green-400/60'>2</Badge>
                      </div>
                    </li>

                    <li className='flex h-12.5 items-center gap-2 px-2 py-1.5'>
                      <Avatar>
                        <AvatarImage
                          src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png'
                          alt='Kianna Philips'
                        />
                        <AvatarFallback className='text-xs'>KP</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-1 flex-col'>
                        <span className='text-popover-foreground'>Kianna Philips</span>
                      </div>
                      <span className='text-muted-foreground text-xs'>6.45PM</span>
                    </li>
                  </ul>
                </div>

                <Button variant='outline'>Pay</Button>

                <div className='mt-5.5 space-y-4'>
                  <h2 className='text-3xl font-bold'>Total Payments</h2>
                  <p className='text-muted-foreground font-medium'>Track the complete sum of all received payments.</p>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Transaction History Card */}
          <MotionPreset
            fade
            blur
            zoom={{ initialScale: 0.9 }}
            delay={0.2}
            transition={{ duration: 0.5 }}
            className='h-full'
          >
            <Card className='bg-muted h-full border-0'>
              <CardContent className='flex h-full flex-col justify-between gap-6'>
                <Card>
                  <CardContent className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-sm'>
                        <DollarSignIcon className='size-5' />
                      </div>
                      <div className='flex flex-1 flex-col gap-0.5'>
                        <span className='text-lg font-medium'>Total revenue</span>
                        <span className='text-muted-foreground text-sm'>Successful payments</span>
                      </div>
                      <span className='text-sm'>+$250</span>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-sm'>
                        <ShoppingCartIcon className='size-5' />
                      </div>

                      <div className='flex flex-1 flex-col gap-0.5'>
                        <span className='text-lg font-medium'>Total sales</span>
                        <span className='text-muted-foreground text-sm'>Refund</span>
                      </div>

                      <span className='text-sm'>+$80</span>
                    </div>
                  </CardContent>
                </Card>

                <div className='space-y-4'>
                  <h2 className='text-3xl font-bold'>Transaction History</h2>
                  <p className='text-muted-foreground font-medium'>View detailed logs of all your past transactions.</p>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>

        {/* Column 2 */}
        <div className='flex flex-col gap-6'>
          {/* Total Revenue Card */}
          <MotionPreset fade blur zoom={{ initialScale: 0.9 }} delay={0.3} transition={{ duration: 0.5 }}>
            <Card className='bg-muted border-0'>
              <CardContent className='flex flex-col gap-6'>
                <div className='space-y-4'>
                  <h2 className='text-3xl font-bold'>Total Revenue</h2>
                  <p className='text-muted-foreground font-medium'>
                    See your total earnings from all completed transactions.
                  </p>
                </div>

                <TotalRevenue />
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Finance Review Card */}
          <MotionPreset fade blur zoom={{ initialScale: 0.9 }} delay={0.4} transition={{ duration: 0.5 }}>
            <Card className='bg-muted border-0'>
              <CardContent className='flex flex-col gap-6'>
                <GeneralFinanceReviewsCard
                  title='General Finance Reviews'
                  amount='$50,232'
                  period='Last 6 months Statics'
                  progressLabel='Current Activity'
                  progressValue={25}
                  stats={stats}
                />

                <div className='space-y-4'>
                  <h2 className='text-3xl font-bold'>Finance Review</h2>
                  <p className='text-muted-foreground font-medium'>
                    Monitor efficiency and success rates of your transactions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>

        {/* Column 3 */}
        <div className='flex flex-col gap-6 max-lg:col-span-full'>
          {/* Customer Ratings Card */}
          <MotionPreset fade blur zoom={{ initialScale: 0.9 }} delay={0.5} transition={{ duration: 0.5 }}>
            <Card className='bg-muted border-0'>
              <CardContent className='flex flex-col gap-6'>
                <div className='space-y-4'>
                  <h2 className='text-3xl font-bold'>Customer Ratings</h2>
                  <p className='text-muted-foreground font-medium'>
                    Check user feedback and satisfaction scores instantly.
                  </p>
                </div>
                <CustomerRatings />
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Inbuilt Receiver KYC Card */}
          <MotionPreset
            fade
            blur
            zoom={{ initialScale: 0.9 }}
            delay={0.6}
            transition={{ duration: 0.5 }}
            className='h-full'
          >
            <Card className='bg-muted h-full border-0'>
              <CardContent className='flex flex-1 flex-col gap-6'>
                <div className='flex grow items-center justify-center'>
                  <div className='relative flex size-31 items-center justify-center overflow-hidden'>
                    <Avatar className='size-19 rounded-md'>
                      <AvatarImage
                        src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
                        alt='Inbuilt Receiver KYC'
                      />
                      <AvatarFallback className='rounded-md'>IK</AvatarFallback>
                    </Avatar>
                    <div className='absolute inset-0 rounded-lg border' />
                    <div className='absolute inset-2 rounded-lg border' />
                    <div className='absolute inset-4 rounded-lg border' />

                    <MotionPreset
                      className='from-primary/60 border-primary absolute inset-x-0 -bottom-1/3 h-1/3 border-t bg-linear-to-b to-transparent'
                      motionProps={{
                        animate: {
                          bottom: ['-33%', '100%', '-33%'],
                          rotateX: ['0deg', '0deg', '180deg', '180deg', '0deg']
                        },
                        transition: {
                          duration: 3.5,
                          delay: 0.8,
                          repeat: Infinity,
                          ease: 'linear',
                          times: [0, 0.499, 0.5, 0.999, 1]
                        }
                      }}
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <h2 className='text-3xl font-bold'>Inbuilt Receiver KYC</h2>
                  <p className='text-muted-foreground font-medium'>
                    Verify recipients with secure, built-in KYC authentication.
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default BentoGrid
