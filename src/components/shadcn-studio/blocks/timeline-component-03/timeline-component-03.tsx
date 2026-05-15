'use client'

import { useEffect, useRef, useState } from 'react'

import { CodeIcon, LightbulbIcon, BoxIcon, RocketIcon } from 'lucide-react'

import {
  TimelineHorizontal,
  TimelineItemHorizontal,
  TimelineDotHorizontal,
  TimelineLineHorizontal,
  TimelineContentHorizontal,
  TimelineHeadingHorizontal
} from '@/components/ui/timeline-horizontal'

import { Progress } from '@/components/ui/progress'

interface TimelineStep {
  icon: string
  title: string
  description: string
  progress: number
  progressLabel: string
  duration: string
}

interface ProcessProps {
  steps: TimelineStep[]
}

const iconMap = {
  LightbulbIcon,
  CodeIcon,
  BoxIcon,
  RocketIcon
}

// Animated progress component that syncs with timeline active state
const AnimatedProgressBar = ({
  targetValue,
  isActive,
  isPast,
  isFirstItem,
  cycleKey
}: {
  targetValue: number
  isActive: boolean
  isPast: boolean
  isFirstItem: boolean
  cycleKey: number
}) => {
  const [currentProgress, setCurrentProgress] = useState(0)
  const [displayedNumber, setDisplayedNumber] = useState(0)
  const animationRef = useRef<number | null>(null)
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing animations
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current)
      delayTimeoutRef.current = null
    }

    // Past items should remain filled at target value
    if (isPast) {
      setCurrentProgress(targetValue)
      setDisplayedNumber(targetValue)

      return
    }

    // Future items should be at 0
    if (!isActive) {
      setCurrentProgress(0)
      setDisplayedNumber(0)

      return
    }

    // Current active item: animate from 0 to target
    const startAnimation = () => {
      const duration = 2000 // 1 second animation
      const startTime = Date.now()
      const startProgress = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function (easeOutCubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3)

        const newProgress = startProgress + (targetValue - startProgress) * easeProgress

        setCurrentProgress(newProgress)
        setDisplayedNumber(Math.round(newProgress))

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Add delay for first item on cycle restart to make transition smooth
    if (isFirstItem && isActive) {
      // Reset immediately
      setCurrentProgress(0)
      setDisplayedNumber(0)

      // Add a small delay before starting animation for smooth restart
      delayTimeoutRef.current = setTimeout(() => {
        startAnimation()
      }, 300)
    } else {
      startAnimation()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current)
      }
    }
  }, [isActive, isPast, targetValue, isFirstItem, cycleKey])

  return (
    <div className='space-y-1'>
      <div className='flex items-center gap-2'>
        <Progress value={currentProgress} className='h-1.5 w-50' />
        <p className='text-muted-foreground text-xs font-semibold'>{displayedNumber}%</p>
      </div>
    </div>
  )
}

const Process = ({ steps }: ProcessProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const prevActiveIndexRef = useRef(0)

  // Detect cycle restart and increment cycleKey
  useEffect(() => {
    // When activeIndex goes back to 0 from a higher index, it's a restart
    if (activeIndex === 0 && prevActiveIndexRef.current === steps.length - 1) {
      setCycleKey(prev => prev + 1)
    }

    prevActiveIndexRef.current = activeIndex
  }, [activeIndex, steps.length])

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <p className='text-primary text-sm font-medium uppercase'>process</p>

          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>Our Product Development Lifecycle</h2>

          <p className='text-muted-foreground mx-auto max-w-4xl text-xl'>
            We follow a streamlined lifecycle that ensures reliability and excellence at every stage from requirements
            to launch. Our lifecycle is built around clarity, collaboration, and continuous improvement.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div>
          <TimelineHorizontal
            className='flex-col gap-4 xl:justify-center xl:gap-4'
            defaultActiveIndex={0}
            animated={true}
            autoPlay={true}
            itemDurations={steps.map(() => 2500)}
            onActiveIndexChange={setActiveIndex}
          >
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap]
              const isLast = index === steps.length - 1
              const isActive = activeIndex === index
              const isPast = activeIndex > index
              const isFirstItem = index === 0

              return (
                <TimelineItemHorizontal key={index}>
                  <div
                    ref={el => {
                      itemRefs.current[index] = el
                    }}
                    className='flex flex-col items-center gap-4 xl:flex-row xl:items-center xl:gap-4'
                  >
                    <TimelineDotHorizontal
                      status='custom'
                      className='[&[data-active=true]]:bg-primary [&:not([data-active=true])]:bg-primary/10 size-9.5 rounded-full'
                    >
                      <Icon className='[&[data-active=true]]:text-primary-foreground [&:not([data-active=true])]:text-primary size-5.5' />
                    </TimelineDotHorizontal>
                    {!isLast && <TimelineLineHorizontal className='min-h-30 xl:w-57.5' />}
                  </div>
                  <TimelineContentHorizontal className='flex h-44 w-2xs flex-col gap-4 md:w-lg lg:w-xl xl:max-w-3xs xl:justify-between'>
                    <div>
                      <TimelineHeadingHorizontal variant='primary' className='mb-1.5 text-lg'>
                        {step.title}
                      </TimelineHeadingHorizontal>
                      <p className='text-muted-foreground'>{step.description}</p>
                    </div>
                    <div className='space-y-1'>
                      <AnimatedProgressBar
                        targetValue={step.progress}
                        isActive={isActive}
                        isPast={isPast}
                        isFirstItem={isFirstItem}
                        cycleKey={cycleKey}
                      />
                      <p className='text-muted-foreground text-xs'>{step.duration}</p>
                    </div>
                  </TimelineContentHorizontal>
                </TimelineItemHorizontal>
              )
            })}
          </TimelineHorizontal>
        </div>
      </div>
    </section>
  )
}

export default Process
