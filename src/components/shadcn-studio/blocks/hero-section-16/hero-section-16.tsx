'use client'

import { useState } from 'react'
import { DollarSignIcon } from 'lucide-react'

import WeeklyOverviewCard from '@/components/shadcn-studio/blocks/chart-weekly-overview'
import StatisticsCard, { type StatisticsCardProps } from '@/components/shadcn-studio/blocks/statistics-card-02'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Cursor, CursorFollow, CursorProvider } from '@/components/ui/cursor'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Marquee } from '@/components/ui/marquee'
import { Ripple } from '@/components/shadcn-studio/blocks/motion-ripple'

import { cn } from '@/lib/utils'

const StatisticsCardData: StatisticsCardProps[] = [
  {
    icon: <DollarSignIcon className='size-3.5' />,
    title: 'Total Revenue',
    value: '$12,345',
    changePercentage: 15
  }
]

export interface HeroSectionProps {
  eyebrowText?: string
  eyebrowTag?: string
  heading?: string
  description?: string
  primaryBtnText?: string
  emailPlaceholder?: string
}

const HeroSection = ({
  eyebrowText: propEyebrowText,
  eyebrowTag: propEyebrowTag,
  heading: propHeading,
  description: propDescription,
  primaryBtnText: propPrimaryBtnText,
  emailPlaceholder: propEmailPlaceholder,
}: HeroSectionProps) => {
  const [heroConfig, setHeroConfig] = useState(() => ({
    eyebrowText: propEyebrowText || 'Apargo',
    eyebrowTag: propEyebrowTag || 'Product Engineering & AI Services',
    heading: propHeading || 'We Build Software That Growing Businesses Actually Use.',
    description: propDescription || 'From custom platforms and mobile apps to in-house SaaS products like AI Greentick — Apargo is the engineering partner founders call when they want to ship fast, scale safely and stay technical.',
    primaryBtnText: propPrimaryBtnText || 'Book a Free Consultation',
    emailPlaceholder: propEmailPlaceholder || 'hello@apargo.com'
  }))

  // Dynamic client-side fetch if server prop is not passed
  useState(() => {
    const hasProps =
      propEyebrowText ||
      propEyebrowTag ||
      propHeading ||
      propDescription ||
      propPrimaryBtnText ||
      propEmailPlaceholder

    if (typeof window !== 'undefined' && !hasProps) {
      const fetchHeroData = async () => {
        try {
          const { createClient } = await import('@/utils/supabase/client')
          const supabase = createClient()
          const { data } = await supabase
            .from('site_sections')
            .select('content')
            .eq('key', 'homepage_hero')
            .single()
          if (data && data.content) {
            setHeroConfig((prev) => ({
              ...prev,
              ...data.content,
            }))
          }
        } catch (err) {
          console.error('Error fetching hero dynamically:', err)
        }
      }
      fetchHeroData()
    }
  })

  return (
    <section className='flex-1 overflow-hidden pt-4 sm:pt-6 lg:pt-8 max-sm:pb-0'>
      <div className='mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-8'>
        {/* Hero Content */}
        <div className='flex flex-col items-center gap-6 text-center'>
          <MotionPreset
            fade
            slide={{ direction: 'up', offset: 50 }}
            transition={{ duration: 0.5 }}
            className='bg-background border-primary flex w-fit items-center gap-2.5 rounded-full border px-2.5 py-1'
          >
            <span className='bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-semibold'>
              {heroConfig.eyebrowText}
            </span>
            <span className='text-muted-foreground font-sans text-xs font-medium'>{heroConfig.eyebrowTag}</span>
          </MotionPreset>
          <MotionPreset
            component='h1'
            fade
            slide={{ direction: 'up', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='max-w-3xl text-3xl leading-[1.29167] font-bold sm:text-4xl lg:text-5xl tracking-tight'
          >
            {heroConfig.heading}
          </MotionPreset>

          <MotionPreset
            component='p'
            fade
            slide={{ direction: 'up', offset: 50 }}
            delay={0.6}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='text-muted-foreground max-w-4xl text-base sm:text-lg leading-relaxed'
          >
            {heroConfig.description}
          </MotionPreset>

          <MotionPreset
            fade
            slide={{ direction: 'up', offset: 50 }}
            delay={0.9}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='flex flex-wrap items-center gap-4 w-full max-w-2xl'
          >
            <div className='bg-background flex flex-col sm:flex-row h-fit w-full items-center justify-between gap-2 rounded-2xl sm:rounded-full border p-2 sm:pl-6 sm:pr-2 sm:py-2 shadow-lg'>
              <Label className='sr-only' htmlFor='prompt-space'>
                Enter your business email
              </Label>
              <Input
                type='text'
                placeholder={heroConfig.emailPlaceholder}
                id='prompt-space'
                className='placeholder:text-muted-foreground h-12 sm:h-12 border-0 bg-transparent p-2 sm:p-0 shadow-none focus:border-0 focus:ring-0 focus-visible:ring-0 md:text-base dark:bg-transparent w-full sm:flex-1'
              />

              <Button
                type='submit'
                className={cn(
                  'text-primary-foreground focus-visible:ring-ring/50 relative inline-flex h-12 w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-xl sm:rounded-full px-6 py-2 text-sm sm:text-base font-semibold transition-colors focus-visible:ring-[3px] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hero-rainbow-btn'
                )}
              >
                {heroConfig.primaryBtnText}
              </Button>
            </div>
          </MotionPreset>
        </div>

        {/* Hero Image with 3D Tilt Effect */}
      </div>

      <div className='relative pt-4 sm:pt-16 lg:pt-24 overflow-hidden'>
        <MotionPreset fade transition={{ duration: 0.5, ease: 'easeOut' }} delay={1}>
          <Ripple numCircles={4} mainCircleSize={320} className='*:border-0!' />{' '}
        </MotionPreset>
        <div className='relative mx-auto max-w-7xl'>
          <MotionPreset
            fade
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            delay={1}
          >
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-36.png'
              alt='girl Profile'
              className='relative h-122 w-full object-contain max-sm:h-auto max-sm:bottom-0'
            />
          </MotionPreset>
          <CursorProvider>
            <Cursor>
              <svg
                className='size-6 text-sky-600 dark:text-sky-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 40 40'
              >
                <path
                  fill='currentColor'
                  d='M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z'
                />
              </svg>
            </Cursor>
            <CursorFollow>
              <div className='rounded-lg bg-sky-600 px-2 py-1 text-sm text-white shadow-lg dark:bg-sky-400'>Jake</div>
            </CursorFollow>
          </CursorProvider>
          <MotionPreset
            fade
            blur
            delay={0.6}
            className='absolute end-13 top-0 w-full max-w-68 transition-transform duration-500 hover:scale-102 hover:rotate-6 max-lg:hidden'
          >
            {StatisticsCardData.map((card, index) => (
              <StatisticsCard
                key={index}
                icon={card.icon}
                title={card.title}
                value={card.value}
                changePercentage={card.changePercentage}
              />
            ))}
          </MotionPreset>
          <MotionPreset
            fade
            blur
            delay={0.6}
            className='absolute start-0 top-10 scale-50 transition-transform duration-500 hover:scale-55 hover:-rotate-6 max-xl:scale-40 max-lg:hidden'
          >
            <WeeklyOverviewCard />
          </MotionPreset>
        </div>
        <MotionPreset
          component='div'
          fade
          slide={{ direction: 'down', offset: 50 }}
          delay={0}
          transition={{ duration: 0.5 }}
          className='bg-primary relative z-1 flex w-full items-center gap-x-10 p-4 max-sm:flex-col'
        >
          <p className='w-60 shrink-0 grow text-lg font-medium text-white uppercase dark:text-black max-sm:w-full max-sm:text-center'>
            Trusted by founders building serious products
          </p>
          <div className='relative w-full overflow-hidden'>
            <div className='from-primary pointer-events-none absolute inset-y-0 left-0 z-1 w-15 bg-gradient-to-r via-85% to-transparent max-sm:w-15' />
            <div className='from-primary pointer-events-none absolute inset-y-0 right-0 z-1 w-15 bg-gradient-to-l via-85% to-transparent max-sm:w-15' />
            <Marquee
              pauseOnHover
              duration={20}
              gap={4}
              reverse
              className='[&_.animate-marquee-horizontal]:items-center'
            >
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/um-logo.png'
                alt='University of Mississippi'
                className='h-7.5 w-auto shrink-0 object-contain opacity-80 dark:invert'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/star-helth-logo.png'
                alt='Star Health'
                className='h-9 w-auto shrink-0 object-contain opacity-80 dark:invert'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/dhl-logo.png'
                alt='DHL'
                className='h-4 w-auto shrink-0 object-contain opacity-80 dark:invert'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/sense-arena-logo.png'
                alt='Sense Arena'
                className='h-11 w-auto shrink-0 object-contain opacity-80 dark:invert'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/shemaroo-logo.png'
                alt='Shemaroo'
                className='h-10 w-auto shrink-0 object-contain opacity-80 dark:invert'
              />
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/mercedes-benz-logo.png'
                alt='Mercedes Benz'
                className='h-7.5 w-auto shrink-0 object-contain opacity-80 dark:invert'
              />
            </Marquee>
          </div>
        </MotionPreset>
      </div>
    </section>
  )
}

export default HeroSection
