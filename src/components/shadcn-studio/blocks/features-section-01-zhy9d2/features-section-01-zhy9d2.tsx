import type { ComponentType } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type Features = {
  icon: ComponentType
  title: string
  description: string
  cardBorderColor: string
  avatarTextColor: string
  avatarBgColor: string
  cardClassName?: string
}[]

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 max-w-3xl space-y-4 sm:mb-16'>
          <p className='text-primary text-sm font-medium uppercase'>What we build</p>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>What we build</h2>
          <p className='text-muted-foreground text-xl'>
            From fast marketing sites to full SaaS platforms, we build the web products teams need to launch, operate,
            and grow.
          </p>
        </div>

        <div className='grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-6'>
          {featuresList.map((features, index) => (
            <Card
              key={index}
              className={cn(
                'h-full shadow-none transition-colors duration-300',
                features.cardBorderColor,
                features.cardClassName
              )}
            >
              <CardContent className='flex h-full flex-col'>
                <Avatar className='mb-6 size-10 rounded-md'>
                  <AvatarFallback
                    className={cn('rounded-md [&>svg]:size-6', features.avatarBgColor, features.avatarTextColor)}
                  >
                    <features.icon />
                  </AvatarFallback>
                </Avatar>
                <h6 className='mb-2 text-lg font-semibold'>{features.title}</h6>
                <p className='text-muted-foreground text-base leading-7'>{features.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
