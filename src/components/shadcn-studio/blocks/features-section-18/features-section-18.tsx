import { ArrowRightIcon, DollarSignIcon, CheckIcon } from 'lucide-react'

import TotalEarningCard from '@/components/shadcn-studio/blocks/chart-total-earning'
import TotalRevenueCard from '@/components/shadcn-studio/blocks/statistics-card-02'
import StatisticsCardWithSvg from '@/components/shadcn-studio/blocks/statistics-card-04'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MotionPreset } from '@/components/ui/motion-preset'

import RatingsCardSvg from '@/assets/svg/ratings-card-svg'

interface FeaturesProps {
  badge?: string
  heading?: string
  descParagraph1?: string
  descParagraph2?: string
  primaryBtnText?: string
  primaryBtnHref?: string
  secondaryBtnText?: string
  secondaryBtnHref?: string
}

const Features = ({
  badge = 'AI Greentick',
  heading = 'The complete WhatsApp marketing suite for modern teams.',
  descParagraph1 = 'AI Greentick is a full WhatsApp marketing and conversation platform built on the official WhatsApp Business API. Send broadcasts to thousands, run a shared inbox across the whole team, build no-code AI chatbots and track every conversation through a dedicated analytics layer.',
  descParagraph2 = 'Used by D2C brands, agencies and service businesses that want to turn WhatsApp into a real revenue channel — without missing chats or getting blocked.',
  primaryBtnText = 'Visit AI Greentick',
  primaryBtnHref = 'https://aigreentick.com',
  secondaryBtnText = 'Book a Demo',
  secondaryBtnHref = '/contact?intent=demo'
}: FeaturesProps) => {
  return (
    <section className='bg-[#e5e2da] py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-24'>
          {/* Left content */}
          <div className='space-y-12 lg:space-y-24'>
            <div className='space-y-4'>
              <MotionPreset
                component='h2'
                className='text-sm font-semibold tracking-wider uppercase text-primary mb-3'
                fade
                slide={{ direction: 'up', offset: 50 }}
                transition={{ duration: 0.45 }}
              >
                {badge}
              </MotionPreset>
              <MotionPreset
                component='h3'
                className='text-3xl font-semibold md:text-4xl'
                fade
                slide={{ direction: 'up', offset: 50 }}
                transition={{ duration: 0.45 }}
              >
                {heading}
              </MotionPreset>
              <MotionPreset
                component='div'
                className='text-muted-foreground text-lg leading-relaxed space-y-6'
                fade
                slide={{ direction: 'up', offset: 50 }}
                delay={0.2}
                transition={{ duration: 0.45 }}
              >
                {descParagraph1 && <p>{descParagraph1}</p>}
                {descParagraph2 && <p>{descParagraph2}</p>}
              </MotionPreset>
              <MotionPreset fade slide={{ direction: 'up', offset: 50 }} delay={0.4} transition={{ duration: 0.45 }} className='flex flex-wrap items-center gap-4'>
                {primaryBtnText && primaryBtnHref && (
                  <a
                    href={primaryBtnHref}
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'group rounded-lg text-base whitespace-nowrap has-[>svg]:px-6 flex items-center gap-2'
                    )}
                  >
                    {primaryBtnText}
                    <ArrowRightIcon className='size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
                  </a>
                )}
                {secondaryBtnText && secondaryBtnHref && (
                  <a
                    href={secondaryBtnHref}
                    className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-lg text-base')}
                  >
                    {secondaryBtnText}
                  </a>
                )}
              </MotionPreset>
            </div>

          </div>

          {/* Right content - Dashboard cards */}
          <div className='relative flex justify-center max-lg:overflow-hidden max-lg:py-22'>
            {/* Customers Card */}
            <MotionPreset
              fade
              className='absolute top-[20%] left-0 z-1 w-72 origin-top-left scale-60 max-sm:hidden lg:-left-4'
              motionProps={{
                animate: {
                  y: [0, -16, 0],
                  opacity: 1
                },
                transition: {
                  y: {
                    duration: 2.1,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: 1.2
                  },
                  opacity: {
                    duration: 0.5,
                    delay: 1.2
                  }
                }
              }}
            >
              <StatisticsCardWithSvg
                title='Ratings'
                badgeContent='Last 6 months'
                value='8.14k'
                changePercentage={18.2}
                svg={<RatingsCardSvg />}
              />
            </MotionPreset>

            {/* Total Earning Card */}
            <MotionPreset
              fade
              motionProps={{
                animate: {
                  y: [0, -16, 0],
                  opacity: 1
                },
                transition: {
                  y: {
                    duration: 2.1,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: 1.6
                  },
                  opacity: {
                    duration: 0.5,
                    delay: 1.6
                  }
                }
              }}
              className='absolute top-0 right-0 z-1 w-100 origin-top-right scale-45 max-lg:top-[15%] max-sm:hidden'
            >
              <TotalEarningCard />
            </MotionPreset>

            {/* Total Revenue Card */}
            <MotionPreset
              fade
              motionProps={{
                animate: {
                  y: [0, -16, 0],
                  opacity: 1
                },
                transition: {
                  y: {
                    duration: 2.1,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: 1.4
                  },
                  opacity: {
                    duration: 0.5,
                    delay: 1.4
                  }
                }
              }}
              className='absolute right-[10%] bottom-0 z-1 w-72 origin-bottom-right scale-60 max-lg:bottom-[15%]'
            >
              <TotalRevenueCard
                icon={<DollarSignIcon className='size-3.5' />}
                title='Total Revenue'
                value='$12,400'
                changePercentage={15}
              />
            </MotionPreset>

            {/* Phone Image */}
            <MotionPreset
              className='border-primary bg-muted group relative rounded-full border-2'
              fade
              delay={0.6}
              transition={{ duration: 0.9 }}
            >
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-56.png'
                alt='PhoneImage'
                className='bg-muted z-1 mx-auto h-110 rounded-full object-contain lg:h-130'
              />
              <div className='absolute inset-0 -z-1'>
                <div className='border-primary absolute top-1/2 left-1/2 size-[55%] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2'></div>
                <div className='border-primary/60 absolute top-1/2 left-1/2 size-[60%] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2'></div>
                <div className='border-primary/40 absolute top-1/2 left-1/2 size-[65%] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2'></div>
              </div>
            </MotionPreset>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
