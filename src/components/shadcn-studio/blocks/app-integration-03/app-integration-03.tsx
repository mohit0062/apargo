'use client'

import { useEffect } from 'react'

import { ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { MotionPreset } from '@/components/ui/motion-preset'

type Integration = {
  name: string
  description: string
  image: string
  alt: string
}[]

const AppIntegration = ({ integrations }: { integrations: Integration }) => {
  useEffect(() => {
    const all = document.querySelectorAll('.card')

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach(e => {
        const blob = e.querySelector('.blob') as HTMLElement
        const fblob = e.querySelector('.fake-blob') as HTMLElement

        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '0.8'

        blob.animate(
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - 24 - rec.width / 2
              }px, ${ev.clientY - rec.top - 24 - rec.height / 2}px)`
            }
          ],
          {
            duration: 300,
            fill: 'forwards'
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
          >
            Discover our integrations
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
            Connect AI Greentick to your existing CRM, storefronts and internal tools effortlessly.
          </MotionPreset>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {integrations.map((integration, index) => (
            <MotionPreset
              key={index}
              className='bg-foreground/10 card group relative h-full overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out'
              fade
              blur
              transition={{ duration: 0.8 }}
              delay={0.6 + index * 0.1}
            >
              <Card className='group-hover:bg-card/90 border-none shadow-none'>
                <CardContent>
                  <div className='flex size-14.5 shrink-0 items-center justify-center rounded-full border'>
                    <img src={integration.image} alt={integration.alt} className='size-8.5' />
                  </div>
                </CardContent>
                <CardHeader className='gap-6'>
                  <CardTitle className='text-2xl font-medium'>{integration.name}</CardTitle>
                  <CardDescription className='text-lg'>{integration.description}</CardDescription>
                </CardHeader>
              </Card>
              <div className='blob bg-primary absolute top-0 left-0 -z-1 size-62.5 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out' />
              <div className='fake-blob absolute top-0 left-0 -z-1 [display:hidden] size-40 rounded-full' />
            </MotionPreset>
          ))}

          {/* More Card */}
          <MotionPreset fade blur transition={{ duration: 0.8 }} delay={1.1}>
            <Card className='hover:bg-primary hover:text-primary-foreground group h-full border-none shadow-none transition-all duration-300'>
              <CardContent className='flex h-full flex-col justify-between gap-6'>
                <CardTitle className='text-2xl font-medium'>Explore 5,000+ More</CardTitle>
                <div className='flex items-center justify-between gap-4'>
                  <p className='text-lg'>Unlock powerful workflows</p>
                  <Button
                    className='bg-primary/10 text-primary group-hover:text-primary group-hover:bg-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300'
                    size='icon'
                    render={<a href='#' />}
                  >
                    <ChevronRightIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default AppIntegration
