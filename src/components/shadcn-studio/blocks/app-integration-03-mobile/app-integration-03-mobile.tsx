'use client'

import {
  ChevronRightIcon,
  ShieldCheckIcon,
  BellRingIcon,
  CreditCardIcon,
  WifiOffIcon,
  MapPinIcon,
  CameraIcon,
  LinkIcon,
  BarChart3Icon,
  GlobeIcon
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { MotionPreset } from '@/components/ui/motion-preset'

import type { ComponentType } from 'react'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  'ShieldCheck': ShieldCheckIcon,
  'BellRing': BellRingIcon,
  'CreditCard': CreditCardIcon,
  'WifiOff': WifiOffIcon,
  'MapPin': MapPinIcon,
  'Camera': CameraIcon,
  'Link': LinkIcon,
  'BarChart3': BarChart3Icon
}

type Integration = {
  name: string
  description: string
  iconName: string
}[]

const AppIntegration = ({ integrations }: { integrations: Integration }) => {
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
            Mobile features we ship often
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
            From robust authentication to offline caching, we build the essential mobile capabilities that actually matter.
          </MotionPreset>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {integrations.map((integration, index) => (
            <MotionPreset
              key={index}
              fade
              blur
              transition={{ duration: 0.8 }}
              delay={0.6 + index * 0.1}
              className='h-full'
            >
              <Card className='bg-card border-primary/40 hover:border-primary h-full shadow-none transition-colors duration-300'>
                <CardContent className='flex h-full flex-col pt-6'>
                  <Avatar className='mb-6 size-10 rounded-md'>
                    <AvatarFallback className='bg-primary/10 text-primary rounded-md [&>svg]:size-6'>
                      {(() => {
                        const Icon = iconMap[integration.iconName] || GlobeIcon
                        return <Icon />
                      })()}
                    </AvatarFallback>
                  </Avatar>
                  <h6 className='mb-2 text-lg font-semibold'>{integration.name}</h6>
                  <p className='text-muted-foreground text-base leading-7'>{integration.description}</p>
                </CardContent>
              </Card>
            </MotionPreset>
          ))}

          {/* More Card */}
          <MotionPreset fade blur transition={{ duration: 0.8 }} delay={1.4} className='h-full'>
            <Card className='border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 flex h-full flex-col justify-between p-6 shadow-none transition-colors duration-300'>
              <div>
                <h6 className='mb-2 text-lg font-semibold text-primary'>Explore Custom Features</h6>
                <p className='text-muted-foreground text-base leading-7'>
                  Unlock powerful mobile workflows tailored to your custom requirements.
                </p>
              </div>
              <div className='flex justify-end pt-4'>
                <Button
                  className='bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300'
                  size='icon'
                  render={<a href='#' />}
                >
                  <ChevronRightIcon className='size-5' />
                </Button>
              </div>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default AppIntegration
