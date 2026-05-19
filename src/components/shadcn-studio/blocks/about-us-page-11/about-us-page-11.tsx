'use client'

import { ArrowRightIcon } from 'lucide-react'

import * as motion from 'motion/react-client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/global-tooltip'

type AvatarData = {
  src: string
  fallback: string
  name: string
}

type Logo = {
  image: string
  alt: string
}

const AboutUs = ({ avatars, logos }: { avatars: AvatarData[]; logos: Logo[] }) => {
  return (
    <section className='bg-[#E5E2DA] relative overflow-hidden py-8 sm:py-16 lg:py-24'>
      {/* Background Ripple Effect */}
      <motion.svg
        width='1em'
        height='1em'
        viewBox='0 0 600 600'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='pointer-events-none absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 sm:size-[1200px] lg:size-[1600px]'
        initial='hidden'
        animate='visible'
      >
        <motion.circle
          strokeOpacity={0.05}
          cx='300'
          cy='300'
          r='295'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.08}
          cx='300'
          cy='300'
          r='255'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.1, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.1}
          cx='300'
          cy='300'
          r='215'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.2, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.12}
          cx='300'
          cy='300'
          r='175'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.3, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.15}
          cx='300'
          cy='300'
          r='135'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.4, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.18}
          cx='300'
          cy='300'
          r='95'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.5, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.2}
          cx='300'
          cy='300'
          r='55'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.6, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
        <motion.circle
          strokeOpacity={0.25}
          cx='300'
          cy='300'
          r='25'
          fill='none'
          stroke='var(--border)'
          strokeWidth='1'
          variants={{
            visible: {
              scale: [1, 0.9, 1],
              transition: {
                scale: { delay: 0.7, duration: 3, repeat: Infinity, ease: 'easeOut' }
              }
            }
          }}
        />
      </motion.svg>

      <div className='relative mx-auto max-w-7xl space-y-12 px-4 sm:px-6 md:space-y-16 lg:space-y-24 lg:px-8'>
        <div className='space-y-4 text-center'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            <span className='text-muted-foreground mb-2 block text-sm font-normal uppercase tracking-wider'>Our story</span>
            How Apargo{' '}
            <span className='relative'>
              started
              <span className='bg-primary absolute bottom-0 left-0 h-px w-full max-sm:hidden'></span>
            </span>
          </h2>
          <p className='text-muted-foreground mx-auto max-w-4xl text-xl'>
            Apargo was built for founders who needed real execution — not endless presentations, delays and outsourced confusion.
          </p>


        </div>

        <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
          <img
            src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/about-us/image-45.png'
            alt='Image'
            className='h-full max-h-91 min-h-52 w-full rounded-lg object-cover'
          />

          <div className='space-y-6 max-lg:text-center'>
            <h3 className='text-xl font-semibold'>
              We build products the way ambitious teams actually need them built.
            </h3>
            <div className='text-muted-foreground space-y-4'>
              <p>
                Apargo started with one belief: growing businesses don’t fail because of ideas — they fail because execution is slow.
              </p>
              <p>
                So we built a senior-heavy engineering team focused on shipping fast, solving real problems and working closely with founders.
              </p>
              <p>
                As our clients grew, we faced the same operational challenges they did — especially around WhatsApp at scale. That led us to build AI Greentick, now used by businesses across India and beyond.
              </p>
              <p>
                Today Apargo builds custom software for ambitious companies while also running and scaling our own SaaS products.
              </p>
            </div>

          </div>
        </div>


      </div>
    </section>
  )
}

export default AboutUs
