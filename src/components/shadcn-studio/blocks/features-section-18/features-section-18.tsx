'use client'

import {
  ArrowRightIcon,
  BarChart3Icon,
  BotIcon,
  CheckIcon,
  MessageCircleIcon,
  SendIcon,
  UsersIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const highlights = [
  '3x faster reply times with shared inbox',
  '90%+ average WhatsApp read rates',
  'One number, unlimited team members',
]

const metrics = [
  {
    icon: SendIcon,
    label: 'Broadcasts sent',
    value: '42.8k',
  },
  {
    icon: UsersIcon,
    label: 'Team inbox users',
    value: 'Unlimited',
  },
  {
    icon: BarChart3Icon,
    label: 'Campaign read rate',
    value: '90%+',
  },
]

const Features = () => {
  return (
    <section className='bg-secondary py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-24'>
          <div className='space-y-12'>
            <div className='space-y-4'>
              <p className='text-primary text-sm font-medium uppercase'>From the Apargo Lab</p>
              <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
                AI Greentick - The WhatsApp Marketing Suite We Built For Modern Teams
              </h2>
              <p className='text-muted-foreground text-xl'>
                Broadcasts, shared team inbox, no-code AI chatbots and full campaign analytics - built on the official
                WhatsApp Business API. Used by D2C brands, agencies and service businesses to turn WhatsApp into a real
                revenue channel.
              </p>
            </div>

            <div className='flex flex-wrap gap-3'>
              <Button
                size='lg'
                className='group rounded-lg text-base has-[>svg]:px-6'
                onClick={() => (window.location.href = '#')}
              >
                Visit AI Greentick
                <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='rounded-lg text-base'
                onClick={() => (window.location.href = '#')}
              >
                Book a Demo
              </Button>
            </div>

            <div className='space-y-3.5'>
              {highlights.map(highlight => (
                <div key={highlight} className='flex gap-3'>
                  <span className='bg-primary/10 text-primary mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full'>
                    <CheckIcon className='size-4' />
                  </span>
                  <p className='text-muted-foreground text-lg'>
                    <span className='text-foreground font-medium'>{highlight}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='relative'>
            <div className='absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl' aria-hidden='true' />
            <Card className='relative shadow-md'>
              <CardHeader className='border-b'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md'>
                      <MessageCircleIcon className='size-5' />
                    </div>
                    <div>
                      <CardTitle>AI Greentick</CardTitle>
                      <CardDescription>WhatsApp marketing command center</CardDescription>
                    </div>
                  </div>
                  <span className='rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>Live</span>
                </div>
              </CardHeader>

              <CardContent className='space-y-4 pt-4'>
                <div className='grid gap-4 sm:grid-cols-3'>
                  {metrics.map(metric => (
                    <Card key={metric.label} size='sm' className='shadow-none'>
                      <CardContent className='pt-0'>
                        <metric.icon className='text-primary mb-4 size-5' />
                        <CardTitle>{metric.value}</CardTitle>
                        <CardDescription className='mt-1'>{metric.label}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className='grid gap-4 lg:grid-cols-2'>
                  <Card size='sm' className='shadow-none'>
                    <CardHeader>
                      <div className='flex items-center gap-2'>
                        <BotIcon className='text-primary size-4' />
                        <CardTitle>No-code AI chatbot</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                      <div className='bg-secondary text-muted-foreground rounded-lg p-3 text-sm'>
                        Hi, I can help with product questions, orders and support.
                      </div>
                      <div className='bg-primary text-primary-foreground ml-auto max-w-[78%] rounded-lg p-3 text-sm'>
                        Show me pricing
                      </div>
                      <div className='bg-secondary text-muted-foreground rounded-lg p-3 text-sm'>
                        Sure. Here are the best plans for your team size.
                      </div>
                    </CardContent>
                  </Card>

                  <Card size='sm' className='shadow-none'>
                    <CardHeader>
                      <div className='flex items-center justify-between gap-3'>
                        <CardTitle>Campaign analytics</CardTitle>
                        <span className='text-primary text-sm'>+18.2%</span>
                      </div>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                      {[
                        ['Delivered', '96%'],
                        ['Read', '91%'],
                        ['Replied', '38%'],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div className='mb-1.5 flex items-center justify-between text-sm'>
                            <span className='text-muted-foreground'>{label}</span>
                            <span className='font-medium text-foreground'>{value}</span>
                          </div>
                          <div className='bg-secondary h-2 rounded-full'>
                            <div className='bg-primary h-full rounded-full' style={{ width: value }} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
