'use client'
import { ArrowRightIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { NumberTicker } from '@/components/ui/number-ticker'
import { MotionPreset } from '@/components/ui/motion-preset'

import BackgroundSVG from '@/components/shadcn-studio/blocks/about-us-page-18/background-svg'

type StatItem = {
  value: number
  description: string
}

interface AboutUsProps {
  stats: StatItem[]
  badgeText?: string
  heading?: string
  description?: string
}

const AboutUs = ({
  stats,
  badgeText = "ABOUT APARGO",
  heading = "We Build and Ship What Others Only Plan",
  description = "Apargo started as a small group of engineers tired of seeing good ideas die in slide decks. Today we build production software for clients across the world and run our own SaaS products in parallel."
}: AboutUsProps) => {
  return (
    <section className='relative z-1 overflow-hidden py-8 sm:py-16 lg:py-24'>
      <div className='absolute -right-30 -bottom-10 -z-2 w-100 xl:w-150'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/testimonials/gradient-bg.png'
          alt='Background'
          className='opacity-35'
        />
      </div>
      <div className='absolute top-[55%] left-[55%] -z-2 w-120 -translate-x-1/2 -translate-y-1/2 xl:w-150'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/testimonials/gradient-bg.png'
          alt='Background'
          className='opacity-35'
        />
      </div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-4'>
          {/* Left Content */}
          <div className='space-y-12 md:space-y-18 lg:space-y-24'>
            {/* Header */}
            <MotionPreset fade blur slide={{ direction: 'left', offset: 50 }} transition={{ duration: 0.7 }}>
              <div className='space-y-4'>
                <Badge variant='outline' className='text-sm font-normal uppercase tracking-wider'>
                  {badgeText}
                </Badge>
                <h1 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{heading}</h1>
                <p className='text-muted-foreground text-xl leading-relaxed'>
                  {description}
                </p>
                <Button
                  size='lg'
                  className='group relative overflow-hidden rounded-lg text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 w-fit dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
                  render={<a href='/about' />}
                >
                  Read more
                  <ArrowRightIcon className='size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Button>
              </div>
            </MotionPreset>

            {/* Statistics */}
            <div className='flex gap-2 sm:gap-5'>
              {stats.map((stat, index) => (
                <div key={index} className='flex flex-1 gap-2 sm:gap-5'>
                  <MotionPreset
                    fade
                    blur
                    slide={{ direction: 'left', offset: 30 }}
                    delay={0.3 + index * 0.2}
                    transition={{ duration: 0.6 }}
                    className='flex-1'
                  >
                    <div className='text-xl font-semibold sm:text-2xl lg:text-3xl'>
                      <NumberTicker startValue={0} value={stat.value} delay={0.8 + index * 0.2} stiffness={170} />+
                    </div>
                    <div className='text-muted-foreground text-xs sm:text-sm'>{stat.description}</div>
                  </MotionPreset>
                  {index < stats.length - 1 && (
                    <MotionPreset fade blur delay={0.5 + index * 0.2} transition={{ duration: 0.4 }}>
                      <div className='bg-border w-px h-full min-h-[40px]'></div>
                    </MotionPreset>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Team Cards */}
          <div className='relative flex items-center justify-center py-8 lg:py-2'>
            <MotionPreset
              fade
              blur
              zoom={{ initialScale: 0.8 }}
              delay={0.4}
              transition={{ duration: 0.7 }}
              className='absolute inset-0 -z-1 size-full'
            >
              <BackgroundSVG className='size-full opacity-2' />
            </MotionPreset>
            <div className='relative'>
              <MotionPreset
                fade
                blur
                zoom={{ initialScale: 0.8 }}
                delay={0.5}
                transition={{ duration: 0.7 }}
                className='relative'
              >
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-24.png'
                  alt='Teams'
                  className='mx-auto w-[80%] dark:hidden'
                />
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-24-dark.png'
                  alt='Teams'
                  className='mx-auto hidden w-[80%] dark:block'
                />
              </MotionPreset>
              <MotionPreset
                fade
                blur
                slide={{ direction: 'up', offset: 30 }}
                delay={1.2}
                transition={{ duration: 0.8 }}
                className='border-background absolute top-2 left-[48%] -translate-y-1/2 rounded-full border-4 md:border-8'
              >
                <span className='flex h-10 w-10 animate-[spin_2.5s_linear_infinite] items-center justify-center overflow-hidden rounded-full bg-black p-1.5 dark:bg-white md:h-15 md:w-15 md:p-2'>
                  <img src='/group.svg' alt='Apargo mark' className='h-full w-full object-contain' />
                </span>
              </MotionPreset>
              <MotionPreset
                fade
                blur
                slide={{ direction: 'down', offset: 40 }}
                delay={1.4}
                transition={{ duration: 0.6 }}
                className='dark:sky-400 absolute bottom-0 left-[52%] h-8 w-8 translate-y-1/2 text-sky-600 md:left-[50%] md:h-12 md:w-12'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' fill='none'>
                  <path
                    d='M25.6542 23.5548C55.4505 15.5634 47.0215 0.968559 25.2148 22.7915C47.0331 0.968559 32.4297 -7.45067 24.4517 22.352C32.4413 -7.45067 15.5833 -7.45067 23.5613 22.352C15.5717 -7.46223 0.979918 0.968557 22.7867 22.7799C0.979918 0.968557 -7.4491 15.5634 22.3473 23.5548C-7.4491 15.5634 -7.4491 32.425 22.3473 24.4452C-7.4491 32.4366 0.979918 47.0314 22.7867 25.2085C0.968357 47.0314 15.5717 55.4507 23.5498 25.648C15.5601 55.4507 32.4182 55.4507 24.4401 25.648C32.4297 55.4507 47.0215 47.0199 25.2032 25.2085C47.0215 47.0314 55.439 32.425 25.6426 24.4452C55.4505 32.425 55.4505 15.5634 25.6542 23.5548Z'
                    fill='currentColor'
                  />
                </svg>
              </MotionPreset>
            </div>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'left', offset: 50 }}
              delay={0.8}
              transition={{ duration: 0.7 }}
              className='absolute top-[30%] left-0 h-6 w-6 text-amber-600 md:h-10 md:w-10 dark:text-amber-400'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none'>
                <path
                  d='M20 0L21.3786 3.72556C23.9322 10.6267 29.3733 16.0678 36.2744 18.6214L40 20L36.2744 21.3786C29.3733 23.9322 23.9322 29.3733 21.3786 36.2744L20 40L18.6214 36.2744C16.0678 29.3733 10.6267 23.9322 3.72556 21.3786L0 20L3.72556 18.6214C10.6267 16.0678 16.0678 10.6267 18.6214 3.72556L20 0Z'
                  fill='currentColor'
                />
              </svg>
            </MotionPreset>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'right', offset: 50 }}
              delay={1.0}
              transition={{ duration: 0.6 }}
              className='absolute top-[5%] right-[20%] h-6 w-6 text-red-600 md:h-10 md:w-10 dark:text-red-400'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none'>
                <path
                  d='M20 0L21.3786 3.72556C23.9322 10.6267 29.3733 16.0678 36.2744 18.6214L40 20L36.2744 21.3786C29.3733 23.9322 23.9322 29.3733 21.3786 36.2744L20 40L18.6214 36.2744C16.0678 29.3733 10.6267 23.9322 3.72556 21.3786L0 20L3.72556 18.6214C10.6267 16.0678 16.0678 10.6267 18.6214 3.72556L20 0Z'
                  fill='currentColor'
                />
              </svg>
            </MotionPreset>
            <MotionPreset
              fade
              blur
              slide={{ direction: 'right', offset: 60 }}
              delay={1.6}
              transition={{ duration: 0.8 }}
              className='absolute right-[28%] bottom-[15%] h-6 w-6 text-sky-600 md:h-10 md:w-10 dark:text-sky-400'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none'>
                <path
                  d='M20 0L21.3786 3.72556C23.9322 10.6267 29.3733 16.0678 36.2744 18.6214L40 20L36.2744 21.3786C29.3733 23.9322 23.9322 29.3733 21.3786 36.2744L20 40L18.6214 36.2744C16.0678 29.3733 10.6267 23.9322 3.72556 21.3786L0 20L3.72556 18.6214C10.6267 16.0678 16.0678 10.6267 18.6214 3.72556L20 0Z'
                  fill='currentColor'
                />
              </svg>
            </MotionPreset>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
