import type { ComponentType } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Features = {
  icon: ComponentType
  title: string
  description: string
  goodFor: string
  typicalLength: string
}[]

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16'>
          <p className='text-muted-foreground text-sm font-semibold uppercase tracking-wider'>Engagement models</p>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Three ways to work with us
          </h2>
          <p className='text-muted-foreground text-xl'>
            Pick the model that fits your stage. Switch later if it stops fitting.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {featuresList.map((item, index) => {
            const IconComponent = item.icon

            return (
              <Card
                key={index}
                className='hover:bg-primary hover:text-primary-foreground group transition-colors duration-300'
              >
                <CardContent>
                  <Avatar className='mb-4 size-9'>
                    <AvatarFallback className='bg-muted text-card-foreground [&>svg]:size-6'>
                      <IconComponent />
                    </AvatarFallback>
                  </Avatar>
                  <h6 className='mb-2 text-lg font-semibold'>{item.title}</h6>
                  <p className='text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300'>
                    {item.description}
                  </p>
                  <div className='mt-5 space-y-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground'>
                    <p>
                      <span className='font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary-foreground'>
                        Good for:
                      </span>{' '}
                      {item.goodFor}
                    </p>
                    <p>
                      <span className='font-semibold text-card-foreground transition-colors duration-300 group-hover:text-primary-foreground'>
                        Typical length:
                      </span>{' '}
                      {item.typicalLength}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
