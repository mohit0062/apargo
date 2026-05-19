'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import {
  BrainCircuitIcon,
  CheckCircle2Icon,
  Code2Icon,
  GitPullRequestArrowIcon,
  MessageSquareTextIcon,
  NetworkIcon,
  PanelsTopLeftIcon,
  RefreshCcwDotIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const AUTO_SWITCH_MS = 4200

const processItems = [
  {
    title: 'Async-first',
    description:
      'We prioritize deep work. Slack and meetings are secondary to clear communication and execution.',
    icon: MessageSquareTextIcon,
    preview: {
      eyebrow: 'Deep work operating system',
      title: 'Clear updates before meetings',
      metric: '3 async updates',
      accent: 'text-primary',
      chips: ['Decision log', 'Owner tagged', 'Next action'],
      visual: 'async'
    }
  },
  {
    title: 'Ownership over hierarchy',
    description:
      'The engineer closest to the product makes the decision. Fast execution, less bureaucracy.',
    icon: NetworkIcon,
    preview: {
      eyebrow: 'Decision velocity',
      title: 'Closest context wins',
      metric: '1 direct owner',
      accent: 'text-chart-3',
      chips: ['Engineer led', 'Founder aligned', 'No handoff drag'],
      visual: 'ownership'
    }
  },
  {
    title: 'Demo-focused delivery',
    description: 'We ship early and iterate fast with transparent weekly demos.',
    icon: PanelsTopLeftIcon,
    preview: {
      eyebrow: 'Weekly product rhythm',
      title: 'Show the build, then improve it',
      metric: 'Friday demo',
      accent: 'text-primary',
      chips: ['Live build', 'Feedback loop', 'Next sprint'],
      visual: 'demo'
    }
  },
  {
    title: 'Honest feedback & continuous learning',
    description: 'We improve through real feedback, open discussions and constant learning.',
    icon: RefreshCcwDotIcon,
    preview: {
      eyebrow: 'Learning loop',
      title: 'Feedback becomes better delivery',
      metric: 'Always improving',
      accent: 'text-chart-3',
      chips: ['Retro notes', 'Open critique', 'Playbook update'],
      visual: 'learning'
    }
  }
] as const

const visualBars = {
  async: ['w-[78%]', 'w-[54%]', 'w-[66%]'],
  ownership: ['w-[48%]', 'w-[82%]', 'w-[58%]'],
  demo: ['w-[62%]', 'w-[76%]', 'w-[44%]'],
  learning: ['w-[70%]', 'w-[52%]', 'w-[88%]']
}

type VisualType = keyof typeof visualBars

const HowWeWork = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeItem = processItems[activeIndex]

  useEffect(() => {
    if (isPaused) return

    const intervalId = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % processItems.length)
    }, AUTO_SWITCH_MS)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  return (
    <section className='bg-background py-8 sm:py-16 lg:py-24'>
      <div
        className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className='mx-auto flex max-w-3xl flex-col items-center text-center'>
          <Badge variant='outline' className='mb-5 rounded-full bg-card px-3 py-1 text-sm font-medium text-primary'>
            How we work
          </Badge>
          <h2 className='font-sans text-[36px] font-semibold tracking-tight text-foreground'>
            A calmer way to ship serious software
          </h2>
          <p className='mt-5 text-lg leading-8 text-muted-foreground'>
            Our process is built for senior teams: fewer status rituals, clearer ownership, fast demos, and honest feedback before problems get expensive.
          </p>
        </div>

        <div className='mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-10'>
          <div className='space-y-3'>
            {processItems.map((item, index) => {
              const Icon = item.icon
              const isActive = index === activeIndex

              return (
                <Card
                  key={item.title}
                  role='button'
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setActiveIndex(index)
                    }
                  }}
                  className={cn(
                    'cursor-pointer gap-0 rounded-lg py-0 shadow-none outline-none transition-all duration-300 focus-visible:ring-3 focus-visible:ring-ring/40',
                    isActive
                      ? 'bg-card ring-primary/35 shadow-[0_18px_50px_rgba(14,20,16,0.10)]'
                      : 'bg-card/70 ring-border/75 hover:bg-card hover:ring-foreground/15'
                  )}
                >
                  <CardContent className='relative px-4 py-4 sm:px-5'>
                    <div className='flex gap-4'>
                      <div
                        className={cn(
                          'mt-1 grid size-10 shrink-0 place-items-center rounded-lg ring-1 transition-colors duration-300',
                          isActive ? 'bg-primary text-primary-foreground ring-primary' : 'bg-secondary text-muted-foreground ring-border'
                        )}
                      >
                        <Icon className='size-5 stroke-[1.7]' />
                      </div>
                      <div className='min-w-0'>
                        <h3 className='text-base font-semibold leading-6 text-foreground'>{item.title}</h3>
                        <p className='mt-1 text-sm leading-6 text-muted-foreground'>{item.description}</p>
                      </div>
                    </div>

                    <div className='absolute inset-x-0 bottom-0 h-px overflow-hidden bg-border/70'>
                      {isActive && (
                        <motion.div
                          key={activeIndex}
                          className='h-full bg-primary'
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: isPaused ? 1.2 : AUTO_SWITCH_MS / 1000, ease: 'linear' }}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className='relative h-full min-h-[24rem] overflow-hidden rounded-xl bg-card py-0 shadow-[0_24px_80px_rgba(14,20,16,0.12)] ring-border/80 lg:min-h-0'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(26,135,84,0.15),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(191,142,65,0.12),transparent_26%),linear-gradient(180deg,rgba(250,248,244,0.62),transparent_70%)]' />
            <div className='absolute inset-0 bg-[linear-gradient(rgba(14,20,16,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(14,20,16,0.045)_1px,transparent_1px)] bg-[size:32px_32px]' />
            <CardContent className='relative flex h-full min-h-[24rem] items-center px-5 py-5 sm:px-8 lg:min-h-0 lg:px-10'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeItem.title}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className='w-full'
                >
                  <div className='mx-auto max-w-145 rounded-xl border border-border/80 bg-card/92 p-4 shadow-[0_22px_70px_rgba(14,20,16,0.14)] backdrop-blur'>
                    <div className='flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-4'>
                      <div>
                        <div className='text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
                          {activeItem.preview.eyebrow}
                        </div>
                        <h3 className='mt-2 max-w-md text-2xl font-semibold tracking-tight text-foreground'>
                          {activeItem.preview.title}
                        </h3>
                      </div>
                      <div className={cn('rounded-lg bg-secondary px-3 py-2 text-right font-mono text-xs font-medium', activeItem.preview.accent)}>
                        {activeItem.preview.metric}
                      </div>
                    </div>

                    <PreviewVisual type={activeItem.preview.visual} />

                    <div className='mt-5 flex flex-wrap gap-2'>
                      {activeItem.preview.chips.map(chip => (
                        <Badge key={chip} variant='outline' className='rounded-md bg-background/70 px-2.5 py-1 font-mono text-[11px] text-muted-foreground'>
                          {chip}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const PreviewVisual = ({ type }: { type: VisualType }) => {
  const bars = visualBars[type]

  return (
    <div className='mt-5 grid gap-4 lg:grid-cols-[1fr_0.78fr]'>
      <div className='rounded-lg bg-secondary/70 p-3'>
        <div className='flex items-center gap-2 border-b border-border/70 pb-3'>
          <div className='grid size-8 place-items-center rounded-md bg-background text-primary ring-1 ring-border/80'>
            {type === 'demo' ? <Code2Icon className='size-4' /> : <BrainCircuitIcon className='size-4' />}
          </div>
          <div>
            <div className='text-sm font-semibold leading-none text-foreground'>Workspace snapshot</div>
            <div className='mt-1.5 font-mono text-[11px] leading-none text-muted-foreground'>updated 12 min ago</div>
          </div>
        </div>

        <div className='mt-4 space-y-3'>
          {bars.map((bar, index) => (
            <div key={bar} className='flex items-center gap-3'>
              <div className='font-mono text-[11px] text-muted-foreground'>0{index + 1}</div>
              <div className='h-2 flex-1 overflow-hidden rounded-full bg-border/70'>
                <motion.div
                  className={cn('h-full origin-left rounded-full', index === 1 ? 'bg-chart-3/80' : 'bg-primary/80', bar)}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='grid gap-3'>
        <div className='rounded-lg border border-border/80 bg-background/75 p-3'>
          <div className='flex items-center justify-between gap-3'>
            <span className='text-xs font-medium text-muted-foreground'>Status</span>
            <span className='flex items-center gap-1.5 text-xs font-semibold text-primary'>
              <CheckCircle2Icon className='size-3.5' />
              moving
            </span>
          </div>
        </div>
        <div className='rounded-lg border border-border/80 bg-background/75 p-3'>
          <div className='flex items-center gap-2'>
            <GitPullRequestArrowIcon className='size-4 text-primary' />
            <span className='text-sm font-medium text-foreground'>Review thread closed</span>
          </div>
          <div className='mt-2 h-1.5 overflow-hidden rounded-full bg-border'>
            <div className='h-full w-[72%] rounded-full bg-primary/75' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowWeWork
