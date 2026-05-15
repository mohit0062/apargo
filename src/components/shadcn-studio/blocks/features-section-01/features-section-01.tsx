import type { ComponentType } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type Features = {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}[]

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className='bg-background py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16'>
          <div className='inline-flex rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm'>
            Why teams pick Apargo
          </div>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Four Reasons We Stick</h2>
          <p className='text-muted-foreground text-xl'>
            Clear communication, fixed quotes, senior engineers and full IP ownership - from day one.
          </p>
        </div>

        <div className='grid gap-6 grid-cols-2 lg:grid-cols-4'>
          {featuresList.map((features, index) => (
            <Card
              key={index}
              className={cn(
                'h-full shadow-none transition-all duration-300',
                'hover:-translate-y-1 hover:border-primary/40 hover:shadow-md'
              )}
            >
              <CardHeader>
                <div className='mb-4 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary'>
                  <features.icon className='size-5' />
                </div>
                <CardTitle>{features.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-base leading-7'>{features.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
