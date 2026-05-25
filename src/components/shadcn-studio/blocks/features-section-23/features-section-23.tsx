'use client'

import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import ProcessFlow from '@/components/shadcn-studio/blocks/features-section-23/process-flow'
import type { Process } from '@/components/shadcn-studio/blocks/features-section-23/process-flow'

import { Badge } from '@/components/ui/badge'

import { MotionPreset } from '@/components/ui/motion-preset'
import { PrimaryGrowButton, SecondaryGrowButton } from '@/components/ui/grow-button'

const Features = ({ features }: { features: Process[] }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 xl:gap-16'>
          {/* Left content */}
          <div className='space-y-4'>
            <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} transition={{ duration: 0.5 }}>
              <Badge variant='outline' className='text-sm font-normal'>
                Our Process
              </Badge>
            </MotionPreset>
            <MotionPreset
              component='h2'
              className='text-2xl font-semibold md:text-3xl lg:text-4xl'
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={0.15}
              transition={{ duration: 0.5 }}
            >
              Why we stick — four reasons
            </MotionPreset>
            <MotionPreset
              component='p'
              className='text-muted-foreground text-xl'
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              delay={0.3}
              transition={{ duration: 0.5 }}
            >
              Clear communication, fixed quotes, senior engineers and full IP ownership — from day one.
            </MotionPreset>

            <MotionPreset
              className='flex flex-wrap items-center gap-4'
              fade
              blur
              slide={{ direction: 'down', offset: 50 }}
              transition={{ duration: 0.5 }}
              delay={0.45}
            >
              <Link href='/contact?intent=consultation'>
                <PrimaryGrowButton size='lg'>
                  Book a Free Consultation <ArrowRightIcon />{' '}
                </PrimaryGrowButton>
              </Link>
              <Link href='/services'>
                <SecondaryGrowButton size='lg' className='group'>
                  View Services
                  <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                </SecondaryGrowButton>
              </Link>
            </MotionPreset>
          </div>

          {/* Right content */}
          <MotionPreset fade blur transition={{ duration: 0.7 }} className='h-82.5 max-sm:h-97.5'>
            <ProcessFlow initialProcess={features} />
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default Features
