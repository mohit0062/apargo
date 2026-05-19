'use client'

import {
  CloudIcon,
  BoxesIcon,
  FileCodeIcon,
  GitBranchIcon,
  ActivityIcon,
  GlobeIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

import type { ComponentType } from 'react'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  'Cloud': CloudIcon,
  'Boxes': BoxesIcon,
  'FileCode': FileCodeIcon,
  'GitBranch': GitBranchIcon,
  'Activity': ActivityIcon
}

type StackCategory = {
  category: string
  iconName: string
  items: string[]
}[]

const CompareUILib = ({ stackData }: { stackData: StackCategory }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset fade slide={{ direction: 'up', offset: 50 }} blur transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='text-sm font-normal'>
              Cloud Stack
            </Badge>
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'up', offset: 50 }} blur delay={0.2} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
              Stack and tools
            </h2>
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'up', offset: 50 }} blur delay={0.4} transition={{ duration: 0.5 }}>
            <p className='text-muted-foreground text-xl max-w-3xl mx-auto'>
              We use industry-standard cloud providers and open-source orchestration tools to prevent vendor lock-in.
            </p>
          </MotionPreset>
        </div>

        <MotionPreset fade blur delay={0.6} transition={{ duration: 0.5 }}>
          <Card className='bg-card overflow-hidden shadow-none border'>
            <CardContent className='p-0'>
              <div className='divide-y divide-border'>
                {stackData.map((row, index) => {
                  const Icon = iconMap[row.iconName] || GlobeIcon

                  return (
                    <div
                      key={index}
                      className='flex flex-col sm:flex-row sm:items-center p-6 hover:bg-muted/30 transition-colors duration-200 gap-4 sm:gap-8'
                    >
                      {/* Category Name */}
                      <div className='sm:w-1/3 font-medium text-lg text-foreground flex items-center gap-3 shrink-0'>
                        <div className='bg-primary/10 text-primary p-2.5 rounded-lg'>
                          <Icon className='size-6' />
                        </div>
                        {row.category}
                      </div>

                      {/* Technologies List */}
                      <div className='flex flex-wrap gap-2 flex-1'>
                        {row.items.map((tech, tIndex) => (
                          <Badge
                            key={tIndex}
                            className='rounded-md bg-primary/10 px-3 py-1.5 text-primary text-sm font-medium shadow-none'
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </MotionPreset>
      </div>
    </section>
  )
}

export default CompareUILib
