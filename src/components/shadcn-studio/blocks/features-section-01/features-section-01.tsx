import type { ComponentType } from 'react'
import { CheckCircle2, Users, HelpCircle, Shield, LucideIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type FeatureItem = {
  icon?: ComponentType<{ className?: string }> | LucideIcon
  title: string
  description: string
}

export interface FeaturesProps {
  featuresList: FeatureItem[]
  title?: string
  description?: string
}

// Default icons mapping for CMS list elements
const defaultIcons = [CheckCircle2, Users, Shield, HelpCircle]

const Features = ({ featuresList, title, description }: FeaturesProps) => {
  const displayTitle = title || "We use what we build"
  const displayDescription = description || "AI Greentick runs on the same stack and workflows we use for client projects. If it works at scale for real users, it can work for yours too."

  return (
    <section className='bg-background py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16'>
          <div className='inline-flex rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm'>
            Why teams pick Apargo
          </div>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{displayTitle}</h2>
          <p className='text-muted-foreground text-lg sm:text-xl'>
            {displayDescription}
          </p>
        </div>

        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          {featuresList.map((feature, index) => {
            const IconComponent = feature.icon || defaultIcons[index % defaultIcons.length]

            return (
              <Card
                key={index}
                className={cn(
                  'h-full shadow-none transition-all duration-300',
                  'hover:-translate-y-1 hover:border-primary/40 hover:shadow-md'
                )}
              >
                <CardHeader>
                  <div className='mb-4 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary'>
                    <IconComponent className='size-5' />
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base leading-7'>{feature.description}</CardDescription>
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
