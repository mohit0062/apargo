'use client'

import { useState } from 'react'

import { MessageSquareMoreIcon, PlaneTakeoffIcon, CodeXmlIcon, MousePointerClickIcon } from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { MotionPreset } from '@/components/ui/motion-preset'

const featureData = [
  {
    id: 'one-phone-trap',
    icon: PlaneTakeoffIcon,
    title: 'The One-Phone Trap',
    description:
      'Teams forced to manage customer conversations from a single WhatsApp number — causing delayed replies, missed leads, and zero accountability across departments.',
    image: '/ai-greentick-hero.png',
    imageAlt: 'One Phone Trap'
  },
  {
    id: 'zero-tracking',
    icon: CodeXmlIcon,
    title: 'Zero Tracking',
    description: 'No visibility into message opens, clicks, or engagement. Businesses were spending on campaigns without knowing what actually worked.',
    image: '/ai-greentick-hero.png',
    imageAlt: 'Zero Tracking'
  },
  {
    id: 'broadcast-risks',
    icon: MousePointerClickIcon,
    title: 'Broadcast Risks',
    description: 'Manual bulk messaging often led to low deliverability, blocked numbers, and operational chaos. Businesses needed a safer, scalable solution.',
    image: '/ai-greentick-hero.png',
    imageAlt: 'Broadcast Risks'
  }
]

const AccordionWithImage = () => {
  const [activeAccordion, setActiveAccordion] = useState<string[]>(['one-phone-trap'])

  const handleAccordionChange = (value: string[]) => {
    if (value.length > 0) {
      setActiveAccordion(value)
    }
  }

  const activeFeature = featureData.find(feature => feature.id === activeAccordion[0]) || featureData[0]

  return (
    <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.6} transition={{ duration: 0.5 }}>
      <div className='grid gap-20 lg:grid-cols-2'>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <div className='flex items-center gap-4'>
              <Avatar className='size-10 rounded-lg'>
                <AvatarFallback className='bg-muted text-card-foreground rounded-lg'>
                  <MessageSquareMoreIcon className='size-6' />
                </AvatarFallback>
              </Avatar>
              <h2 className='text-xl font-semibold'>Scaling without friction</h2>
            </div>
            <h2 className='text-2xl font-semibold'>Built for Real-World Ops</h2>
            <p className='text-muted-foreground'>
              So we built a platform designed to remove that friction — with multi-agent inboxes, high-deliverability
              broadcasting, automation workflows, and real-time tracking built directly on the Official WhatsApp API.
            </p>
          </div>

          <Accordion
            className='w-full space-y-2'
            value={activeAccordion}
            onValueChange={handleAccordionChange}
          >
            {featureData.map((item, index) => (
              <AccordionItem key={index} value={item.id} className='rounded-md border!'>
                <AccordionTrigger className='px-5'>
                  <span className='flex items-center gap-4'>
                    <item.icon className='size-4 shrink-0' />
                    <span className='text-base'>{item.title}</span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className='text-muted-foreground px-5 text-base'>{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Image */}
        <div className='bg-primary/10 relative mt-auto overflow-hidden rounded-lg px-6 pt-14 max-lg:shrink-0'>
          <MotionPreset key={activeFeature.id} fade slide={{ direction: 'down' }} transition={{ duration: 0.7 }}>
            <img
              src={activeFeature.image}
              alt={activeFeature.imageAlt}
              className='w-full rounded-t-xl object-cover'
            />
          </MotionPreset>
        </div>
      </div>
    </MotionPreset>
  )
}

export default AccordionWithImage
