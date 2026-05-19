'use client'

import { useEffect, useState } from 'react'

import { ArrowRightIcon } from 'lucide-react'

import HeroVector from '@/assets/svg/hero-vector'
import TestimonialCard from '@/components/shadcn-studio/blocks/hero-section-33/testimonial-card'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { MotionPreset } from '@/components/ui/motion-preset'
import { GlowEffect } from '@/components/ui/glow-effect'
import type { Testimonial } from '@/components/shadcn-studio/blocks/hero-section-33/testimonial-card'

const HeroSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayTestimonials = testimonials.slice(0, 4)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % displayTestimonials.length)
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(interval)
  }, [displayTestimonials.length])

  return (
    <section className='flex-1 overflow-hidden'>
      <div className='relative z-1 flex h-full flex-col py-12 sm:py-16 lg:py-24'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 max-xl:justify-center sm:gap-16 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8'>
          <div className='flex flex-col justify-between gap-8 sm:gap-16'>
            <div className='flex flex-col gap-4'>
              <MotionPreset fade slide={{ offset: 50 }} transition={{ duration: 0.5 }}>
                <Badge variant='outline' className='text-sm font-normal'>
                  OUR SERVICES
                </Badge>
              </MotionPreset>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.3}>
                <h1 className='text-2xl font-semibold sm:text-3xl lg:text-5xl lg:font-bold'>
                  Engineering services, end to end.
                </h1>
              </MotionPreset>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.5}>
                <p className='text-muted-foreground text-xl'>
                  Whether you need one feature shipped fast or a whole product built from zero, Apargo's services arm slots in where you need it. Same engineers, same playbook — different scope.
                </p>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.7}
                className='flex flex-wrap items-center gap-4'
              >
                <a
                  href='#'
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group relative w-fit overflow-hidden rounded-lg text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
                  )}
                >
                  Talk to Our Team
                  <ArrowRightIcon className='transition-transform duration-300 group-hover:translate-x-1' />
                </a>
                <a
                  href='#'
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 rounded-lg text-base'
                  )}
                >
                  See Engagement Models
                </a>
              </MotionPreset>
            </div>
            <MotionPreset fade slide={{ offset: 50 }} transition={{ duration: 0.5 }} delay={0.9}>
              <MotionPreset
                key={currentIndex}
                slide={{ direction: 'right', offset: 50 }}
                fade
                transition={{ duration: 0.8 }}
                className='w-full'
              >
                <TestimonialCard testimonial={displayTestimonials[currentIndex]} />
              </MotionPreset>
            </MotionPreset>
          </div>
          <div className='relative'>
            <MotionPreset
              fade
              zoom
              transition={{ duration: 0.5 }}
              delay={0.3}
              className='relative flex items-center rounded-lg border'
            >
              <video
                poster='https://cdn.shadcnstudio.com/ss-assets/landing-page-videos/figma-plugin/generate-components-cover.png?width=701&format=auto'
                autoPlay
                muted
                playsInline
                loop
                className='rounded-lg'
                onLoadedData={e => {
                  // Ensure video starts from beginning when loaded
                  const video = e.target as HTMLVideoElement

                  video.currentTime = 0
                }}
              >
                <source
                  src='https://cdn.shadcnstudio.com/ss-assets/landing-page-videos/figma-plugin/generate-components.webm'
                  type='video/webm'
                />
                Your browser does not support the video tag.
              </video>

              <svg
                width='66'
                height='53'
                viewBox='0 0 66 53'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute -top-10 -right-10 max-sm:scale-50'
              >
                <path
                  d='M57.8601 33.1515C56.2183 34.0362 54.5772 34.903 52.9297 35.7668C51.9176 36.2907 50.8734 36.7174 49.9193 37.4329C49.6586 37.6245 49.4558 38.0077 49.1243 38.0017L49.1308 38.0047C48.8498 38.2053 48.5896 38.4613 48.2915 38.599C47.1665 39.126 46.0438 39.8281 44.9223 40.2009C44.8752 40.2158 44.8408 40.3191 44.7798 40.3461C44.4817 40.4838 43.4042 40.9135 42.7317 41.2638C41.1828 42.0721 39.6168 42.8177 37.8878 43.0483C37.6177 43.0798 34.0381 44.2641 33.5409 42.6058C33.0201 40.8816 36.1467 38.7649 36.591 38.6212C37.6711 38.2843 38.8305 38.1764 39.7582 37.3846C41.1203 36.2245 42.6947 35.7394 44.1574 34.928C45.4772 34.1975 46.8492 33.6376 48.1661 32.8966C49.3982 32.199 50.5467 31.2155 51.8175 30.6182C52.912 30.1047 54.1308 30.0058 55.2689 29.6315C55.5349 29.5432 55.7474 29.0911 56.0411 28.9788C56.284 28.889 56.6734 28.7109 56.9506 28.7468C57.0692 28.7647 57.2009 28.7886 57.2751 28.6854C57.6355 28.1914 61.3873 26.8664 61.9814 28.8809C62.578 30.8416 59.2843 32.3865 57.8601 33.1515Z'
                  fill='var(--primary)'
                />
                <path
                  d='M35.0118 18.9906C34.447 20.3514 33.8681 21.7097 33.2835 23.0586C32.9246 23.8902 32.4735 24.6641 32.2749 25.5816C32.2179 25.8329 32.3269 26.1796 32.0969 26.3343C32.03 26.6008 32.0171 26.8932 31.8977 27.1255C31.4584 28.0024 31.1356 29.0084 30.5967 29.7843C30.577 29.8147 30.6213 29.8979 30.5917 29.9434C30.4724 30.1757 30.003 30.9718 29.7646 31.5207C29.208 32.7902 28.613 34.028 27.5613 34.9951C27.3977 35.1442 25.6757 37.6225 24.26 36.7775C22.7846 35.8971 23.5851 33.0107 23.7976 32.7015C24.3224 31.9653 25.0614 31.341 25.1947 30.3788C25.3899 28.9641 26.1667 27.9001 26.6598 26.6619C27.1024 25.5499 27.6969 24.5309 28.1254 23.4165C28.5287 22.3652 28.6922 21.1808 29.1877 20.1872C29.6158 19.3336 30.3958 18.6826 30.9431 17.8997C31.0696 17.7106 30.9251 17.3159 31.0558 17.1023C31.1655 16.9272 31.3256 16.626 31.5332 16.518C31.6207 16.4738 31.7309 16.4251 31.7192 16.3221C31.6506 15.8224 33.396 13.1629 35.1055 14.209C36.7908 15.2258 35.5023 17.811 35.0118 18.9906Z'
                  fill='var(--primary)'
                />
                <path
                  d='M10.5827 6.20672C10.6295 8.30193 10.655 10.3936 10.6791 12.4934C10.6943 13.7837 10.6005 15.0724 10.7996 16.3517C10.8576 16.6981 11.0897 17.0487 10.9412 17.4108L10.9426 17.4026C10.9964 17.7737 11.0942 18.1437 11.09 18.5133C11.0491 19.9204 11.1725 21.3889 11.0012 22.7487C10.9929 22.7978 11.0682 22.8694 11.0685 22.9536C11.0559 23.3302 10.9552 24.6599 10.9643 25.5115C10.9809 27.4838 10.9465 29.4559 10.3928 31.4413C10.3035 31.7545 9.76077 36.09 8.13068 36.1261C6.43409 36.1679 5.97289 32.0416 6.04992 31.4992C6.22576 30.199 6.63784 28.8799 6.36655 27.5968C5.96973 25.7202 6.2309 23.8285 6.17792 21.9427C6.12856 20.251 6.24049 18.5529 6.17697 16.8589C6.11673 15.2748 5.77207 13.6932 5.8151 12.1013C5.85053 10.727 6.2963 9.33777 6.4704 7.9616C6.51013 7.64006 6.21844 7.25414 6.24815 6.90566C6.27527 6.61565 6.29306 6.12208 6.44469 5.82785C6.50928 5.70409 6.59082 5.56636 6.53089 5.44683C6.26115 4.88787 6.75618 0.317074 8.73582 0.281004C10.6476 0.258723 10.5399 4.38993 10.5827 6.20672Z'
                  fill='var(--primary)'
                />
              </svg>

              <div className='absolute top-1/2 right-0 max-lg:hidden max-lg:h-[50%] max-lg:w-auto xl:-right-10 2xl:-right-30'>
                <GlowEffect
                  colors={['#0284C7', '#16A34A', '#D97706', '#DC2626']}
                  mode='colorShift'
                  blur='medium'
                  className='opacity-80'
                />
                <img
                  src='https://cdn.shadcnstudio.com/ss-assets/landing-page/figma-plugin/hero-plugin.png?height=373&format=auto'
                  alt='plugin'
                  className='relative max-lg:h-full'
                />
              </div>
            </MotionPreset>
          </div>
        </div>
        <HeroVector className='absolute right-0 bottom-0 -z-1 opacity-30 max-lg:hidden' />
      </div>
    </section>
  )
}

export default HeroSection
